import React from 'react';
import {View, StyleSheet, TextInput, Keyboard} from 'react-native';
import Icons from '../components/Icons';

const SearchBar = (props) => {
    return (
        <View style={styles.container} {...props}>
            <Icons.Feather
                {...props}
                name={'search'}
                size={20}
                color={'gray'}
                style={styles.iconSearch}
            />
            <TextInput
                {...props}
                placeholder={'Tìm kiếm'}
                placeholderTextColor={'gray'}
                autoCorrect={false}
                autoCapitalize={'none'}
                autoFocus={true}
                returnKeyType={'search'}
                style={styles.searchInput}
                value={props.query}
                onChangeText={(text) => props.onSearch(text)}
            />
            {
                (props.query.length > 0) ? (
                    <Icons.Feather
                        {...props}
                        name={'x'}
                        size={16}
                        color={'white'}
                        style={styles.iconCancel}
                        onPress={() => props.setQuery('')}
                    />
                ) : <View/>
            }

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#606060',
        maxHeight: 50,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center'
    },
    iconSearch: {
        paddingHorizontal: 5,
        maxWidth: '10%',
    },
    searchInput: {
        fontSize: 15,
        color: 'white',
        maxWidth: '80%',
        height: '100%',
    },
    iconCancel: {
        height: '100%',
        maxWidth: '10%',
        position: 'absolute',
        right: 0,
        paddingHorizontal: 5,
    }
});
export default SearchBar;