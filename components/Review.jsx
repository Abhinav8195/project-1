import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';

const reviewsData = [
  { name: 'Abhinav', rating: 4.5, text: "Great product! Very satisfied with the quality." },
  { name: 'John', rating: 5, text: "Amazing! Will definitely rent again." },
  { name: 'Sara', rating: 4, text: "Loved it! Excellent condition and value for money." },
  { name: 'David', rating: 4.7, text: "Very reliable and easy to use, highly recommend." },
  { name: 'Mia', rating: 5, text: "Excellent service and product. Worth the price." }
];

const imagesData = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKA1WI5tok0Ldn_o5m_c1iyJsT4BWgoq_UUg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvewKW9hONJBu6gVltMV9H3Eft9m6rkWv7_w&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz_rqru6I5JamruXsgTo7UzSZ1V6sl2XzLyGO6WFeAiywEGUbGmpwmtR64JL64x7ggFEo&usqp=CAU',
];

const getStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  return (
    <Text style={styles.stars}>
      {'★'.repeat(fullStars)}{'☆'.repeat(halfStar)}{'☆'.repeat(emptyStars)}
    </Text>
  );
};

export default function Review() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleImageClick = (imageUri, index) => {
    setSelectedImage(imageUri);
    setCurrentIndex(index);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
    setCurrentIndex(null);
  };

  const handleNextImage = () => {
    if (currentIndex < imagesData.length - 1) {
      setSelectedImage(imagesData[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (currentIndex > 0) {
      setSelectedImage(imagesData[currentIndex - 1]);
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Reviews</Text>
      <Text style={styles.reviews}>★★★★☆ 4.5/5 (150 reviews)</Text>

    
      <FlatList
        data={imagesData}
        horizontal
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleImageClick(item, index)}>
            <Image source={{ uri: item }} style={styles.image} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.imageContainer}
      />

    
      <ScrollView style={styles.reviewsContainer}>
        {reviewsData.map((review, index) => (
          <View key={index} style={styles.reviewItem}>
            <Text style={styles.reviewerName}>{review.name}</Text>
            {getStars(review.rating)}
            <Text style={styles.reviewText}>{review.text}</Text>
          </View>
        ))}
      </ScrollView>

    
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image source={{ uri: selectedImage }} style={styles.modalImage} />

      
            <TouchableOpacity style={styles.navButtonLeft} onPress={handlePreviousImage}>
              <Text style={styles.navButtonText}>{'<'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButtonRight} onPress={handleNextImage}>
              <Text style={styles.navButtonText}>{'>'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  reviews: {
    fontSize: 16,
    color: '#f39c12',
    marginBottom: 16,
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 10,
    borderRadius: 8,
  },
  reviewsContainer: {
    marginTop: 20,
  },
  reviewItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  reviewerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  stars: {
    fontSize: 18,
    color: '#f39c12',
  },
  reviewText: {
    fontSize: 16,
    color: '#2c3e50',
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 400,
    height: 400,
    borderRadius: 10,
  },
  navButtonLeft: {
    position: 'absolute',
    left: 10,
    top: '50%',
    zIndex: 10,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
  },
  navButtonRight: {
    position: 'absolute',
    right: 10,
    top: '50%',
    zIndex: 10,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f39c12',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
