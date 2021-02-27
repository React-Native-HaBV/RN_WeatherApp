import React from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import HomeScreen from "./screens/HomeScreen";

const App = () => {
    const hours = new Date().getHours();
    const backgroundImageDay = require('../src/assets/images/iphone_background_day.webp');
    const backgroundImageNight = require('../src/assets/images/iphone_background_night.webp')
    return (
        <View style={{flex: 1}}>
            <ImageBackground
                source={(5 < hours < 18) ? backgroundImageDay : backgroundImageNight}
                style={{
                    flex: 1,
                    resizeMode: "cover",
                }}
            >
                <HomeScreen/>
            </ImageBackground>
        </View>
    )
}

export default App;