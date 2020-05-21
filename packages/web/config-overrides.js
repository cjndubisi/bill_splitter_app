// Guide https://github.com/devhubapp/devhub/blob/master/packages/web/config-overrides.js
const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

// start: avoid clearing console
require('react-dev-utils/clearConsole');
require.cache[
  require.resolve('react-dev-utils/clearConsole')
].exports = () => {};
// end avoid

const appIncludes = [
  resolveApp('../..'),
  resolveApp('src'),
  resolveApp('../common/src'),
  resolveApp('../../node_modules/react-native-safe-area-context'),
  resolveApp('../../node_modules/react-native-elements'),
  resolveApp('../../node_modules/react-native-gesture-handler/'),
  resolveApp('../../node_modules/react-native-haptic-feedback/'),
  resolveApp('../../node_modules/react-native-vector-icons/'),
  resolveApp('../../node_modules/react-native-screens/'),
  resolveApp('../../node_modules/@react-native-community/async-storage'),
];

module.exports = function override(config, env) {
  const __DEV__ = env !== 'production';

  config.module.rules[0].include = appIncludes;
  config.module.rules[1] = null;
  config.module.rules[2].oneOf[1].include = appIncludes;
  config.module.rules[2].oneOf[1].options.plugins = [
    require.resolve('babel-plugin-react-native-web'),
    require.resolve('@babel/plugin-transform-modules-commonjs'),
  ].concat(config.module.rules[2].oneOf[1].options.plugins);

  config.plugins.push(new webpack.DefinePlugin({ __DEV__ }));
  config.resolve.alias = {
    ...config.resolve.alias,
    'react-native-web': resolveApp('../../node_modules/react-native-web'),
    react: resolveApp('../../node_modules/react'),
  };

  config.module.rules = config.module.rules.filter(Boolean);

  return config;
};
