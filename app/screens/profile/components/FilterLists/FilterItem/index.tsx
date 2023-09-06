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
        backgroundColor: isSelected ? '#424242' : '#BDBDBD',
      }}
      onPress={handlePress}>
      <Text colorReverted>{filterText}</Text>
    </TouchableOpacity>
  );
};

export default FilterItem;
