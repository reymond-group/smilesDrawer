exports.definitions = [
  {
    name: 'src',
    alias: 'f',
    type: String,
    multiple: true,
    defaultOption: true,
    description: 'A list of javascript source files (or glob expressions) to parse for documentation. If this option is not set jsdoc-parse will wait for source code on stdin (i.e. `cat *.js | jsdoc-parse <options>`).',
    typeLabel: '[underline]{file} ...'
  },
  {
    name: 'private',
    alias: 'P',
    type: Boolean,
    description: 'Include identifiers marked @private in the output'
  },
  {
    name: 'html',
    alias: 'H',
    type: Boolean,
    description: 'Enable experimental parsing of .html files'
  },
  {
    name: 'conf',
    type: String,
    typeLabel: '[underline]{file}',
    description: 'Path to a jsdoc configuration file, passed directly to `jsdoc -c`.'
  },
  {
    name: 'sort-by',
    type: String,
    multiple: true,
    alias: 's',
    description: 'Sort by one of more properties, e.g. `--sort-by kind category`. Defaults to `[ "scope", "category", "kind", "order" ]`. Pass the special value `none` to remove the default sort order. ',
    typeLabel: '[underline]{property} ...'
  },
  {
    name: 'stats',
    type: Boolean,
    description: 'Print a few stats about the doclets parsed'
  }
]

exports.usage = {
  title: 'jsdoc-parse',
  description: 'Jsdoc-annotated source code in, JSON format documentation out.',
  forms: [
    '$ jsdoc-parse [-[bold]{PH}] [[bold]{--sort-by} [underline]{fields}] [[bold]{--conf} [underline]{file}] [[bold]{--src} [underline]{file} ...]',
    '$ jsdoc-parse [bold]{--help}',
    '$ jsdoc-parse [bold]{--stats}'
  ],
  optionNameStyles: 'bold'
}
