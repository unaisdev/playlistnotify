import {PropsWithChildren, useMemo} from 'react';

import {Text as RNText, StyleSheet, TextProps} from 'react-native';

import {useTheme} from '../../theme/hooks/useTheme';

interface CustomTextProps extends TextProps {
  textType?: 'regular' | 'bold' | 'light';
  colorReverted?: boolean;
}

type Props = CustomTextProps & PropsWithChildren;

const Text: React.FC<Props> = ({
  children,
  textType,
  style: comingStyles,
  colorReverted,
}) => {
  const {isDarkMode} = useTheme();

  const styles = styling(isDarkMode);

  const style = useMemo(() => {
    if (textType === 'bold') return styles.bold;
    if (textType === 'light') return styles.light;
    if (textType === 'regular') return styles.regular;
  }, [textType]);

  const colorRevertedStyle = useMemo(() => {
    if (colorReverted) return styles.revertedTextColor;
  }, [colorReverted]);

  return (
    <RNText style={[styles.textColor, style, comingStyles, colorRevertedStyle]}>
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
  });
};

export default Text;
