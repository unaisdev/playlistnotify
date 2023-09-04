import {useTheme} from '@app/features/commons/theme/hooks/useTheme';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const SkeletonItem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {isDarkMode} = useTheme();
  const opacity = useSharedValue(1);

  const styles = styling(isDarkMode);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withDelay(1000, withTiming(0.5, {duration: 1000})),
        withTiming(1, {duration: 500}),
      ),
      -1,
      true,
    );
  }, []);

  return (
    <Animated.View
      entering={FadeIn.duration(1000)}
      exiting={FadeOut.duration(1000)}
      style={styles.container}>
      <Animated.View style={[styles.image, {opacity}]} />

      <Animated.View style={[styles.infoContainer, {opacity}]}>
        <Animated.View style={styles.title} />
        <Animated.View style={styles.addedDeletedContainer}>
          <Animated.View style={styles.addedDeleted}></Animated.View>
          <Animated.View style={styles.addedDeleted}></Animated.View>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

const styling = (isDarkMode: boolean) => {
  return StyleSheet.create({
    container: {
      height: 86,
      marginVertical: 8,
      paddingHorizontal: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      columnGap: 10,
    },
    infoContainer: {
      padding: 8,
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: isDarkMode ? '#616161' : '#EEEEEE',
    },
    image: {
      width: 86,
      height: 86,
      backgroundColor: isDarkMode ? '#424242' : '#BDBDBD',
    },
    title: {
      padding: 8,
      width: '80%',
      height: 20,
      backgroundColor: isDarkMode ? '#424242' : '#BDBDBD',
    },
    addedDeletedContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
    },
    addedDeleted: {
      width: 90,
      height: 20,
      backgroundColor: isDarkMode ? '#424242' : '#BDBDBD',
    },
  });
};

export default SkeletonItem;
