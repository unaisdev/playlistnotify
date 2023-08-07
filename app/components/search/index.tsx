import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation';
import {ScrollView} from 'react-native-gesture-handler';
import {Linking} from 'react-native';
import {PlaylistModel} from '../../services/types';
import {fetchSearchPlaylists} from '../../services/search';
import SearchList from './searchList';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Search = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [searchResults, setSearchResults] = useState<PlaylistModel[]>([]);
  const fetchTimer = useRef<NodeJS.Timeout | null>(null);

  const inputRef = useRef<TextInput>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    // Cancelar el temporizador anterior si aún está activo
    if (fetchTimer.current) {
      clearTimeout(fetchTimer.current);
    }

    // Verificar si hay texto en el input
    if (searchPhrase.length === 0) {
      setSearchResults([]);
      setLoadingList(false);
      return;
    }
    if (searchPhrase.length === 0) setSearchResults([]);

    // Crear un temporizador para retrasar la ejecución de la búsqueda
    fetchTimer.current = setTimeout(async () => {
      setLoadingList(true);
      const searchedPlaylists = await fetchSearchPlaylists(searchPhrase);
      setSearchResults(searchedPlaylists);
      setLoadingList(false);
    }, 650);

    // Limpiar el temporizador cuando el componente se desmonte
    return () => {
      if (fetchTimer.current) {
        clearTimeout(fetchTimer.current);
      }
    };
  }, [searchPhrase]);

  const handleTextChange = (text: string) => {
    setSearchPhrase(text);
  };

  const handlePress = () => {
    setClicked(true);
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    setClicked(false);
  };

  const handleClear = () => {
    inputRef.current?.blur();

    setSearchPhrase('');
    setClicked(false);
    setSearchResults([]);

    if (fetchTimer.current) {
      clearTimeout(fetchTimer.current);
      fetchTimer.current = null;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.searchBarContainer}
        onPress={handlePress}
        activeOpacity={1}>
        <View style={styles.searchBar}>
          <View>
            {/* className="flex items-center justify-center" */}
            {loadingList ? (
              <ActivityIndicator size={'small'} color={'gray'} />
            ) : (
              <MaterialIcons name="search" size={20} color="white" />
            )}
          </View>

          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="¿En qué lista quieres activar las notificaciones?"
            value={searchPhrase}
            onChangeText={handleTextChange}
            onBlur={handleBlur}
            onFocus={() => setClicked(true)}
            placeholderTextColor="#d3d3d3"
          />
          <View>
            {searchPhrase.length > 0 && (
              <TouchableOpacity onPress={handleClear}>
                {/* <Entypo name="cross" size={20} color="white" /> */}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <SearchList searchResults={searchResults} />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {

},
  searchBarContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 12,
    marginVertical: 12,
  },
  searchBar: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    fontSize: 13,
    color: '#fff',
    flexGrow: 1,
    marginLeft: 12,
  },
});
