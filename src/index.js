import "./styles.css";

var object = { a: [{ b: { c: 3 } }] };

export const customGET = (obj, path, defaultValue, count = 0) => {
  let pathArray = path;
  if (
    count == 0 &&
    !(Object.prototype.toString.call(obj) === "[object Object]")
  ) {
    return undefined;
  }
  if (pathArray === undefined) {
    return undefined;
  }
  if (count == 0) {
    if (Array.isArray(path)) {
      pathArray = path;
    } else {
      pathArray = path.replace(/(\[(\d)\])/g, ".$2").split(".");
    }
    count += 1;
  }

  if (obj === undefined) {
    if (defaultValue === "" || defaultValue == null || defaultValue) {
      return defaultValue;
    } else {
      return undefined;
    }
  }
  if (!pathArray.length) {
    return obj;
  }

  if (pathArray.length) {
    return customGET(
      obj[pathArray.splice(0, 1)],
      pathArray,
      defaultValue,
      count
    );
  }
};
var output = customGET(object, "a[0].b");
document.getElementById("app").innerHTML = JSON.stringify(output);
