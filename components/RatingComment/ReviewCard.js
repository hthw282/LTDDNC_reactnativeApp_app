import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ReviewCard = ({ name, date, review, rating }) => {
  const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
  const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';

  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
          <View style={styles.ratingContainer}>
            {[...Array(5)].map((_, index) => (
              <Image key={index} source={index < rating ? { uri: starImgFilled } : { uri: starImgCorner }} style={styles.starImgStyle} />
            ))}
          </View>
        </View>
        <Text style={styles.review}>{review}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 5, 
    marginBottom: 5    
  },
  infoContainer: { 
    padding: 10 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  name: { 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  date: { 
    color: 'gray', 
    fontSize: 12 
  },
  ratingContainer: { 
    flexDirection: 'row' 
  },
  starImgStyle: { 
    width: 20, 
    height: 20, 
    marginHorizontal: 2 
  },
  review: { 
    marginTop: 5, 
    fontSize: 14 
  },
});

export default ReviewCard;
