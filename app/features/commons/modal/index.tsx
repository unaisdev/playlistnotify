import {useState} from 'react';
import {Alert, View, Pressable, StyleSheet, Modal} from 'react-native';
import Text from '@app/features/commons/layout/Text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  modalVisible: boolean;
  toggleModal: () => void;
};

const AppModal = ({modalVisible, toggleModal}: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        toggleModal();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => toggleModal()}>
            <MaterialCommunityIcons name="close" size={22} color={'black'} />
          </Pressable>
          <Text style={styles.modalText}>
            ¡Atención! Esta aplicación está en fase beta.
          </Text>
          <Text style={styles.modalText}>
            Comentar que podrían ocurrir fallos en cualquier momento. Gracias
            por tu comprensión y paciencia.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: '#00C853',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AppModal;
