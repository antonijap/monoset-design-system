module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Reanimated plugin must be the last item.
      'react-native-reanimated/plugin',
    ],
  };
};
