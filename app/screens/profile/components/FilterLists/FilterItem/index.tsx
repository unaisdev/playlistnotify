import { TouchableOpacity } from 'react-native';

import Text from '@app/features/commons/layout/Text';

type Props = {
  filterFn: () => void;
  filterText: string;
  isSelected: boolean;
};

const FilterItem = ({filterFn, filterText, isSelected}: Props) => {
  const handlePress = () => {
    filterFn();
  };

  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 20,
        paddingVertical: 6,
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#BDBDBD',
        opacity: isSelected ? 1 : 0.5,
      }}
      onPress={handlePress}>
      <Text>{filterText}</Text>
    </TouchableOpacity>
  );
};

export default FilterItem;
