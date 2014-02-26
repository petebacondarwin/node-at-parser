var _ = require('lodash');

/**
 * A collection of tags that can be looked up by their tagDefinition.
 */
var TagCollection = function() {
  this.tags = [];
  this.tagsByName = {};
  this.badTags = [];
  this.description = '';
};

TagCollection.prototype = {

  /**
   * Add a new tag to the collection.
   * @param {Tag} tag The tag to add
   */
  addTag: function(tag) {
    if ( !tag.errors ) {
      this.tags.push(tag);

      var tags = this.tagsByName[tag.tagDef.name] || [];
      tags.push(tag);
      this.tagsByName[tag.tagDef.name] = tags;

    } else {
      this.badTags.push(tag);
    }
  },

  /**
   * Remove a tag from the collection
   * @param  {Tag} tag The tag to remove
   */
  removeTag: function(tag) {
    _.remove(this.tags, tag);
    _.remove(this.tagsByName[tag.tagDef.name], tag);
  },

  /**
   * Get the first tag in the collection that has the provided tag definition
   * @param  {Object} tagDef The tag definition to match
   * @return {Tag}
   */
  getTag: function(tagDef) {
    return this.getTags(tagDef)[0];
  },

  getTags: function(tagDef) {
    return this.tagsByName[tagDef.name] || [];
  }

};


module.exports = TagCollection;