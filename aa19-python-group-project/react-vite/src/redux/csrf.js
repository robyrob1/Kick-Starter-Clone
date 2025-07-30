// src/redux/csrf.js
export async function csrfFetch(url, options = {}) {
  options.method = options.method || "GET";
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== "GET") {
    options.headers["Content-Type"] = options.headers["Content-Type"] || "application/json";
    options.headers["XSRF-Token"] = getCookie("XSRF-TOKEN");
  }

  const res = await fetch(url, options);

  if (res.status >= 400) throw res;
  return res;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
