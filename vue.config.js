// eslint-disable-next-line
const packageJSON = require("./package.json");

module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? `/${packageJSON.name}/` : "/",
};
