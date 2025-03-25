import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {StoryDecorator} from '../../StoryDecorator';
import {Button} from 'react-native';

const Playground: StoryObj<typeof Button> = {};
const ButtonStory: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  args: {
    title: 'Click me!',
    disabled: false,
    testID: 'button',
  },
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
  decorators: [Story => <StoryDecorator Story={Story} />],
};

export default ButtonStory;
export {Playground};
