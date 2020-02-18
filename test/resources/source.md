# Sample Markdown

This is a sample markdown file to test the plugin `remark-simple-plantuml`.

If the code blocks like following are contained, it should be converted to a Image node.

```plantuml
hide empty member

class RemarkSimplePlantUML {
    + transform(node: AST): AST
}
```

```plantuml Title should be displayed
hide empty member

interface Transformer {
    + transform(node: AST): AST
}
```

```javascript
console.log("This code block should be ignored");
```
