import React from 'react';
import {View} from 'react-native';

interface CustomPaginationProps {
  currentIndex: number;
  numTotalItems: number;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentIndex,
  numTotalItems,
}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      {[...Array(numTotalItems)].map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            currentIndex === index && styles.activeDot,
          ]}></View>
      ))}
    </View>
  );
};

const styles = {
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#34D399', // Green color
    marginHorizontal: 5,
    transition: 'transform 0.5s',
  },
  activeDot: {
    backgroundColor: '#047857', // Darker green color
    transform: [{scale: 1.25}],
  },
};

export default CustomPagination;
