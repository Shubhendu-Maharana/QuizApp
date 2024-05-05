import React, { useState } from 'react'
import { StatusBar, setStatusBarStyle } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useFonts, Comfortaa_400Regular, Comfortaa_700Bold } from '@expo-google-fonts/comfortaa';

const PRIMARY = '#4a7b79';
const SECONDARY = '#f8c660';

setStatusBarStyle("light")

const HomePage = ({ navigation }) => {
    const [name, setName] = useState('');


    const [fontsLoaded] = useFonts({
        Comfortaa_400Regular,
        Comfortaa_700Bold
    });

    if (!fontsLoaded) return null;

    const handleBtn = () => {
        if (!name) {
            Alert.alert("Please enter your name")
        } else {
            navigation.navigate('QuizGenerate', { name: name });
        }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: PRIMARY }} >
            <StatusBar style='light' />

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ backgroundColor: 'white', height: 220, width: 220, borderRadius: 999, justifyContent: 'center' }}>
                    <Text style={{
                        fontSize: 40,
                        color: PRIMARY,
                        fontFamily: 'Comfortaa_700Bold',
                        textTransform: 'uppercase',
                        textAlign: 'center'
                    }}>AI Quiz</Text>
                    <Text style={{
                        fontSize: 30,
                        color: SECONDARY,
                        fontFamily: 'Comfortaa_700Bold',
                        textTransform: 'uppercase',
                        textAlign: 'right',
                        marginRight: 35,
                        marginTop: -18,
                    }}>App</Text>
                </View>
            </View>

            <View style={{
                backgroundColor: 'white',
                gap: 30,
                borderRadius: 16,
                paddingVertical: 28,
                paddingHorizontal: 20,
                marginBottom: 20,
                marginHorizontal: 20,
            }}>
                <View style={{ alignItems: 'center', gap: 20 }}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 28,
                        fontFamily: 'Comfortaa_700Bold',
                        color: PRIMARY
                    }}>Welcome my friend</Text>
                    <View style={{
                        height: 4,
                        width: '20%',
                        backgroundColor: PRIMARY,
                        borderRadius: 100,
                    }}></View>
                </View>

                <View style={{
                    alignItems: 'center',
                    gap: 20,
                }}>
                    <TextInput style={{
                        width: '100%',
                        borderWidth: 1,
                        borderColor: PRIMARY,
                        color: PRIMARY,
                        fontFamily: 'Comfortaa_400Regular',
                        borderRadius: 6,
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        fontSize: 16,
                    }}
                        value={name}
                        onChangeText={setName}
                        placeholder='Your name' />
                    <TouchableOpacity style={{
                        backgroundColor: SECONDARY,
                        paddingHorizontal: 18,
                        paddingVertical: 12,
                        borderRadius: 200,
                    }}
                        onPress={handleBtn}>
                        <Text style={{
                            fontSize: 18,
                            color: 'black',
                            fontFamily: 'Comfortaa_700Bold',
                            marginBottom: 5,
                        }}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    )
}

export default HomePage
