var _ = require('lodash');
var catharsis = require('catharsis');
var TYPE_EXPRESSION_START = /\{[^@]/;

/**
 * Extract a type expression from the tag text.
 *
 * @private
 * @param {Tag} tag The tag whose type should be extracted
 */
 function extractTypeExpression(tag) {
  var content, start, position, count, length, expression;
  
  content = tag.content;
  start = content.search(TYPE_EXPRESSION_START);
  length = content.length;
  if (start !== -1) {
    // advance to the first character in the type expression
    position = start + 1;
    count = 1;

    while (position < length) {
      switch (content[position]) {
        case '\\':
          // backslash is an escape character, so skip the next character
          position++;
          break;
        case '{':
          count++;
          break;
        case '}':
          count--;
          break;
        default:
          // do nothing
      }

      if (count === 0) {
        break;
      }
      position++;
    }

    tag.content = (content.substring(0, start) + content.substring(position+1)).trim();
    tag.typeExpression = content.slice(start+1, position).trim();

    tag.type = catharsis.parse(tag.typeExpression, {jsdoc: true});
  }
}


/**
 * Process the type information in the tags
 * @param  {TagCollection} tags The collection of tags to process
 */
module.exports = function(tags) {
  _.forEach(tags.tags, function(tag) {
    if ( tag.tagDef.canHaveType ) {
      extractTypeExpression(tag);
    }
  });
};



// Tag.prototype = {
//   getTypeInfo: function() {
//     if ( this.type ) {

//       var isOptional = this.type.type === 'OptionalType';
//       var mainType = isOptional ? this.type.expression : this.type;

//       var mainTypeString = doctrine.type.stringify(mainType);
//       var isUnion = mainType.type === 'UnionType';
//       var typeList;

//       if ( isUnion ) {
//         typeList = _.map(mainType.elements, function(element) {
//           return doctrine.type.stringify(element);
//         });
//       } else {
//         typeList = [mainTypeString];
//       }

//       return {
//         description: mainTypeString,
//         optional: isOptional,
//         typeList: typeList
//       };
//     }
//   }
// };



// /** @private */
// function getTypeStrings(parsedType) {
//   var types = [];

//   var TYPES = catharsis.Types;
//   var util = require('util');

//   switch(parsedType.type) {
//     case TYPES.AllLiteral:
//       types.push('*');
//       break;
//     case TYPES.FunctionType:
//       types.push('function');
//       break;
//     case TYPES.NameExpression:
//       types.push(parsedType.name);
//       break;
//     case TYPES.NullLiteral:
//       types.push('null');
//       break;
//     case TYPES.RecordType:
//       types.push('Object');
//       break;
//     case TYPES.TypeApplication:
//       types.push( catharsis.stringify(parsedType) );
//       break;
//     case TYPES.TypeUnion:
//       parsedType.elements.forEach(function(element) {
//         types = types.concat( getTypeStrings(element) );
//       });
//       break;
//     case TYPES.UndefinedLiteral:
//       types.push('undefined');
//       break;
//     case TYPES.UnknownLiteral:
//       types.push('?');
//       break;
//     default:
//       // this shouldn't happen
//       throw new Error( util.format('unrecognized type %s in parsed type: %j', parsedType.type,
//         parsedType) );
//   }

//   return types;
// }