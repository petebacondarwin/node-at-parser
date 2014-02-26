# at-parser

Simple, Flexible JSDoc-style Tag Parser

## Installation

```
npm install --save at-parser
```

## Usage

```
var atParser = require('at-parser');
var tagProcessors = require('at-parser/lib/tagProcessors');

// Provide some tag definitions
var tagDefinitions = [ ... ];

// Create the parser
var tagParser = atParser.tagParserFactory(tagDefinitions, tagProcessors);

// Parse the text extracted from a doc/comment
var tags = tagParser('Some content\n@someTag tag content', 12);
```

