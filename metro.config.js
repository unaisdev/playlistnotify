// metro.config.js
const {getDefaultConfig} = require('@react-native/metro-config');
const {withMonicon} = require('@monicon/metro');
const config = getDefaultConfig(__dirname);

config.resolver.blockList = [/@monicon\/runtime/].concat(
  config.resolver.blockList,
);

module.exports = withMonicon(config, {
  icons: [
    // http://icones.js.org
    'feather:activity',
    'logos:active-campaign',
    'lucide:badge-check',
    'mdi:home',
    'mdi:search',
    'mdi:beta',
    'mdi:theme-light-dark',
    'material-symbols:arrow-back-ios',
    'material-symbols:notifications-off-outline-rounded',
    'material-symbols:notifications-active-rounded',
    'material-symbols:delete-outline',
    'material-symbols:close-rounded',
    'material-symbols:settings',
    'material-symbols:check',
    'material-symbols:grid-view',
    'material-symbols:translate-rounded',
    'material-symbols:logout',
    'material-symbols:format-list-bulleted',
    'material-symbols:sort',
    'material-symbols:arrow-right-alt',
    'material-symbols:settings-rounded',
    'material-symbols:person',
    'nrk:media-playlist-add',
    'nrk:media-playlist-remove',
  ],
  collections: ['radix-icons'], // entire collection if you do not want to list icons
});
