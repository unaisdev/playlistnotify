import Text from '@app/features/commons/layout/Text';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';

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
        paddingHorizontal: 12,
        paddingVertical: 4,
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: '#BDBDBD',
        opacity: isSelected ? 1 : 0.5,
      }}
      onPress={handlePress}>
      <Text>{filterText}</Text>
    </TouchableOpacity>
  );
};

export default FilterItem;
