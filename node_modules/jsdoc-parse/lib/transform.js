'use strict'
const o = require('object-tools')
const a = require('array-tools')
const testValue = require('test-value')
const collectJson = require('collect-json')

/**
 * @module transform
 */
module.exports = transform

function transform () {
  return collectJson(data => {
    data = fixConstructorMemberLongnames(data)

    let json = data.filter(i => {
      return !i.undocumented && !/package|file/.test(i.kind)
    })

    json = json.map(setIsExportedFlag)
    json = json.map(setCodename)
    json = insertConstructors(json)

    json = json.map(function (identifier) {
      identifier = setID(identifier)

      identifier = removeQuotes(identifier)
      identifier = cleanProperties(identifier)
      identifier = buildTodoList(identifier)
      identifier = extractTypicalName(identifier)
      identifier = extractCategory(identifier)
      identifier = extractChainable(identifier)
      identifier = extractCustomTags(identifier)
      identifier = setTypedefScope(identifier)
      identifier = renameThisProperty(identifier)
      identifier = removeMemberofFromModule(identifier)
      return identifier
    })

    var exported = a.where(json, { isExported: true })
    var newIDs = a.pluck(exported, 'id')

    newIDs.forEach(function (newID) {
      update(json, { isExported: undefined, '!kind': 'module' }, function (identifier) {
        return updateIDReferences(identifier, newID)
      })
    })

    /* remove properties which have enum parents */
    json = json.filter(function (identifier) {
      var parent = a.findWhere(json, { id: identifier.memberof })
      if (parent && parent.isEnum) {
        return false
      } else {
        return true
      }
    })

    json = json.map(removeUnwanted)
    json = json.map(sortIdentifier)

    /* add order field, representing the original order of the documentation */
    json.forEach(function (identifier, index) {
      identifier.order = index
    })

    return JSON.stringify(json, null, '  ')
  })
}

/**
Create a unique ID (the jsdoc `longname` field is not guaranteed unique)
@depends setIsExportedFlag
@depends setCodename
*/
function setID (identifier) {
  if (identifier.longname) {
    identifier.id = identifier.longname
  }
  if (identifier.kind === 'constructor') {
    if (identifier.scope === 'static') {
      identifier.id = identifier.longname
      delete identifier.scope
    } else {
      identifier.id = identifier.longname + '()'
    }
  }
  if (identifier.isExported) {
    identifier.id = identifier.longname + '--' + identifier.codeName
  }
  return identifier
}

/**
run after setIsExportedFlag has processed using old name value
@depends setIsExportedFlag
*/
function setCodename (identifier) {
  if (identifier.meta && identifier.meta.code) {
    identifier.codeName = identifier.meta.code.name
    if (identifier.isExported) identifier.name = identifier.codeName
  }
  return identifier
}

/**
*/
function setIsExportedFlag (identifier) {
  if (/module:/.test(identifier.name) && identifier.kind !== 'module' && identifier.kind !== 'constructor') {
    identifier.isExported = true
    identifier.memberof = identifier.longname
  }
  return identifier
}

/**
converts .classdesc to .description
@returns Array - contains the class and constructor identifiers
@depends setCodename
*/
function createConstructor (class_) {
  if (class_.kind !== 'class') {
    throw new Error('should only pass a class to createConstructor')
  }

  var replacements = []
  class_ = o.clone(class_)
  var constructor = o.extract(class_, [ 'description', 'params', 'examples', 'returns', 'exceptions' ])
  // constructor.scope = class_.scope
  if (class_.classdesc) {
    class_.description = class_.classdesc
    delete class_.classdesc
  }
  replacements.push(class_)

  /* only output a constructor if it's documentated */
  if (constructor.description || (constructor.params && constructor.params.length)) {
    constructor.longname = class_.longname
    constructor.name = class_.codeName || class_.name
    constructor.kind = 'constructor'
    constructor.memberof = class_.longname
    replacements.push(constructor)
  }
  return replacements
}

/* split each class found into two new items, then re-insert them over the original class */
function insertConstructors (data) {
  var replacements = []

  data.forEach(function (identifier, index) {
    if (identifier.kind === 'class') {
      replacements.push({ index: index, items: createConstructor(identifier) })
    }
  })

  replacements.reverse().forEach(function (replacement) {
    var spliceArgs = [ replacement.index, 1 ].concat(replacement.items)
    data.splice.apply(data, spliceArgs)
  })

  return data
}

/* unfortunately the jsdoc data structure differs between es5 and es6 classes, hence the need for these four functions */
function getEs6Constructor (data, parent) {
  return a.findWhere(data, i => {
    return isES6Constructor(i) && i.memberof === parent.longname
  })
}
function isES5Class (identifier) {
  return testValue(identifier, {
    kind: 'class',
    meta: { code: { type: 'FunctionDeclaration' } }
  })
}
function isES6Class (identifier) {
  return testValue(identifier, {
    kind: 'class',
    meta: { code: { type: 'ClassDeclaration' } }
  })
}
function isES6Constructor (identifier) {
  return testValue(identifier, {
    kind: 'class',
    meta: { code: { type: 'MethodDefinition' } }
  })
}

function updateIDReferences (identifier, newID) {
  var oldID = newID.split('--')[0]
  if (oldID && !identifier.isExported) {
    if (identifier.id) identifier.id = identifier.id.replace(oldID, newID)
    if (identifier.memberof) identifier.memberof = identifier.memberof.replace(oldID, newID)
    if (identifier.name) identifier.name = identifier.name.replace(oldID, newID)
    if (identifier.type && identifier.type.names) {
      identifier.type.names = identifier.type.names.map(function (id) {
        return id.replace(oldID, newID)
      })
    }
    if (identifier.returns) {
      identifier.returns = identifier.returns.map(function (identifier) {
        if (identifier.type && identifier.type.names) {
          identifier.type.names = identifier.type.names.map(function (id) {
            return id.replace(oldID, newID)
          })
        }
        return identifier
      })
    }
  }
  return identifier
}

