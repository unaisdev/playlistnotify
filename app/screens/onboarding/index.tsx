import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomPagination from './Pagination';
import First from './First';
import Second from './Second';
import {RootStackParamList} from '@app/navigation';
import LinearGradient from 'react-native-linear-gradient';

const totalOnboardScreens = 2;

const OnBoarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const styles = styling(currentIndex);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleBack = () => {
    if (currentIndex === 0) return navigation.replace('Login');

    setCurrentIndex(previous => previous - 1);
  };

  useEffect(() => {});

  const handleNext = async () => {
    if (currentIndex >= totalOnboardScreens - 1) {
      await checkNotificationStatus();
      return;
    }

    setCurrentIndex(previous => previous + 1);
  };

  const checkNotificationStatus = async () => {
    navigation.replace('Login');

    // Lógica de verificación de permisos de notificación
    // ...

    // Si no se han habilitado las notificaciones, muestra una alerta
    // if (
    //   !settings.granted ||
    //   settings.ios?.status !== Notifications.IosAuthorizationStatus.AUTHORIZED
    // ) {
    //   Alert.alert(
    //     'No has habilitado las notificaciones',
    //     '¿Estás seguro de que deseas continuar?',
    //     [
    //       {
    //         text: 'Volver',
    //         style: 'cancel',
    //         onPress: () => {
    //           return;
    //         },
    //       },
    //       {
    //         text: 'Continuar',
    //         style: 'destructive',
    //         onPress: async () => {
    //           navigation.replace('Login');
    //         },
    //       },
    //     ],
    //   );
    // } else {
    //   navigation.replace('Login');
    // }
  };

  const showSecondComponent = currentIndex >= 1;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{width: '100%', paddingBottom: 16}}>
        <View style={styles.buttonContainer}>
          {currentIndex >= 1 && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={[styles.buttonText, {color: 'rgba(0, 0, 0, 0.6)'}]}>
                Atrás
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text
              style={[
                styles.buttonText,
                {
                  color:
                    currentIndex >= totalOnboardScreens - 1
                      ? 'rgba(0, 0, 0, 0.6)'
                      : 'white',
                },
              ]}>
              {currentIndex >= totalOnboardScreens - 1
                ? 'Finalizar'
                : 'Siguiente'}
            </Text>
          </TouchableOpacity>
        </View>
        <CustomPagination
          currentIndex={currentIndex}
          numTotalItems={totalOnboardScreens}
        />
      </View>
      {currentIndex === 0 && <First />}
      {showSecondComponent && <Second />}
      <LinearGradient
        colors={['lightblue', 'blue']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={styles.poweredByContainer}>
        <LinearGradient
          colors={['transparent', 'rgba(192,32,64,0.9)', 'transparent']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 200,
          }}
          start={{x: 0, y: 1.0}}
          end={{x: 0, y: 0}}
        />

        <Text style={styles.poweredByText}>Powered by</Text>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../../assets/spotify-icons-logos/logos/spotify-for-developers-white.png')}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styling = (currentIndex: number) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: currentIndex < 1 ? 'flex-end' : 'space-between',
      alignItems: 'center',
      paddingBottom: 8,
      paddingHorizontal: 12,
    },
    backButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 4,
      backgroundColor: '#F3F4F6',
    },
    nextButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 4,
      backgroundColor:
        currentIndex >= totalOnboardScreens - 1 ? '#F3F4F6' : '#E5E7EB',
    },
    buttonText: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    poweredByContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      columnGap: 12,
      marginBottom: 24,
    },
    poweredByText: {
      fontSize: 10,
      fontWeight: 'bold',
      textAlign: 'center',
      opacity: 0.5,
    },
    logo: {
      width: 200,
      height: 80,
    },
  });
};

export default OnBoarding;
