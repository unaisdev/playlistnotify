import React, {useState, useEffect} from 'react';
import {View, TextInput, ActivityIndicator} from 'react-native';
import {useTranslation} from 'react-i18next';
import Text from '@app/commons/layout/Text';
import {Button} from '@app/commons/components/Button';
import {validateEmail} from '@app/utils/validation';
import {useTheme} from '@app/commons/theme/hooks/useTheme';
import {createStyles} from './styles';
import {useBetaSignupMutation} from './hooks/useBetaSignup';
import {useBetaCheckEmailMutation} from './hooks/useBetaCheckEmail';
import {saveBetaEmail, getBetaEmail} from './utils';

export const BetaScreen = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const {t} = useTranslation();
  const {isDarkMode} = useTheme();
  const styles = createStyles(isDarkMode);

  const betaSignupMutation = useBetaSignupMutation();
  const {data: betaCheckEmailData, mutate} = useBetaCheckEmailMutation(email);
  console.log('betaCheckEmailData', betaCheckEmailData);
  // Cargar email guardado al iniciar
  useEffect(() => {
    const loadSavedEmail = async () => {
      const savedEmail = await getBetaEmail();
      if (savedEmail) {
        setEmail(savedEmail);
        mutate(savedEmail);
      }
    };
    loadSavedEmail();
  }, []);

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setEmailError(t('beta.invalid_email'));
      return;
    }
    setEmailError(null);
    await saveBetaEmail(email); // Guardar email en AsyncStorage
    betaSignupMutation.mutate(email);
  };

  if (betaCheckEmailData || betaSignupMutation.isSuccess) {
    return (
      <View style={styles.successContainer}>
        {/* <Icon name="check-circle" size={80} color="#1DB954" /> */}
        <Text style={styles.successTitle}>
          {t('beta.already_registered_title')}
        </Text>
        <Text style={styles.successDescription}>
          {t('beta.already_registered_description')}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title} textType="bold">
        {t('beta.title')}
      </Text>

      <Text style={styles.description}>{t('beta.description')}</Text>
      <Text style={styles.description}>{t('beta.subdescription')}</Text>

      <TextInput
        style={[
          styles.input,
          emailError && styles.inputError,
          betaSignupMutation.isError && styles.inputError,
        ]}
        value={email}
        onChangeText={setEmail}
        placeholder={t('beta.email_placeholder')}
        placeholderTextColor={isDarkMode ? '#666666' : '#999999'}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        editable={!betaSignupMutation.isLoading}
      />

      {emailError && <Text style={styles.error}>{emailError}</Text>}

      {betaSignupMutation.isError && (
        <Text style={styles.error}>{t('beta.error')}</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button
          onPress={handleSubmit}
          disabled={betaSignupMutation.isLoading}
          style={[
            styles.button,
            betaSignupMutation.isLoading && styles.buttonDisabled,
          ]}>
          {betaSignupMutation.isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>{t('beta.submit')}</Text>
          )}
        </Button>
      </View>
    </View>
  );
};
