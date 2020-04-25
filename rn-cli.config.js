// ./rn-cli.config.js
module.exports = {

    /// @name Make ReactNative Great Again
    /// @description Allows you to enable support for JSX files, and `.mjs` files which is the new node standard
    /// @source http://www.fallingcanbedeadly.com/posts/enabling-react-native-jsx-extension
    /// @note One caveat, The `index.js` file in the root of your project has to be `.js`.
    getSourceExts: () => [ 'jsx', 'mjs', 'js' ],
  };
