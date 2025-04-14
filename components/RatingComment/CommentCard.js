import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const CommentCard = ({ comment, user, date }) => {
  return (
    <View style={styles.commentContainer}>
      <View style={styles.nameContainer}>
        <Text style={styles.commentUser}>{user || "Unknown"}</Text>
        <Text style={styles.commentDate}> ({date ? new Date(date).toLocaleString("vi-VN") : "N/A"})</Text>
      </View>
      <Text style={styles.commentText}>💬  {comment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 5    
  },
  nameContainer: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center'   
  },
  commentUser: {
    fontWeight: 'bold',
    color: '#333',
  },
  commentDate: {
    fontSize: 12,
    color: 'gray',
  },
  commentText: {
    fontSize: 14,
  },
});

export default CommentCard;
