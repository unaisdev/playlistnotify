const mockAuthorize = jest.fn();

jest.mock('react-native-app-auth', () => ({
  authorize: mockAuthorize,
}));
