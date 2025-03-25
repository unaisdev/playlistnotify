import React, {useState} from 'react';
import {View, TextInput, ActivityIndicator} from 'react-native';
import {useTranslation} from 'react-i18next';
import Text from '@app/commons/layout/Text';
import {Button} from '@app/commons/components/Button';
import {useBetaSignupMutation} from '@app/services/beta';
import {validateEmail} from '@app/utils/validation';
import {useTheme} from '@app/commons/theme/hooks/useTheme';
import {createStyles} from './styles';

interface BetaScreenProps {
  onClose: () => void;
}

export const BetaScreen: React.FC<BetaScreenProps> = ({onClose}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const {t} = useTranslation();
  const {isDarkMode} = useTheme();
  const styles = createStyles(isDarkMode);

  const betaSignupMutation = useBetaSignupMutation();

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setEmailError(t('beta.invalid_email'));
      return;
    }
    setEmailError(null);
    betaSignupMutation.mutate(email);
  };

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

      {betaSignupMutation.isSuccess && (
        <Text style={styles.success}>{t('beta.success')}</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button
          onPress={handleSubmit}
          disabled={
            betaSignupMutation.isLoading || betaSignupMutation.isSuccess
          }
          style={[
            styles.button,
            (betaSignupMutation.isLoading || betaSignupMutation.isSuccess) &&
              styles.buttonDisabled,
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
