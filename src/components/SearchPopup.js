import React from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity, FlatList} from 'react-native';
import SearchBar from "../components/SearchBar";
import {useDispatch} from "react-redux";
import {selectedCity} from "../store/actions";

const SearchPopup = (props) => {
    const dispatch = useDispatch();

    const renderResultSearch = ({item}) => {
        const handleSelectedCity = () => {
            dispatch(selectedCity(item.terms[0].value));
            props.onSubmit();
            props.onClosePopup();
        }
        return (
            <TouchableOpacity
                style={styles.resultItem}
                onPress={() => handleSelectedCity()}
            >
                <Text numberOfLines={1} style={{fontSize: 16, color: 'white'}}>
                    {item.description}
                </Text>
            </TouchableOpacity>
        )
    };

    return (
        <Modal
            visible={props.visible}
            style={styles.modal}
            backdropColor={'#00000099'}
            transparent={true}
            animationType={"slide"}
            backdropOpacity={1.0}
            onBackdropPress={() => props.onClosePopup()}
        >
            <View style={styles.background}>
                <View style={styles.container}>
                    <Text style={styles.titleText}>
                        Nhập thành phố, mã Zip hoặc vị trí sân bay
                    </Text>
                    <View style={styles.searchContainer}>
                        <SearchBar
                            query={props.query}
                            setQuery={props.setQuery}
                            onSearch={props.onSearch}
                            onSubmit={props.onSubmit}
                        />
                        <TouchableOpacity onPress={() => {
                            props.onClosePopup()
                        }}>
                            <Text style={styles.text}>
                                Hủy
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FlatList
                            data={props.resultQuery}
                            renderItem={renderResultSearch}
                            keyExtractor={(item, index) => item.id}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    modal: {
        // maxHeight: '90%',
        margin: 0,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        marginTop: 40,
        // backgroundColor: '#404040',
        width: '100%',
        borderRadius: 10,
        position: 'absolute',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#404040',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        height: '95%'
    },
    titleText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 14,
        justifyContent: 'center',
        paddingVertical: 10,
    },
    searchContainer: {
        // flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        maxWidth: '90%',
        flexDirection: 'row',
    },
    resultItem: {
        width: '95%',
        justifyContent: 'center',
        height: 40,
        borderBottomColor: '#ccc',
        paddingLeft: 30,
        backgroundColor: 'transparent'
    },
    background: {
        flex: 1,
        margin: 0,
        padding: 0,
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'row',
        height: '60%'
    },
    text: {
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: 10,
        fontSize: 16,
        paddingVertical: 10,
    }
});
export default SearchPopup;