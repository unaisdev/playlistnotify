import {StyleSheet, Touchable, TouchableOpacity, View} from 'react-native';

import Text from '@app/features/commons/layout/Text';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  SORTED_TYPE_KEYS,
  useProfileContext,
} from '@app/containers/ProfileContext';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@app/features/commons/theme/hooks/useTheme';

type Props = {
  handleBottomSheetOpen: () => void;
};

const OrderBy = ({handleBottomSheetOpen}: Props) => {
  const {sortedType} = useProfileContext();
  const {isDarkMode} = useTheme();
  const {t} = useTranslation();

  const handlePress = () => {
    handleBottomSheetOpen();
    console.log('opened');
  };

  const CUSTOM_SORTED_TYPE_TEXT = {
    [SORTED_TYPE_KEYS.RECENT_ADDED]: t('profile.order_recent'),
    [SORTED_TYPE_KEYS.ALPHABETICAL]: t('profile.order_alphabetical'),
    [SORTED_TYPE_KEYS.CREATED_BY]: t('profile.order_createdby'),
  };

  const customText = CUSTOM_SORTED_TYPE_TEXT[sortedType] || sortedType;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.inline}>
        <FontAwesome
          name="unsorted"
          size={18}
          color={isDarkMode ? 'white' : 'black'}
        />
        <Text style={{fontSize: 12}}>{customText}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialCommunityIcons
          name="view-grid-outline"
          size={18}
          color={isDarkMode ? 'white' : 'black'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 12,
  },
});

export default OrderBy;
