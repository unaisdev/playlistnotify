import i18n from '@app/services/i18next';

export function useLanguage() {
  const currentLanguage = i18n.language;
  const languagesAvailable = i18n.languages.filter(
    lang => lang !== currentLanguage,
  );

  const languageNames: Record<string, string> = {
    es: i18n.t('es_language'),
    en: i18n.t('en_language'),
  };

  const currentLanguageData = {
    key: currentLanguage,
    value: languageNames[currentLanguage] || currentLanguage,
  };

  const languagesAvailableData = languagesAvailable.map(language => ({
    key: language,
    value: languageNames[language] || language,
  }));

  const changeLanguage = (language: keyof typeof languageNames) => {
    i18n.changeLanguage(language);
  };

  return {
    currentLanguage: currentLanguageData,
    languagesAvailable: languagesAvailableData,
    changeLanguage,
  };
}
