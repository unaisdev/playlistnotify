import React, {useState} from 'react';
import renderer from 'react-test-renderer';
import AppModal from '.';
import Text from '../layout/Text';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import {TouchableOpacity, View} from 'react-native';

const ProvingComponent = () => {
  const [text, setText] = useState('Testing button');

  

  return (
    <View>
      <TouchableOpacity
        testID="provingButton"
        onPress={() => {
          setText('clicked button');
        }}>
        <Text>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

describe('learning test for touchableOpacity', () => {
  test('renders button propperly', async () => {
    render(<ProvingComponent />);

    const touchable = screen.getByTestId('provingButton');

    await waitFor(() => {
      expect(touchable);
    });

    expect(screen.getByText('Testing button'));
  });

  test('click button, change text', async () => {
    render(<ProvingComponent />);

    const touchable = screen.getByTestId('provingButton');

    fireEvent.press(touchable);

    expect(screen.getByText('clicked button'));
  });
});
