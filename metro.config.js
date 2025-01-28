// metro.config.js
const {getDefaultConfig} = require('@react-native/metro-config');
const {withMonicon} = require('@monicon/metro');
const config = getDefaultConfig(__dirname);

config.resolver.blockList = [/@monicon\/runtime/].concat(
  config.resolver.blockList,
);

module.exports = withMonicon(config, {
  icons: [
    'feather:activity',
    'logos:active-campaign',
    'lucide:badge-check',
    'mdi:home',
  ],
  collections: ['radix-icons'], // entire collection if you do not want to list icons
});
