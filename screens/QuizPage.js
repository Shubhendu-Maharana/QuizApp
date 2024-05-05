import React, { useState } from 'react'
import { StatusBar, setStatusBarStyle } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View, Modal, TouchableOpacity, Alert } from 'react-native'
import { useFonts, Comfortaa_400Regular, Comfortaa_700Bold } from '@expo-google-fonts/comfortaa';
import { useRoute } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const PRIMARY = '#4a7b79';
const SECONDARY = '#f8c660';
const BG = '#eff0f3';
const DARK_BTN = "#004643";

setStatusBarStyle("light")

const QuizPage = ({ navigation }) => {
    const route = useRoute();
    const [modalVisible, setModalVisible] = useState(false);
    const username = route.params?.name;
    const quizData = route.params?.quizData;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [correctOption, setCorrectOption] = useState({});
    const [isDisabled, setIsDisabled] = useState({});
    const [score, setScore] = useState(0);


    const [fontsLoaded] = useFonts({
        Comfortaa_400Regular,
        Comfortaa_700Bold
    });

    if (!fontsLoaded) return null;

    const handlePrevious = () => {
        setCurrentIndex(currentIndex - 1);
    }

    const handleNext = () => {
        setCurrentIndex(currentIndex + 1);
    }

    const handleLogout = () => {
        setSelectedOptions({});
        setCorrectOption({});
        setCurrentIndex(0);
        setIsDisabled({});
        setScore(0);
        navigation.navigate("Home");
    }

    const handleRegen = () => {
        setSelectedOptions({});
        setCorrectOption({});
        setCurrentIndex(0);
        setIsDisabled({});
        setScore(0);
        setModalVisible(!modalVisible);
    }

    const verifyOption = (option) => {
        if (!selectedOptions[currentIndex]) {
            if (option === quizData[currentIndex].answer) {
                setScore(score + 1);
            }
            setSelectedOptions((prev) => ({
                ...prev,
                [currentIndex]: option,
            }));
            setCorrectOption((prev) => ({
                ...prev,
                [currentIndex]: quizData[currentIndex].answer,
            }));
            setIsDisabled((prev) => ({
                ...prev,
                [currentIndex]: true,
            }));
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG }} >
            <StatusBar />


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: PRIMARY,
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 35,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                    }}>
                        <View style={{
                            alignItems: 'center',
                            gap: 15,
                        }}>
                            <Text style={{
                                fontSize: 30,
                            }}>Hey, {username}</Text>
                            <View style={{
                                height: 4,
                                width: 50,
                                backgroundColor: PRIMARY,
                                borderRadius: 100,
                            }}></View>
                            <Text style={{
                                marginBottom: 15,
                                fontSize: 20,
                            }}>Your Score: {score}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 25 }}>
                            <TouchableOpacity
                                style={{
                                    borderRadius: 20,
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    elevation: 2,
                                    backgroundColor: SECONDARY,
                                }}
                                onPress={handleLogout}>
                                <Text style={{
                                    color: 'black',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    paddingBottom: 2,
                                }}>Logout</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    borderRadius: 20,
                                    padding: 10,
                                    elevation: 2,
                                    backgroundColor: SECONDARY,
                                }}
                                onPress={handleRegen}>
                                <Text style={{
                                    color: 'black',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    paddingBottom: 2,
                                }}>Retry</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>



            <View style={{ position: 'relative', paddingTop: 10, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {currentIndex
                    ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, position: 'absolute', left: 15, top: 10 }}>
                        <AntDesign name="left" size={18} color={PRIMARY} style={{ fontWeight: 'bold' }} />

                        <TouchableOpacity onPress={handlePrevious}>
                            <Text style={{ color: PRIMARY, fontSize: 18, fontWeight: 'bold' }}>Previous</Text>
                        </TouchableOpacity>

                    </View>
                    : ""
                }
                <View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{quizData[currentIndex].id}/{quizData.length}</Text>
                </View>
            </View>

            <View style={{
                backgroundColor: 'white',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 18,
                },
                shadowOpacity: 0.25,
                shadowRadius: 20.00,
                elevation: 24,
                marginHorizontal: 22,
                borderRadius: 20,
                paddingHorizontal: 20,
                height: '28%',
                marginTop: 30,
                justifyContent: 'center',
            }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                }}>{quizData[currentIndex].question}</Text>
            </View>

            <View style={{
                flex: 1,
                gap: 25,
                justifyContent: 'space-evenly',
                paddingVertical: 40,
                paddingHorizontal: 20,
            }}>
                {quizData[currentIndex].options.map((option, index) => (
                    <TouchableOpacity style={{
                        paddingHorizontal: 20,
                        paddingVertical: 14,
                        borderRadius: 15,
                        flexDirection: 'row',
                        position: 'relative',
                        alignItems: 'center',
                        backgroundColor: option === correctOption[currentIndex] ? PRIMARY + '60'
                            : option === selectedOptions[currentIndex]
                                ? 'red'
                                : 'white',
                    }}
                        key={index}
                        disabled={isDisabled[currentIndex]}
                        onPress={() => verifyOption(option)}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 16,
                            marginRight: 30,
                            color: option === correctOption[currentIndex]
                                ? DARK_BTN
                                : option === selectedOptions[currentIndex]
                                    ? 'white' : DARK_BTN

                        }}>{option}</Text>
                        <FontAwesome5 name={
                            option === correctOption[currentIndex] ? 'check-circle' : option === selectedOptions[currentIndex] ? 'times-circle' : 'circle'} size={20} color={option === correctOption[currentIndex] ? DARK_BTN : option === selectedOptions[currentIndex] ? 'white' : DARK_BTN
                            }
                            style={{
                                position: 'absolute', right: 20
                            }} />
                    </TouchableOpacity>
                ))}
            </View>

            <View style={{
                marginBottom: 20,
                paddingHorizontal: 20,
            }}>
                {currentIndex === quizData.length - 1 ?
                    <TouchableOpacity style={{
                        backgroundColor: SECONDARY,
                        borderRadius: 20,
                        paddingVertical: 16,
                    }} onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={{ textAlign: 'center', color: 'black', fontSize: 20, fontWeight: 'bold' }}>Submit</Text>
                    </TouchableOpacity>
                    : <TouchableOpacity style={{
                        backgroundColor: DARK_BTN,
                        borderRadius: 20,
                        paddingVertical: 16,
                    }} onPress={handleNext}>
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: 'bold' }}>Next</Text>
                    </TouchableOpacity>}
            </View>
        </SafeAreaView >
    )
}

export default QuizPage
