import React from 'react';
import {View} from 'react-native';

interface StoryDecoratorProps {
  Story: React.FC;
}

export const StoryDecorator: React.FC<StoryDecoratorProps> = ({Story}) => {
  return (
    <View style={{flex: 1, margin: 24}}>
      <Story />
    </View>
  );
};
