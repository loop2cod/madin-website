const index = {
  fetch() {
    return new Response(`Running in ${navigator.userAgent}!`);
  }
};
export {
  index as default
};
