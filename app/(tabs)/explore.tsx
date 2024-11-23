import { StyleSheet, Image, Platform, View, Text } from 'react-native';



export default function TabTwoScreen() {
  return (
  <View style={{marginTop:50}}>
    <Text>Tab Two Screen</Text>
  </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
