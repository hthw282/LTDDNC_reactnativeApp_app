import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CommentCard from './CommentCard';

const CommentList = ({ comments = [] }) => {
  const recentComments = comments.slice(-3).reverse();

  return (
    <View style={styles.container}>
      {recentComments.map((item, index) => (
        <CommentCard
          key={index}
          user={item.user.name}
          date={item.createdAt}
          comment={item.comment}
        />
      ))}

      {comments.length > 3 && (
        <TouchableOpacity
          onPress={() => {
            console.log('see previous comments...');
          }}
          style={styles.showMoreButton}
        >
          <Text style={styles.showMoreText}>previous comments...</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
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

export default CommentList;
