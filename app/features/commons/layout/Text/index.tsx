import {PropsWithChildren, useMemo} from 'react';

import {Text as RNText, StyleSheet, TextProps} from 'react-native';

import {useTheme} from '../../theme/hooks/useTheme';

interface CustomTextProps extends TextProps {
  textType?: 'regular' | 'bold' | 'light' | 'semi';
  colorReverted?: boolean;
}

type Props = CustomTextProps & TextProps;

const Text: React.FC<Props> = ({
  children,
  textType,
  style: comingStyles,
  colorReverted,
  ellipsizeMode,
  numberOfLines,
}) => {
  const {isDarkMode} = useTheme();

  const styles = styling(isDarkMode);

  const style = useMemo(() => {
    if (textType === 'bold') return styles.bold;
    if (textType === 'light') return styles.light;
    if (textType === 'regular') return styles.regular;
    if (textType === 'semi') return styles.semi;
  }, [textType]);

  const colorRevertedStyle = useMemo(() => {
    if (colorReverted) return styles.revertedTextColor;
  }, [colorReverted]);

  return (
    <RNText
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.textColor, style, comingStyles, colorRevertedStyle]}>
      {children}
    </RNText>
  );
};

const styling = (isDarkMode: boolean) => {
  return StyleSheet.create({
    textColor: {
      color: isDarkMode ? 'white' : 'black',
    },
    revertedTextColor: {
      color: isDarkMode ? 'black' : 'white',
    },
    regular: {
      fontWeight: '500',
    },
    bold: {
      fontWeight: 'bold',
    },
    light: {
      fontWeight: '200',
    },
    semi: {
      fontWeight: '600',
    },
  });
};

export default Text;
