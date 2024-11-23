import { useEffect, useState,useRef } from 'react';
import { Image, StyleSheet, Platform, View,TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Carousel from '../../components/Carousel';
import { LinearGradient } from 'expo-linear-gradient';
import ItemCard from '../../components/ItemCard'
import { router, useNavigation } from 'expo-router';


export default function Home() {
  const navigation=useNavigation();

  const [locationServiceEnabled, setLocationServicesEnabled] = useState(false);
  const [displayCurrentAddress, setCurrentAddress] = useState("Fetching your location...");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const textInputRef = useRef(null);

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();

    // const unsubscribe = fetchHotels((fetchedHotels) => {
    //     setHotels(fetchedHotels);
    //     console.log(fetchedHotels)
    //     setLoading(false);
    // });
    // return () => unsubscribe();
}, []);
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
        Alert.alert(
            "Location Services not enabled",
            "Please enable your location service to continue",
            [{ text: "OK" }],
            { cancelable: false }
        );
    } else {
        setLocationServicesEnabled(true);
    }
};
const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
      Alert.alert(
          "Location Permission not granted",
          "Please grant your location permission to continue",
          [{ text: "OK" }],
          { cancelable: false }
      );
      return;
  }

  const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
  });

  const { coords } = location;
  const { latitude, longitude } = coords;

  const response = await Location.reverseGeocodeAsync({
      latitude,
      longitude
  });

  if (response.length > 0) {
      const address = response[0];
      const formattedAddress = `${address.name}, ${address.postalCode}, ${address.city}`;
      setCurrentAddress(formattedAddress);
  }
};

const clearSearch=()=>{
  setSearchQuery('')
}

const handleSearchIconPress = () => {
  setIsSearching(!isSearching);
  if (!isSearching) {
    textInputRef.current.focus();
  } else {
    clearSearch();
  }

};
const handleAll=()=>{
  router.push('/productList')
}
  return (
  <SafeAreaView style={{flex:1}}>
      <LinearGradient
    colors={['#E6DADA', '#274046']}
  >
    <ScrollView >
            <View  style={{
                      flex:1,
                        padding: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 12,
                        
                    }}>
                  <View style={{ flex: 1 }} >
                  <Text style={{fontSize:18,fontWeight:'bold'}}> Hello, Abhinav </Text>
                        {/* <View style={{marginLeft:5}}>
                            <Text style={{ color: 'gray', fontSize: 14, marginTop: 3, fontFamily: 'outfit' }}>{displayCurrentAddress}</Text>
                        </View> */}
                  </View>
                        <TouchableOpacity onPress={''} style={{
                            backgroundColor: '#274046',
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            {/* <Text>{user?.email?.charAt(0).toUpperCase()}</Text> */}
                            <Text style={{color:'#E6DADA'}}>A</Text>
                        </TouchableOpacity> 
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: '#274046',
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderRadius: 10,
                marginHorizontal: 12
            }}>
                <TextInput
                    ref={textInputRef}
                    placeholder='Search for something... '
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={{ flex: 1 }}
                    placeholderTextColor={'#274046'}
                   
                  
                />
                 {
                    searchQuery.length>0 ? 
                    <TouchableOpacity onPress={clearSearch}>
                    <Entypo name="circle-with-cross" size={24} style={{marginRight:5}} color="#274046" />
                    </TouchableOpacity>: 
                     <TouchableOpacity onPress={handleSearchIconPress}>
                    <AntDesign name="search1" size={24} color="#274046" />
                    </TouchableOpacity>
                  }
               
            </View>
            <Carousel />
            <View style={{padding:8,}}>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <Text style={{color:'white',fontSize:18,fontFamily:'semibold'}}>New Deals For You</Text>
              <TouchableOpacity onPress={handleAll}>
              <Text style={{color:'black',fontSize:15,fontFamily:'semibold'}}>See All</Text>
              </TouchableOpacity>
              </View>
              <ItemCard/>
            </View>

           
    </ScrollView>
    </LinearGradient>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