/* removes unwanted quotes set by jsdoc if you specifiy a memberof such as `jquery.fn` */
function removeQuotes (identifier) {
  const re = /["']/g
  if (identifier.name) identifier.name = identifier.name.replace(re, '')
  if (identifier.memberof) identifier.memberof = identifier.memberof.replace(re, '')
  if (identifier.longname) identifier.longname = identifier.longname.replace(re, '')
  if (identifier.id) identifier.id = identifier.id.replace(re, '')
  return identifier
}

function removeUnwanted (identifier) {
  delete identifier.todo
  delete identifier.tags
  delete identifier.codeName

  delete identifier.comment
  delete identifier.undocumented
  delete identifier.___id
  delete identifier.___s

  if (identifier.meta) {
    const oldMeta = identifier.meta
    identifier.meta = {
      lineno: oldMeta.lineno,
      filename: oldMeta.filename,
      path: oldMeta.path
    }
  }

  return identifier
}

function cleanProperties (identifier) {
  if (identifier.properties) {
    identifier.properties = identifier.properties.map(function (prop) {
      return wantedProperties(prop)
    })
  }
  return identifier
}

function wantedProperties (input) {
  return o.without(input, [ 'comment', 'meta', 'undocumented', '___id', '___s' ])
}

function buildTodoList (identifier) {
  var todoList = []
  if (identifier.todo) {
    var todo = a.arrayify(identifier.todo)
    todoList = todoList.concat(todo.map(function (task) {
      return { done: false, task: task }
    }))
  }

  /*
  Convert @typicalname and @category from custom to regular tags.
  Combine @todo array with @done custom tags to make @todoList
  */
  if (identifier.tags) {
    var done = a.extract(identifier.tags, { title: 'done' })
    if (!identifier.tags.length) delete identifier.tags
    todoList = todoList.concat(done.map(function (task) {
      return { done: true, task: task.value }
    }))
  }

  if (todoList.length) {
    identifier.todoList = todoList
  }
  return identifier
}

function extractTypicalName (identifier) {
  if (identifier.tags) {
    var typicalName = a.extract(identifier.tags, { title: 'typicalname' })
    if (typicalName.length) identifier.typicalname = typicalName[0].value
  }
  return identifier
}

function extractCategory (identifier) {
  if (identifier.tags) {
    var category = a.extract(identifier.tags, { title: 'category' })
    if (category.length) identifier.category = category[0].value
  }
  return identifier
}

function extractChainable (identifier) {
  if (identifier.tags) {
    var chainable = a.extract(identifier.tags, { title: 'chainable' })
    if (chainable.length) identifier.chainable = true
  }
  return identifier
}

/**
@depends removeUnwanted
*/
function extractCustomTags (identifier) {
  if (identifier.tags && identifier.tags.length > 0) {
    identifier.customTags = identifier.tags.map(function (tag) {
      return {
        tag: tag.title,
        value: tag.value
      }
    })
  }
  return identifier
}

function setTypedefScope (identifier) {
  if (identifier.kind === 'typedef' && !identifier.scope) identifier.scope = 'global'
  return identifier
}

function sort (object, sortFunction) {
  var output = {}
  var newPropertyOrder = Object.keys(object).filter(function (prop) {
    return typeof object[prop] !== 'function'
  }).sort(sortFunction)
  newPropertyOrder.forEach(function (prop) {
    output[prop] = object[prop]
  })
  return output
}

function sortIdentifier (identifier) {
  var fieldOrder = [ 'id', 'longname', 'name', 'scope', 'kind', 'isExported', 'classdesc', 'augments', 'inherits', 'inherited', 'implements', 'overrides', 'mixes', 'description', 'memberof', 'alias', 'params', 'fires', 'examples', 'returns', 'type', 'defaultvalue', 'readonly', 'thisvalue', 'isEnum', 'properties', 'optional', 'nullable', 'variable', 'author', 'deprecated', 'ignore', 'access', 'requires', 'version', 'since', 'licenses', 'license', 'typicalname', 'category', 'see', 'exceptions', 'codeName', 'todoList', 'customTags', 'chainable', 'meta', 'order' ]
  return sort(identifier, function (a, b) {
    if (fieldOrder.indexOf(a) === -1 && fieldOrder.indexOf(b) > -1) {
      return 1
    } else {
      return fieldOrder.indexOf(a) - fieldOrder.indexOf(b)
    }
  })
}

function update (array, query, newValues) {
  for (var i = 0; i < array.length; i++) {
    if (o.exists(array[i], query)) {
      var values = typeof newValues === 'function' ? newValues(array[i]) : newValues
      for (var prop in values) {
        if (values[prop] !== undefined) array[i][prop] = values[prop]
      }
    }
  }
}

function renameThisProperty (identifier) {
  identifier.thisvalue = identifier.this
  delete identifier.this
  return identifier
}

function removeMemberofFromModule (identifier) {
  if (identifier.kind === 'module') {
    delete identifier.memberof
    delete identifier.scope
  }
  return identifier
}

function fixConstructorMemberLongnames (data) {
  data.forEach(i => {
    if (isES6Class(i)) {
      const es6constructor = getEs6Constructor(data, i)
      if (es6constructor) {
        const constructorChildren = a.where(data, { memberof: es6constructor.longname })
        constructorChildren.forEach(child => {
          child.memberof = i.longname
        })
      }
    }
  })
  return data
}
