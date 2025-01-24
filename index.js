"use strict";
/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("uv-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("uv-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");

// Check if there's a query string in the URL
const urlParams = new URLSearchParams(window.location.search);
const q = urlParams.get('q');
if (q) {
  const url = search(q, searchEngine.value);
  localStorage.setItem('url', __uv$config.prefix + __uv$config.encodeUrl(url));
  location.href = "launch.html";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    await registerSW();
  } catch (err) {
    error.innerHTML = "<span style='font-weight:700;color:red;'>ERROR: </span>Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }

  // get the url!
  const url = search(address.value, searchEngine.value);
  localStorage.setItem('url', __uv$config.prefix + __uv$config.encodeUrl(url));
  
  // go to load.html
  location.href = "launch.html";
});