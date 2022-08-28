export default {
  toParamns(params) {
    const ret = [];
    for (let d in params) {
      if (params[d]) {
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(params[d]));
      }
    }
    return ret.join("&");
  },
};
