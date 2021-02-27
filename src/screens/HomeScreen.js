import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    TouchableWithoutFeedback, ImageBackground, Alert, Keyboard
} from 'react-native';
import Icons from "../components/Icons";
import SearchPopup from "../components/SearchPopup";

/* redux */
import {useDispatch, useSelector, connect} from "react-redux";
import {fetchWeatherData, searchCityData} from "../store/actions";
import PlacesService from "../services/PlacesService";

const HomeScreen = (props) => {
    const dispatch = useDispatch();
    const citesWeatherData = useSelector(state => state.weather.weatherData);
    console.log('<==== cites Weather Data ====>', citesWeatherData)

    const cityName = useSelector(state => state.weather.cityName);
    console.log('<==== city Name Selected ====>', cityName);

    const [changeShowTempC, setChangeShowTempC] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    /* State Search Citi Data */
    const [query, setQuery] = useState('');
    const [resultQuery, setResultQuery] = useState([]);

    const today = new Date();
    const hours = today.getHours();
    const min = today.getMinutes();

    const onSubmitHandler = async () => {
        console.log('city selected onSubmitHandler =>', cityName)
        if (cityName === '') {
            return Alert.alert('Validation', 'City name is required!', [{text: 'OK'}]);
        };
        dispatch(fetchWeatherData(cityName));
        setOpenModal(false);
        Keyboard.dismiss();
    };

    const onSearchHandler = async (text) => {
        setQuery(text);
        if (text != '') {
            try {
                const response = await PlacesService.searchCity(text);
                console.log('selected city data', response);
                setResultQuery(response.predictions);
            } catch (err) {
                console.log('Error selected city', err);
            }
        }
    }

    const renderCityWeather = ({item}) => {
        let tempC = item.data.main.temp.toFixed(0);
        let tempF = ((tempC * 9 / 5) + 32).toFixed(2);
        return (
            <View style={styles.cardContainer}>
                <View style={styles.cityContainer}>
                    <Text style={styles.time}>{hours}:{min}</Text>
                    <Text style={styles.city}>{item.name}</Text>
                </View>
                <View style={styles.tempCardContainer}>
                    {
                        changeShowTempC
                            ?
                            <Text style={styles.temp}>{tempC}°</Text>
                            :
                            <Text style={styles.temp}>{tempF}°</Text>
                    }
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {
                <FlatList
                    data={citesWeatherData}
                    renderItem={renderCityWeather}
                    keyExtractor={(item, index) => `${index}`}
                />
            }
            <View style={styles.footerContainer}>
                <TouchableWithoutFeedback
                    style={styles.tempItemContainer}
                    onPress={() => setChangeShowTempC(!changeShowTempC)}
                >
                    <View style={styles.tempItemContainer}>
                        <Text style={[styles.text, {color: changeShowTempC ? "white" : 'gray'}]}> °C</Text>
                        <Text style={styles.text}> /</Text>
                        <Text style={[styles.text, {color: changeShowTempC ? "gray" : 'white'}]}> °F</Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.weatherLogo}>
                    <Image
                        source={{uri: 'https://i.pinimg.com/originals/06/c4/f7/06c4f70ec5931e2342e703e8a3f0a253.png'}}
                        style={{width: 40, height: 40}}
                    />
                </View>
                <View style={styles.searchContainer}>
                    <Icons.Feather
                        name={'search'}
                        size={20}
                        color={'white'}
                        style={styles.iconSearch}
                        onPress={() => setOpenModal(true)}
                    />
                </View>
            </View>
            <SearchPopup
                visible={openModal}
                onClosePopup={() => setOpenModal(false)}
                query={query}
                setQuery={setQuery}
                resultQuery={resultQuery}
                onSubmit={onSubmitHandler}
                onSearch={onSearchHandler}
            />
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginTop: 40,
        alignContent: 'center',
    },
    footerContainer: {
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 5,
    },
    tempItemContainer: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
    },
    weatherLogo: {
        justifyContent: 'center',
    },
    searchContainer: {
        height: '100%',
        justifyContent: 'center'
    },
    iconSearch: {
        padding: 10,
    },
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        height: 80,
        justifyContent: 'center',
    },
    cityContainer: {
        height: '100%',
        width: '70%',
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        position: 'absolute',
        left: 0
    },
    time: {
        color: 'white',
        fontSize: 18
    },
    city: {
        color: 'white',
        fontSize: 36
    },
    tempCardContainer: {
        height: '100%',
        width: '30%',
        right: 0,
        position: 'absolute',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    temp: {
        fontSize: 42,
        textAlign: 'center',
        color: 'white'
    },
    ballWraper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    ball: {
        width: 6,
        height: 6,
        borderRadius: 3,
        margin: 3
    }
})
export default HomeScreen;