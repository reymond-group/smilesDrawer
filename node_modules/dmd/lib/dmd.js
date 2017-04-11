'use strict'
var handlebars = require('stream-handlebars')
var FileSet = require('file-set')
var fs = require('fs')
var path = require('path')
var o = require('object-tools')
var arrayify = require('array-back')
var walkBack = require('walk-back')

/* Register handlebars helper modules */
;[ '../helpers/helpers', 'ddata', 'handlebars-string', 'handlebars-regexp', 'handlebars-comparison', 'handlebars-json', 'handlebars-array' ].forEach(function (modulePath) {
  handlebars.registerHelper(require(modulePath))
})

/**
 * @module dmd
 */
module.exports = dmd

/**
 * @class
 * @classdesc All dmd options and their defaults
 */
function DmdOptions () {
  /**
  * The template the supplied documentation will be rendered into. Use the default or supply your own template for full control over the output.
  * @type {string}
  * @default
  * @example
  * ```js
  * var fs = require("fs")
  * var dmd = require("../")
  *
  * var template = "The description from my class: {{#class name='MyClass'}}{{description}}{{/class}}"
  *
  * fs.createReadStream(__dirname + "/my-class.json")
  *     .pipe(dmd({ template: template }))
  *     .pipe(process.stdout)
  * ```
  * outputs:
  * ```
  * The description from my class: MyClass is full of wonder
  * ```
  * the equivation operation using the command-line tool:
  * ```
  * $ dmd --template template.hbs --src my-class.json
  * ```
  */
  this.template = '{{>main}}'

  /**
   * The initial heading depth. For example, with a value of `2` the top-level markdown headings look like `"## The heading"`.
   * @type number
   * @default
   */
  this['heading-depth'] = 2

  /**
   * Specifies the default language used in @example blocks (for [syntax-highlighting](https://help.github.com/articles/github-flavored-markdown/#syntax-highlighting) purposes). In gfm mode, each @example is wrapped in a fenced-code block. Example usage: `--example-lang js`. Use the special value `none` for no specific language. While using this option, you can override the supplied language for any @example by specifying the `@lang` subtag, e.g `@example @lang hbs`. Specifying `@example @lang off` will disable code blocks for that example.
   * @type {string}
   * @default
   */
  this['example-lang'] = 'js'

  /**
   * Use an installed package containing helper and/or partial overrides
   * @type {array}
   */
  this.plugin = []

  /**
   * handlebars helper files to override or extend the default set
   * @type {array}
   */
  this.helper = []

  /**
   * handlebars partial files to override or extend the default set
   * @type {array}
   */
  this.partial = []

  /**
   * Format identifier names in the [code](http://daringfireball.net/projects/markdown/syntax#code) style, (i.e. format using backticks or `<code></code>`)
   * @type {string}
   */
  this['name-format']

  /**
   * By default, dmd generates github-flavoured markdown. Not all markdown parsers render gfm correctly. If your generated docs look incorrect on sites other than Github (e.g. npmjs.org) try enabling this option to disable Github-specific syntax.
   * @type {boolean}
   */
  this['no-gfm']

  /**
   * Put `<hr>` breaks between identifiers. Improves readability on bulky docs.
   * @type {boolean}
   * @default
   */
  this.separators = false

  /**
   * none, grouped, table, dl
   * @type {string}
   * @default
   */
  this['module-index-format'] = 'dl'

  /**
   * none, grouped, table, dl
   * @type {string}
   * @default
   */
  this['global-index-format'] = 'dl'

  /**
   * Two options to render parameter lists: 'list' or 'table' (default). Table format works well in most cases but switch to list if things begin to look crowded / squashed.
   * @type {string}
   * @default
   */
  this['param-list-format'] = 'table'

  /**
   * list, table
   * @type {string}
   * @default
   */
  this['property-list-format'] = 'table'

  /**
   * grouped, list
   * @type {string}
   * @default
   */
  this['member-index-format'] = 'grouped'

  /**
   * a list of fields to group member indexes by
   * @type {array}
   * @default
   */
  this['group-by'] = [ 'scope', 'category' ]
}

/**
 * Transforms doclet data into markdown documentation. Returns a transform stream - pipe doclet data in to receive rendered markdown out.
 * @alias module:dmd
 * @param [options] {module:dmd~DmdOptions} - The render options
 * @return {external:Transform}
 */
