import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { products } from '../assets/data/data'; 
import { router } from 'expo-router';

export default function Result() {
    const handlePress=(item)=>{
        router.push({
            pathname: '/productDetails',
            params: { 
                id: item.id,
                name: item.name,
                rent: item.rent,
                imageUrl: item.imageUrl,
                location: item.location,
                rating: item.rating,
                condition:item.condition

             }, 
          });
    }
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ItemCard
        item={item}
          handlePress={handlePress}
        />
      )}
    />
  );
}

function ItemCard({ item, handlePress }) {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={()=>handlePress(item)}>
      <Image 
        source={{ uri: item.imageUrl }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.rent}>Rent/Day: {item.rent}</Text>
        <Text style={styles.location}>Location: {item.location}</Text>
        <Text style={styles.rating}>Rating: {item.rating}</Text>
        <Text style={styles.condition}>Condition: {item.condition}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rent: {
    fontSize: 14,
    color: '#555',
  },
  location: {
    fontSize: 14,
    color: '#555',
  },
  rating: {
    fontSize: 14,
    color: '#777',
  },
  condition: {
    fontSize: 14,
    color: '#555',
  },
});
