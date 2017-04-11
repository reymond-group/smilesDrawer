'use strict';

var a = require('array-tools');
var transform = require('./transform');

exports.publish = function (data) {
  data = data().get();
  data = transform.fixConstructorMemberLongnames(data);

  var json = data.filter(function (i) {
    return !i.undocumented && !/package|file/.test(i.kind);
  });

  json = json.map(transform.setIsExportedFlag);
  json = json.map(transform.setCodename);
  json = transform.insertConstructors(json);

  json = json.map(function (identifier) {
    identifier = transform.setID(identifier);

    identifier = transform.removeQuotes(identifier);
    identifier = transform.cleanProperties(identifier);
    identifier = transform.buildTodoList(identifier);
    identifier = transform.extractTypicalName(identifier);
    identifier = transform.extractCategory(identifier);
    identifier = transform.extractChainable(identifier);
    identifier = transform.extractCustomTags(identifier);
    identifier = transform.setTypedefScope(identifier);
    identifier = transform.renameThisProperty(identifier);
    identifier = transform.removeMemberofFromModule(identifier);
    return identifier;
  });

  var exported = a.where(json, { isExported: true });
  var newIDs = a.pluck(exported, 'id');

  newIDs.forEach(function (newID) {
    transform.update(json, { isExported: undefined, '!kind': 'module' }, function (identifier) {
      return transform.updateIDReferences(identifier, newID);
    });
  });

  json = json.filter(function (identifier) {
    var parent = a.findWhere(json, { id: identifier.memberof });
    if (parent && parent.isEnum) {
      return false;
    } else {
      return true;
    }
  });

  json = json.map(transform.removeUnwanted);
  json = json.map(transform.sortIdentifier);

  json.forEach(function (identifier, index) {
    identifier.order = index;
  });

  console.log(JSON.stringify(json, null, '  '));
};