function dmd (options) {
  options = o.extend(new DmdOptions(), options)
  options.plugin = arrayify(options.plugin)
  options._depth = 0
  options._indexDepth = 0

  /* register all dmd partials. */
  registerPartials(path.resolve(__dirname, '..', 'partials/**/*.hbs'))

  /* if plugins were specified, register the helpers/partials from them too */
  if (options.plugin) {
    for (var i = 0; i < options.plugin.length; i++) {
      var plugin = options.plugin[i]
      var modulePath = ''

      /* user supplied an existing path */
      if (fs.existsSync(path.resolve(plugin))) {
        modulePath = path.resolve(plugin)
      /* else user supplied a module name, search npm installed modules */
      } else {
        modulePath = walkBack(process.cwd(), path.join('node_modules', plugin))
      }

      if (modulePath) {
        /* load the plugin options */
        var pluginOptions = require(modulePath)(options)
        options.partial = options.partial.concat(pluginOptions.partial)
        options.helper = options.helper.concat(pluginOptions.helper)
      } else {
        var PassThrough = require('stream').PassThrough
        var outputStream = new PassThrough()
        process.nextTick(function () {
          outputStream.emit('error', new Error('Cannot find plugin: ' + plugin))
        })
        return outputStream
      }
    }
  }

  /* if additional partials/helpers paths were specified, register them too */
  if (options.partial.length) registerPartials(options.partial)
  if (options.helper.length) registerHelpers(options.helper)
  return handlebars.createCompileStream(
    options.template,
    {
      preventIndent: true,
      data: { options: options },
      strict: false
    }
  )
}

function registerPartials (paths) {
  var fileSet = new FileSet(paths)
  fileSet.files.forEach(function (file) {
    handlebars.registerPartial(
      path.basename(file, '.hbs'),
      fs.readFileSync(file, 'utf8') || ''
    )
  })
}

function registerHelpers (helpers) {
  var fileSet = new FileSet(helpers)
  fileSet.files.forEach(function (file) {
    handlebars.registerHelper(require(path.resolve(process.cwd(), file)))
  })
}

dmd.cliOptions = [
  { name: 'template', alias: 't', type: String, typeLabel: '<file>',
    description: 'A custom handlebars template file to insert documentation into. The default template is `{{>main}}`.'
  },
  { name: 'heading-depth', type: Number, alias: 'd',
    description: 'root heading depth, defaults to 2 (`##`).'
  },
  { name: 'plugin', type: String, typeLabel: '<modules>', multiple: true,
    description: 'Use an installed package containing helper and/or partial overrides'
  },
  { name: 'helper', type: String, typeLabel: '<files>', multiple: true,
    description: 'handlebars helper files to override or extend the default set'
  },
  { name: 'partial', type: String, typeLabel: '<files>', multiple: true,
    description: 'handlebars partial files to override or extend the default set'
  },
  { name: 'example-lang', type: String, alias: 'l',
    description: 'Specifies the default language used in @example blocks (for syntax-highlighting purposes). In gfm mode, each @example is wrapped in a fenced-code block. Example usage: `--example-lang js`. Use the special value `none` for no specific language. While using this option, you can override the supplied language for any @example by specifying the `@lang` subtag, e.g `@example @lang hbs`. Specifying `@example @lang off` will disable code blocks for that example.'
  },
  { name: 'name-format', type: Boolean,
    description: 'Format identifier names as code'
  },
  { name: 'no-gfm', type: Boolean,
    description: 'By default, dmd generates github-flavoured markdown. Not all markdown parsers render gfm correctly. If your generated docs look incorrect on sites other than Github (e.g. npmjs.org) try enabling this option to disable Github-specific syntax. '
  },
  { name: 'separators', type: Boolean,
    description: 'Put <hr> breaks between identifiers. Improves readability on bulky docs. '
  },
  { name: 'module-index-format', type: String, alias: 'm',
    description: 'none, grouped, table, dl'
  },
  { name: 'global-index-format', type: String, alias: 'g',
    description: 'none, grouped, table, dl'
  },
  { name: 'param-list-format', type: String, alias: 'p',
    description: "Two options to render parameter lists: 'list' or 'table' (default). Table format works well in most cases but switch to list if things begin to look crowded / squashed. "
  },
  { name: 'property-list-format', type: String, alias: 'r',
    description: 'list, table'
  },
  { name: 'member-index-format', type: String, alias: 'c',
    description: 'grouped, list'
  },
  { name: 'group-by', type: String, typeLabel: '<fields>', multiple: true,
    description: 'a list of fields to group member indexes by'
  }
]

/**
 * @external Transform
 * @see http://nodejs.org/api/stream.html#stream_class_stream_transform
 */
