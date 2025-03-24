import {Image, TouchableOpacity} from 'react-native';

import Text from '@app/commons/layout/Text';

type Props = {
  filterFn: () => void;
  filterText: string;
  isSelected: boolean;
  showSpotifyIcon?: boolean;
};

const FilterItem = ({
  filterFn,
  filterText,
  isSelected,
  showSpotifyIcon,
}: Props) => {
  const handlePress = () => {
    filterFn();
  };

  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 20,
        paddingVertical: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        borderRadius: 20,
        backgroundColor: '#BDBDBD',
        opacity: isSelected ? 1 : 0.5,
      }}
      onPress={handlePress}>
      <Text>{filterText}</Text>
      {showSpotifyIcon && (
        <Image
          style={{
            width: 21,
            height: 21,
          }}
          resizeMode="contain"
          source={require('../../../../../assets/spotify-icons-logos/icons/01_RGB/02_PNG/Spotify_Icon_RGB_White.png')}
        />
      )}
    </TouchableOpacity>
  );
};

export default FilterItem;
