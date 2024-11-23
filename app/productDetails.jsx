import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Calendar } from 'react-native-calendars';
import Review from '../components/Review';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductDetails() {
  const params = useLocalSearchParams();
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [unavailableDates, setUnavailableDates] = useState({
    '2024-11-25': { disabled: true },
    '2024-11-26': { disabled: true },
  });
  const [lastTap, setLastTap] = useState(null); 

  const handleAvailabilityPress = () => {
    setIsCalendarVisible(true); 
  };

  const handleDateSelect = (date) => {
    const selected = date.dateString;
    const currentTime = new Date().getTime();
    if (lastTap && currentTime - lastTap < 500 && selectedDates.includes(selected)) {
      setSelectedDates([selected]);
      setLastTap(null); 
      return;
    }
    setLastTap(currentTime); 
    if (unavailableDates[selected] && unavailableDates[selected].disabled) {
      Alert.alert('Unavailable Date', 'This date is unavailable for selection.');
      setSelectedDates([]);
      return; 
    }
    const startDate = selectedDates[0];
  
    if (startDate) {
      const start = new Date(startDate);
      const end = new Date(selected);
  
      if (end < start) {
        setSelectedDates([selected]); // Reset to the new selected start date
        return; // Exit here because the new date is the new start date
      }
  
      // Ensure that the selected end date is after the start date
      if (end >= start) {
        let datesInRange = [];
        let currentDate = start;
  
        // Loop through and add all dates between start and end
        while (currentDate <= end) {
          // Check if each date is unavailable before adding to range
          const dateString = currentDate.toISOString().split('T')[0];
          if (unavailableDates[dateString] && unavailableDates[dateString].disabled) {
            Alert.alert('Unavailable Date', `The date ${dateString} is unavailable.`);
            setSelectedDates([]); 
            return; 
          }
          datesInRange.push(dateString);
          currentDate.setDate(currentDate.getDate() + 1); 
        }
        if (datesInRange.length <= 15) {
          setSelectedDates(datesInRange); 
        } else {
          Alert.alert(
            'Limit Reached',
            'You can select a maximum of 15 dates.',
            [{ text: 'OK' }]
          );
        }
      }
    } else {
      setSelectedDates([selected]);
    }
  };
  

  

  const handleCloseCalendar = () => {
    setIsCalendarVisible(false); 
  };
  const handlePress=()=>{
    Alert.alert("Please Select Booking Dates.")
  }
  const handleBooking = () => {
    if (selectedDates.length === 0) {
      Alert.alert('Please Select Dates First');
      return;
    }

    Alert.alert(
      'Confirm Booking',
      `Are you sure you want to book for ${selectedDates.length} days?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Yes', 
          onPress: () => {
            const updatedUnavailableDates = { ...unavailableDates };
            selectedDates.forEach(date => {
              updatedUnavailableDates[date] = { disabled: true };
            });
            setUnavailableDates(updatedUnavailableDates);
            Alert.alert('Booking Confirmed', 'Your booking has been confirmed.');
          } 
        },
      ]
    );
  };

  const totalRent = params.rent * selectedDates.length;

  return (
   <SafeAreaView style={{flex:1}}>
     <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: params.imageUrl }} style={styles.productImage} />
      
      <View style={styles.detailsContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.productName}>{params.name}</Text>
          
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Entypo name="location-pin" size={24} color="black" />
            <Text style={styles.availability}> {params.location}</Text>
          </View>
        </View>
        
        <View style={styles.priceAvailabilityContainer}>
          <Text style={styles.price}>{params.rent}/day</Text>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={handleAvailabilityPress}>
            <Text style={styles.availability}>Check For availability:</Text>
            <AntDesign name="calendar" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View>
          <Text>You Booked for: {selectedDates.length} days</Text>
          <Text>{selectedDates.join(', ') || 'No dates selected'}</Text>
        </View>

        {isCalendarVisible && (
          <View style={styles.calendarContainer}>
           <Calendar
                current={new Date().toISOString().split('T')[0]}
                markedDates={{
                    ...unavailableDates, 
                    ...selectedDates.reduce((acc, date) => {
                    acc[date] = { selected: true, selectedColor: 'green' };
                    return acc;
                    }, {})
                }}
                onDayPress={handleDateSelect}
                disableAllTouchEventsForDisabledDays={true} 
                minDate={new Date().toISOString().split('T')[0]} 
                monthFormat={'yyyy MM'} 
                />

            <TouchableOpacity onPress={handleCloseCalendar} style={styles.closeButton}>
              <Text style={styles.closeText}>Close Calendar</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.sectionTitle}>Conditions of renting</Text>

       <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
       <Text style={styles.sectionTitle}>Product Condition:</Text>
       <Text style={styles.description}>{params.condition}</Text>
       </View>
       

        <Review/>
        
        {
            selectedDates.length===0 ?  
          <TouchableOpacity onPress={handlePress} style={styles.rentNowButton}>
          <Text style={styles.rentNowText}>Rent Now</Text>
        </TouchableOpacity>:
         <TouchableOpacity onPress={handleBooking} style={styles.rentNowButton}>
         <Text style={styles.rentNowText}>Rent Now  ₹{totalRent}</Text>
       </TouchableOpacity>
        }
      </View>

    </ScrollView>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

  },
  productImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: -30,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  priceAvailabilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  availability: {
    fontSize: 16,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#34495e',
  },
  description: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 8,
  },
  reviews: {
    fontSize: 16,
    color: '#f39c12',
    marginBottom: 16,
  },
  rentNowButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  rentNowText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  fixedPriceContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  fixedPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  calendarContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
  },
});
