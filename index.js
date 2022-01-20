const visit = require("unist-util-visit");
const plantumlEncoder = require("plantuml-encoder");

const DEFAULT_OPTIONS = {
  baseUrl: "https://www.plantuml.com/plantuml/png",
  type: "image"
};

/**
 * Plugin for remark-js
 *
 * See details about plugin API:
 * https://github.com/unifiedjs/unified#plugin
 *
 * You can specify the endpoint of PlantUML with the option 'baseUrl'
 *
 * @param {Object} pluginOptions Remark plugin options.
 */
function remarkSimplePlantumlPlugin(pluginOptions) {
  const options = { ...DEFAULT_OPTIONS, ...pluginOptions };

  return function transformer(syntaxTree) {
    visit(syntaxTree, "code", node => {
      let { lang, value, meta } = node;
      if (!lang || !value || lang !== "plantuml") return;

      let url = `${options.baseUrl.replace(/\/$/, "")}/${plantumlEncoder.encode(value)}`;

      if (options.type === "image") {
        node.type = "image";
        node.url = url;
      } else if (options.type === "svg") {
        node.type = "paragraph";
        node.children = [{ value: `<object type="image/svg+xml" data="${url}" />`, type: "html" }];
      }

      node.alt = meta;
      node.meta = undefined;

    });
    return syntaxTree;
  };
}

module.exports = remarkSimplePlantumlPlugin;
