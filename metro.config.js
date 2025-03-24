const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');
const {withMonicon} = require('@monicon/metro');

const defaultConfig = getDefaultConfig(__dirname);
const isDevelopment = process.env.NODE_ENV !== 'production';

// Asegurar que defaultConfig.resolver existe
defaultConfig.resolver = defaultConfig.resolver || {};

// Si blockList no es un array, conviértelo en uno
if (!Array.isArray(defaultConfig.resolver.blockList)) {
  defaultConfig.resolver.blockList = [];
}

defaultConfig.resolver.blockList.push(/@monicon\/runtime/);

const customConfig = {
  resolver: defaultConfig.resolver, // Asegura que blockList se mantiene
};

const mergedConfig = mergeConfig(defaultConfig, customConfig);
const moniconConfig = withMonicon(mergedConfig, {
  icons: [
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
  collections: ['radix-icons'],
});

// Solo importa Storybook en desarrollo
let finalConfig = moniconConfig;
if (isDevelopment) {
  try {
    const withStorybook = require('@storybook/react-native/metro/withStorybook');
    finalConfig = withStorybook(moniconConfig, {
      enabled: true,
      configPath: path.resolve(__dirname, './.storybook'),
    });
  } catch (error) {
    console.warn('⚠️ Storybook no está instalado, continuando sin él.');
  }
}

module.exports = finalConfig;
