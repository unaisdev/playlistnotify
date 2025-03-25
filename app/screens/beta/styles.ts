import {StyleSheet} from 'react-native';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: isDarkMode ? '#212121' : '#FFFFFF',
    },
    title: {
      fontSize: 24,
      marginBottom: 12,
      textAlign: 'center',
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    description: {
      marginBottom: 20,
      textAlign: 'center',
      color: isDarkMode ? '#B3B3B3' : '#666666',
    },
    input: {
      borderWidth: 1,
      borderColor: isDarkMode ? '#424242' : '#E0E0E0',
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      fontSize: 16,
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    inputError: {
      borderColor: '#FF4444',
    },
    error: {
      color: '#FF4444',
      marginBottom: 12,
    },
    success: {
      color: '#1DB954',
      textAlign: 'center',
      marginBottom: 12,
    },
    buttonContainer: {
      alignItems: 'center',
      marginTop: 16,
    },
    button: {
      minWidth: 200,
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    successButton: {
      backgroundColor: '#1DB954',
    },
    successContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: isDarkMode ? '#212121' : '#FFFFFF',
    },
    successTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#000000',
      marginTop: 20,
      marginBottom: 12,
      textAlign: 'center',
    },
    successDescription: {
      fontSize: 16,
      color: isDarkMode ? '#B3B3B3' : '#666666',
      textAlign: 'center',
      marginBottom: 20,
    },
  });
