import {render} from '@testing-library/react-native';
import App from '../App';
import LoginScreen from '@app/screens/login';
import {RootStackParamList} from '@app/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type NavigationScreenPropAlias = NativeStackNavigationProp<RootStackParamList>;

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

describe('app root testing', () => {
  test('rendering good', () => {
    expect(render(<App />).toJSON());
  });

  test('rendering good', () => {
    const mockedCanGoBack = jest.fn().mockReturnValue(true);

    const mockedGoBack = jest.fn();

    const mockedNavigation = {
      canGoBack: mockedCanGoBack,
      goBack: mockedGoBack,
    };

    expect(
      render(<LoginScreen navigation={mockedNavigation as any} />).toJSON(),
    );
  });
});
