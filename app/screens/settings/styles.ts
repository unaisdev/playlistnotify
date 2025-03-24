import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    width: '100%',
  },
  betaContainer: {
    alignItems: 'flex-end',
  },
  itemWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  itemContainer: {
    width: '90%',
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    padding: 18,
    rowGap: 16,
  },
  itemContainerDark: {
    backgroundColor: '#424242',
  },
  languageContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  itemLanguage: {
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  itemLanguageDark: {
    backgroundColor: '#212121',
  },
});
