const { override, addDecoratorsLegacy } = require('customize-cra');
module.exports = override(
    addDecoratorsLegacy()
);
module.exports = function override(config, env) {
  return config;
};
