import { View, Text, Dimensions, SafeAreaView, StyleSheet, Image, TouchableOpacity, Platform, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Login() {

    const navigate = useNavigation();
    useEffect(() => {
        navigate.setOptions({
            headerShown: false
        })
    }, [])

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('./../assets/images/a1.gif')}
                        style={styles.image}
                        resizeMode='contain'
                    />
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Rent Anything: From Land to Cars</Text>

                    <Text style={styles.subtitle}>
                        Discover a wide range of rental options effortlessly. Whether you need land, a room, games, or even a car, we have you covered. Rent smarter with our user-friendly platform.
                    </Text>

                    <TouchableOpacity
                        onPress={''}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 1,
    },
    imageContainer: {
        flex: 3,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        flex: 3,
        backgroundColor: 'pink',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        fontFamily: 'outfit-bold',
        textAlign: 'center',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 17,
        fontFamily: 'outfit',
        textAlign: 'center',
        color: 'gray',
        marginTop: 20,
    },
    button: {
        backgroundColor: 'gray',
        borderRadius: 99,
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignSelf: 'center',
        width: '80%',
        marginTop: 50,
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontFamily: 'outfit',
        textAlign: 'center',
    },
});
