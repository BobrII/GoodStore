import { useState } from "react";
import {FlatList, Text, View, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import { COLORS } from "../constants/colors";
import { findProducts } from "../database/database";


export default function SearchScreen({navigation}){


    const [products, setProducts] = useState([]);
    const [searchingProducts, setSearchingProducts] = useState('');

    const loadProducts = (name) => {
        const data = findProducts(name);
        setProducts(data);
        setSearchingProducts('');
    };

    const ifFormValid = searchingProducts;

    const chekProductList = products.length > 0;


    return(
        <>
            <View style={stylesSearch.topBorder}>
                <TouchableOpacity onPress={() => navigation.navigate('ShoppingCartScreen')}>
                    <Image source={require('../../assets/cart.png')}
                        style={{width: 60, height: 60}}/>
                </TouchableOpacity>
            </View>
            
            <View style={stylesSearch.divider}/>
                   
            <View style={stylesSearch.container}>
                <View style={{width:'100%',  alignItems:'center'}}>
                    <TextInput 
                        style={stylesSearch.textInput}
                        placeholder="Enter product name"
                        value={searchingProducts}
                        onChangeText={(text) => setSearchingProducts(text)}
                        placeholderTextColor={COLORS.placeHolderColor}
                    />
                </View>
                
                <View style={stylesSearch.container}>
                    {!chekProductList && (
                        <Text style={{color:COLORS.textColor, fontSize: 20, marginTop: 20, textAlign:'center'}}>
                            It's empty here, search a product to see it here
                        </Text>
                    )}
                    <FlatList
                        data={products}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <TouchableOpacity 
                                style={stylesSearch.productInfo}
                                onPress={() => navigation.navigate('ProductInfoScreen', { productsId: item.id })}
                            >
                            <View>
                                <Image source={{uri: item.imageUrl || require('../../assets/made_in_Ukraine.jpg')}}
                                style={stylesSearch.image}
                                />
                            </View>
                            <View style={{justifyContent: 'space-between', paddingVertical: 10}}>
                                <Text style={stylesSearch.text}>{item.name}</Text>
                                <Text style={stylesSearch.text}>Price: {item.price}$</Text>
                                <Text style={stylesSearch.text}>Category: {item.categoryName}</Text>
                            </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {ifFormValid && (
                    <View style={{width:'100%',  alignItems:'center'}}>
                        <TouchableOpacity style={stylesSearch.touchableOpasity}
                            onPress={() => loadProducts(searchingProducts)}>
                                    <Text style={{fontSize:28, color: COLORS.textColor}}>Search</Text>
                        </TouchableOpacity>
                   </View>
                )}   
            </View>
        </>
    );
}

const stylesSearch = StyleSheet.create({

    productInfo:{
        flexDirection:'row',
        backgroundColor: '#555555',
        borderRadius: 20,
        marginTop: 10
    },

    image:{
        width: 100,
        height: 100,
        marginHorizontal: 20,
        borderRadius: 10,
        marginVertical: 10
    },

    divider: {
        height: 1,
        backgroundColor: COLORS.borderColorGreen,
    },

    topBorder: {
        height: 80,
        backgroundColor:COLORS.topBorderBackground,
        justifyContent:'flex-end',
        alignItems:'flex-end'

    },

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
       
    },

     linearGrad: {
        flex:1,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    touchableOpasity: {
        height: 50,
        width: 260,
        backgroundColor: COLORS.buttonColor,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    textInput: {
        height: 60,
        width: 300,
        padding: 10,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: COLORS.borderColorGreen,
        backgroundColor: COLORS.inputTextColor,
        fontSize: 20,
        marginVertical: 10,
        color: COLORS.textColor
    },
    text: {
        fontSize: 18,
        color: '#fff'
    }
});