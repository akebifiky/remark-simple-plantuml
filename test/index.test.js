const chai = require("chai");
const fs = require("fs");
const path = require("path");
const remark = require("remark");
const plugin = require("../index");

describe("Plugin", () => {
  it("should convert PlantUML code to Image nodes", () => {
    const input = fs.readFileSync(path.resolve(__dirname, "./resources/source.md")).toString();
    const expected = fs.readFileSync(path.resolve(__dirname, "./resources/expected.md")).toString();

    const output = remark()
      .use(plugin)
      .processSync(input)
      .toString();

    chai.assert.equal(output, sanitized(expected));
  });

  it("should convert PlantUML code to the Image nodes which endpoint specified", () => {
    const input = fs.readFileSync(path.resolve(__dirname, "./resources/source.md")).toString();
    const expected = fs.readFileSync(path.resolve(__dirname, "./resources/expected.svg.md")).toString();

    const output = remark()
      .use(plugin, { baseUrl: "https://www.plantuml.com/plantuml/svg/" })
      .processSync(input)
      .toString();

    chai.assert.equal(output, sanitized(expected));
  });
});

function sanitized(input) {
  return input.replace(/\r\n/g, "\n");
}
