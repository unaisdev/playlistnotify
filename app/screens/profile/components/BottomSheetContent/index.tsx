import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Text from '@app/features/commons/layout/Text';
import Layout from '@app/features/commons/layout/TabLayout';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {
  SORTED_TYPE_KEYS,
  useProfileContext,
} from '@app/containers/ProfileContext';
import {useTranslation} from 'react-i18next';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {useTheme} from '@app/features/commons/theme/hooks/useTheme';

type Props = {
  sortAlphabetical: () => void;
  sortCreatedBy: () => void;
  sortRecent: () => void;
};

const BottomSheetProfileContent = ({
  sortAlphabetical,
  sortCreatedBy,
  sortRecent,
}: Props) => {
  const {t} = useTranslation();
  const {isDarkMode} = useTheme();

  return (
    <Layout
      style={{
        justifyContent: 'center',
      }}>
      <BottomSheetView
        style={{
          flex: 1,
          justifyContent: 'space-around',
          paddingHorizontal: 12,
          rowGap: 20,
        }}>
        <Text
          textType="semi"
          style={{
            fontSize: 12,
            color: 'gray',
          }}>
          Ordenar por
        </Text>
        <View
          style={{
            paddingHorizontal: 12,
            rowGap: 12,
          }}>
          {Object.values(SORTED_TYPE_KEYS).map(key => {
            const {sortedType, setSorted, handleCloseModalPress} =
              useProfileContext();

            const CUSTOM_SORTED_TYPE_TEXT = {
              [SORTED_TYPE_KEYS.RECENT_ADDED]: t('profile.order_recent'),
              [SORTED_TYPE_KEYS.ALPHABETICAL]: t('profile.order_alphabetical'),
              [SORTED_TYPE_KEYS.CREATED_BY]: t('profile.order_createdby'),
            };

            const customText = CUSTOM_SORTED_TYPE_TEXT[key];
            return (
              <TouchableOpacity
                key={key}
                style={{
                  height: 22,
                  columnGap: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={() => {
                  if (key === SORTED_TYPE_KEYS.ALPHABETICAL) sortAlphabetical();
                  else if (key === SORTED_TYPE_KEYS.CREATED_BY) sortCreatedBy();
                  else if (key === SORTED_TYPE_KEYS.RECENT_ADDED) sortRecent();
                  setSorted(key);
                  handleCloseModalPress();
                }}>
                <Text
                  style={{
                    color: sortedType === key ? 'green' : '#424242',
                  }}>
                  {customText}
                </Text>
                {sortedType === key && (
                  <FontAwesome6 name="check" size={18} color={'green'} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </BottomSheetView>
    </Layout>
  );
};

export default BottomSheetProfileContent;
