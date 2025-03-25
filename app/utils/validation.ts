export const validateEmail = (email: string): boolean => {
  if (!email) return false;

  // Basic structural validation
  const hasAtSign = email.includes('@');
  const hasDot = email.includes('.');
  const hasValidLength = email.length >= 5 && email.length <= 254; // RFC 5321
  const hasNoSpaces = !email.includes(' ');

  // Position validation
  const atSignIndex = email.indexOf('@');
  const lastDotIndex = email.lastIndexOf('.');

  const hasLocalPart = atSignIndex > 0;
  const hasDomain = lastDotIndex > atSignIndex + 1;
  const hasTopLevelDomain = lastDotIndex < email.length - 2;

  return (
    hasAtSign &&
    hasDot &&
    hasValidLength &&
    hasNoSpaces &&
    hasLocalPart &&
    hasDomain &&
    hasTopLevelDomain
  );
};
