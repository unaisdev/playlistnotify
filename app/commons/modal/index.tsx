import {Alert, Modal, Pressable, StyleSheet, View} from 'react-native';

import Text from '@app/commons/layout/Text';
import {Monicon} from '@monicon/native';

import Layout from '../layout/TabLayout';

type Props = {
  modalVisible: boolean;
  toggleModal: () => void;
};

const AppModal = ({modalVisible, toggleModal}: Props) => {
  return (
    <Modal
      testID="test-modal"
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        toggleModal();
      }}>
      <View style={styles.centeredView}>
        <View style={{width: '70%', alignItems: 'flex-end', paddingTop: 100}}>
          <Pressable
            testID="closeModalButton"
            style={[styles.button, styles.buttonClose]}
            onPress={() => toggleModal()}>
            <Monicon name="close" size={22} color={'black'} />
          </Pressable>
        </View>

        <Layout style={[styles.modalView, {flex: 0, padding: 20}]}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flex: 1,
                borderRadius: 12,
                flexDirection: 'row',
                paddingRight: 12,
                alignItems: 'center',
                backgroundColor: '#4CAF50',
                justifyContent: 'space-between',
              }}>
              <Monicon
                name="mdi:beta"
                size={22}
                color={'black'}
                style={{padding: 8}}
              />
              <Text colorReverted>BETA Release</Text>
            </View>
          </View>

          <Text style={styles.modalText}>
            Comentar que podrían ocurrir fallos en cualquier momento. Gracias
            por tu comprensión y paciencia.
          </Text>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              rowGap: 18,
            }}>
            <Text style={{opacity: 0.7, fontSize: 14}}>
              Made by Unai Canales with {`<3`}
            </Text>
            <View style={{alignItems: 'center'}}>
              <Text style={{opacity: 0.7, fontSize: 12}}>Playlist Notify</Text>
              <Text style={{opacity: 0.7, fontSize: 12}}>-</Text>
              <Text style={{opacity: 0.7, fontSize: 12}}>Versión ß 1.0</Text>
            </View>
          </View>
        </Layout>
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
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 20,
    rowGap: 12,
  },
  button: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    padding: 4,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#F4511E',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'left',
  },
});

export default AppModal;
