JSON.stringify2SwitchCase = function (object) {
  if (object == null) return null;
  if (Array.isArray(object)) {
    let output = "[";
    for (var i = 0, cache = object.length; i < cache; i++) {
      output += (i ? "," : "") + JSON.stringify2SwitchCase(object[i]);
    }
    return output + "]";
  }
  switch (typeof object) {
    case "object":
      let output = "{";
      let i = 0;
      for (let key in object) {
        let value = object[key];
        if (value != undefined) {
          output +=
            (i++ ? "," : "") +
            '"' +
            key +
            '":' +
            JSON.stringify2SwitchCase(value);
        }
      }
      return output + "}";
    case "number":
    case "boolean":
      return object;
    default:
      return '"' + object + '"';
  }
};

module.exports = JSON.stringify2SwitchCase;
