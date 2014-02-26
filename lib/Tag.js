function Tag(tagDef, tagName, content, lineNumber) {
  this.tagDef = tagDef;
  this.tagName = tagName;
  this.content = content;
  this.startingLine = lineNumber;
}

module.exports = Tag;