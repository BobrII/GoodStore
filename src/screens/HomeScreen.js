import { COLORS } from "../constants/colors";
import { useFocusEffect} from "@react-navigation/native";
import { FlatList, View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import { useState, useCallback } from "react";
import { getProducts } from "../database/database";

import { getCategories } from "../database/database";

export default function HomeScreen({navigation}){

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadProducts();
            loadCategories();
        }, [allCategories])
    );

    const allCategories = [
        {id: 0, name: 'All', isActive: 1},
        ...categories
    ]

    const loadCategories = () => {
        const data = getCategories();
        const activeCategories = data.filter(cat => cat.isActive === 1);
        setCategories(activeCategories);
    };
       

    const loadProducts = () => {
        const data = getProducts();
        setProducts(data);
        setFilteredProducts(data);
    };

    const sortProducts = (category) => {
        if(category === 0){
            setFilteredProducts(products)
        }
        else{
            setFilteredProducts(products.filter((item) => item.categoryId === category));
        }
    };

    const chekProductList = filteredProducts.length > 0;
    
    return(
        <>
            <View style={stylesHome.topBorder}>
                 <TouchableOpacity 
                    onPress={() => setOpen(!open)}
                    style={{marginBottom:15, marginRight: 10}}
                    >
                    <Image source={require('../../assets/sort1.png')}
                    style={{width: 30, height: 30}}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('ShoppingCartScreen')}>
                    <Image source={require('../../assets/cart.png')}
                    style={{width: 60, height: 60}}/>
                </TouchableOpacity>
            </View>

            <View style={stylesHome.divider}/>
            
            <View style={stylesHome.container}>
                {open && (
                <View style={stylesHome.dropdown}>
                    <FlatList
                    data = {allCategories}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={true}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => {
                            
                            sortProducts(item.id);
                            setOpen(false);
                        }}>
                            <Text style={{fontSize:20, color: COLORS.textColor, paddingLeft:10, marginHorizontal:5}}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                    />
                </View>
               )}

               {!chekProductList && (
                    <Text style={{color:COLORS.textColor, fontSize: 20, marginTop: 20, textAlign:'center'}}>
                        It's empty here, add a product to see it here
                    </Text>
               )}

                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => (
                        <TouchableOpacity 
                            style={stylesHome.productInfo}
                            onPress={() => navigation.navigate('ProductInfoScreen', { productsId: item.id })}
                        >
                            <View>
                                <Image source={{uri: item.imageUrl || require('../../assets/made_in_Ukraine.jpg')}}
                                style={stylesHome.image} 
                            />
                            </View>
                            <View style={{justifyContent: 'space-between', paddingVertical: 10}}>
                                <Text style={stylesHome.text}>{item.name}</Text>
                                <Text style={stylesHome.text}>Price: {item.price}$</Text>
                                <Text style={stylesHome.text}>Category: {item.categoryName}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </>
    );

};

const stylesHome = StyleSheet.create({
    
    image:{
        width: 100,
        height: 100,
        marginHorizontal: 20,
        borderRadius: 10,
        marginVertical: 10
    },

    dropdown:{
        backgroundColor: COLORS.inputTextColor, 
        width: 200, 
        maxHeight: 200, 
        borderColor: COLORS.borderColorGreen,
        position:'absolute',
        top: 10,
        left: 150,
        zIndex:999,
    },

    divider: {
        height: 1,
        backgroundColor: COLORS.borderColorGreen,
    },

    topBorder: {
        height: 80,
        backgroundColor:COLORS.topBorderBackground,
        justifyContent:'flex-end',
        alignItems:'flex-end',
        flexDirection: 'row',
    },

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    productInfo: {
        flexDirection:'row',
        backgroundColor: '#555555',
        borderRadius: 20,
        marginTop: 10
    },

    text: {
        fontSize: 18,
        color: '#fff'
    }
});




