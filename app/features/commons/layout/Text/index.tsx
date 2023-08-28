import {PropsWithChildren, useMemo} from 'react';
import {Text as RNText, StyleSheet, TextProps} from 'react-native';
import {useTheme} from '../../theme/hooks/useTheme';

interface CustomTextProps extends TextProps {
  textType?: 'regular' | 'bold' | 'light';
}

type Props = CustomTextProps & PropsWithChildren;

const Text: React.FC<Props> = ({children, textType, style: comingStyles}) => {
  const {isDarkMode} = useTheme();

  const style = useMemo(() => {
    if (textType === 'bold') return styles.bold;
    if (textType === 'light') return styles.light;
    if (textType === 'regular') return styles.regular;
  }, [textType]);

  return (
    <RNText style={[styles.textColor(isDarkMode), style, comingStyles]}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  textColor: (isDarkMode: boolean) => ({
    color: isDarkMode ? 'white' : 'black',
  }),
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

export default Text;
