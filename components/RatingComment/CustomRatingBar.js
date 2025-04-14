import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const CustomRatingBar = ({ defaultRating, setDefaultRating }) => {
  const maxRating = [1, 2, 3, 4, 5];
  const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
  const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';

  return (
    <View style={styles.customRatingBarStyle}>
      {maxRating.map((item) => (
        <TouchableOpacity key={item} activeOpacity={0.7} onPress={() => setDefaultRating(item)}>
          <Image style={styles.starImgStyle} source={item <= defaultRating ? { uri: starImgFilled } : { uri: starImgCorner }} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  customRatingBarStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10
  },
  starImgStyle: { 
    width: 30, 
    height: 30, 
    resizeMode: 'cover', 
    marginHorizontal: 5 
  },
});

export default CustomRatingBar;
