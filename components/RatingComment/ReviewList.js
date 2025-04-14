import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ReviewCard from './ReviewCard';

const ReviewList = ({ reviews = [] }) => {
  // Lấy 3 review mới nhất từ cuối mảng
  const recentReviews = reviews.slice(-3).reverse();

  return (
    <View style={styles.container}>
      {recentReviews.map((review, index) => (
        <View key={index} style={styles.cardWrapper}>
          <ReviewCard 
            name={review.name} 
            date={review.createdAt ? new Date(review.createdAt).toLocaleString("vi-VN") : "N/A"}
            review={review.comment} 
            rating={review.rating} 
          />
        </View>
      ))}

      {reviews.length > 3 && (
        <TouchableOpacity
          onPress={() => {
            // TODO: xử lý "Xem thêm" sau
            console.log('Xem thêm đánh giá...');
          }}
          style={styles.showMoreButton}
        >
          <Text style={styles.showMoreText}>previous review...</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  cardWrapper: {
    marginBottom: 5,
  },
  showMoreButton: {
    // paddingVertical: 10,
    alignItems: 'center',
  },
  showMoreText: {
    color: 'blue',
    fontSize: 13,
  },
});

export default ReviewList;
