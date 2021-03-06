var _ = require('lodash');

// Matches:
// name, [name], [name=default], name text, [name] text, [name=default] text, name - text, [name] - text or [name=default] - text
var NAME_AND_DESCRIPTION = /^\s*(\[([^\]=]+)(?:=([^\]]+))?\]|\S+)((?:[ \t]*\-\s*|\s+)(\S[\s\S]*))?\s*$/;

/**
 * Extract the name information from a tag
 * @param  {Tag} tag The tag to process
 */
function extractName(tag) {

  tag.content = tag.content.replace(NAME_AND_DESCRIPTION, function(match, name, optionalName, defaultValue, description, dashDescription) {
    tag.name = optionalName || name;
    if ( optionalName ) {
      tag.optional = true;
    }
    if ( defaultValue ) {
      tag.defaultValue = defaultValue;
    }
    return dashDescription || description;
  });

}

/**
 * Process the name information in the tags
 * @param  {TagCollection} tags The collection of tags to process
 */
module.exports = function(tags) {
  _.forEach(tags.tags, function(tag) {
    if ( tag.tagDef.canHaveName ) {
      extractName(tag);
    }
  });
};