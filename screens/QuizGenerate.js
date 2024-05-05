import React, { useState } from 'react'
import { StatusBar, setStatusBarStyle } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useFonts, Comfortaa_400Regular, Comfortaa_700Bold } from '@expo-google-fonts/comfortaa';
import { useRoute } from '@react-navigation/native';
import CryptoJS from "react-native-crypto-js"

const PRIMARY = '#4a7b79';
const SECONDARY = '#f8c660';

const QuizGenerate = ({ navigation }) => {
    const route = useRoute();
    const username = route.params?.name;
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(false);
    const [quizData, setQuizData] = useState(null);
    const [quizeGenerated, setQuizGenerated] = useState(false);
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const ENCRYPTED_API_KEY =
        "U2FsdGVkX182LMlOeBL/ajj6laWVCRso4H+6LjJgTpL4iDv4vBu6uAxJEc8bpOOh5YqtSb3wBOFqNgLZPXJV5AIOjhN2m1lA2l3IQNRAm8s=";
    const API_KEY = CryptoJS.AES.decrypt(
        ENCRYPTED_API_KEY.toString(),
        "shubhendu"
    ).toString(CryptoJS.enc.Utf8);
    const query = `give 30 questions about ${topic} in json format as like, id: starts from 1 and so on, question: conatains actual question, options: array of 4 options, answer: contains actual answer from options don't wrap these with any name`;

    setStatusBarStyle("light")

    const [fontsLoaded] = useFonts({
        Comfortaa_400Regular,
        Comfortaa_700Bold
    });

    if (!fontsLoaded) return null;

    const generateQuizData = async () => {
        setLoading(true)
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: query }],
            }),
        };

        try {
            const res = await (await fetch(API_URL, requestOptions)).json();
            const data = res.choices[0].message.content;
            setQuizData(JSON.parse(data));
            if (quizData === null) {
                Alert.alert("Error while generating...Try again")
            } else {
                setQuizGenerated(true);
            }
        } finally {
            setLoading(false);
        }
    }

    const handleGenerate = () => {
        if (!topic) {
            Alert.alert("Please enter topic")
        } else {
            generateQuizData();
        }
    }

    const handleStart = () => {
        navigation.navigate("QuizPage", { quizData: quizData, name: username })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#4a7b79' }} >
            <StatusBar />

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ backgroundColor: 'white', height: 220, width: 220, borderRadius: 999, justifyContent: 'center' }}>
                    <Text style={{
                        fontSize: 32,
                        color: PRIMARY,
                        fontFamily: 'Comfortaa_700Bold',
                        textTransform: 'uppercase',
                        textAlign: 'center'
                    }}>Generate</Text>
                    <Text style={{
                        fontSize: 28,
                        color: SECONDARY,
                        fontFamily: 'Comfortaa_700Bold',
                        textTransform: 'uppercase',
                        textAlign: 'right',
                        marginRight: 20,
                        marginTop: -18,
                    }}>Quiz</Text>
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
                    }}>Enter a topic</Text>
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
                        value={topic}
                        onChangeText={setTopic}
                        placeholder='Topic' />
                    <TouchableOpacity style={{
                        backgroundColor: SECONDARY,
                        paddingHorizontal: 18,
                        paddingVertical: 12,
                        borderRadius: 200,
                    }}
                        onPress={handleGenerate}>
                        <Text style={{
                            fontSize: 18,
                            color: 'black',
                            fontFamily: 'Comfortaa_700Bold',
                            marginBottom: 5,
                        }}>{loading ? "Loading..." : "Generate"}</Text>
                    </TouchableOpacity>
                    {quizeGenerated ? <View style={{
                        height: 4,
                        width: '20%',
                        backgroundColor: PRIMARY,
                        borderRadius: 100,
                    }}></View> : ""}
                    {quizeGenerated ?
                        <TouchableOpacity style={{
                            backgroundColor: SECONDARY,
                            paddingHorizontal: 18,
                            paddingVertical: 12,
                            borderRadius: 200,
                        }}
                            onPress={handleStart}>
                            <Text style={{
                                fontSize: 18,
                                color: 'black',
                                fontFamily: 'Comfortaa_700Bold',
                                marginBottom: 5,
                            }}>Start Quiz</Text>
                        </TouchableOpacity> : ""}
                </View>
            </View>
        </SafeAreaView >
    )
}

export default QuizGenerate
