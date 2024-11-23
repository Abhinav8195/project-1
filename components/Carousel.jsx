import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const images = [
  "https://content.jdmagicbox.com/comp/chandigarh/p1/0172px172.x172.150913193001.g9p1/catalogue/cks-tour-and-travels-chandigarh-sector-45d-chandigarh-car-hire-23uqkup.png",
  "https://cdn.mos.cms.futurecdn.net/UeqCZzYknQfx5sBrkXBc4P.jpg",
  "https://news.airbnb.com/wp-content/uploads/sites/4/2023/06/01-Kens-DreamHouse-Airbnb-Exterior-Credit-Hogwash-Studios.jpg?fit=4200%2C2800"
];

const screenWidth = Dimensions.get('window').width;

const MyCarousel = () => {
  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={screenWidth} 
        height={200}
        autoPlay={true}
        autoPlayInterval={3000}
        autoplayDelay={1000}
        data={images}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={styles.image}
            resizeMode="cover" 
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    width: '100%', 
    marginTop:15
  },
  image: {
    width: '94%',
    height: '100%',
    borderRadius: 6,
    margin:'auto'
  },
});

export default MyCarousel;