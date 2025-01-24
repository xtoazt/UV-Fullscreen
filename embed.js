"use strict";
let destination = "";

try {
  destination = new URL(location.hash.slice(1)).toString();
} catch (err) {
  alert(`Your boat crashed!\nBad string or URL:\n${err}`);
  throw err;
}

registerSW()
  .then(() => {
    window.open(
      __uv$config.prefix + __uv$config.encodeUrl(destination),
      "_self"
    );
  })
  .catch((err) => {
    alert(`Your boat crashed!\nAn error occured:\n${err}`);
  });