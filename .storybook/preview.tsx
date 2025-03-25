// .storybook/preview.tsx
import React from 'react';
import type {Preview} from '@storybook/react';
import {withBackgrounds} from '@storybook/addon-ondevice-backgrounds';
import {View} from 'react-native';

const preview: Preview = {
  decorators: [
    withBackgrounds,
    Story => (
      <View style={{flex: 1, backgroundColor: 'red'}}>
        <Story />
      </View>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'plain',
      values: [
        {name: 'plain', value: 'white'},
        {name: 'warm', value: 'hotpink'},
        {name: 'cool', value: 'deepskyblue'},
      ],
    },
  },
};

export default preview;
