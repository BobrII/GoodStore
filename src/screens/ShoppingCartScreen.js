 import { View, StyleSheet, FlatList, Image, Text, TouchableOpacity } from "react-native";
 import { useState, useEffect } from "react";
 import { COLORS } from "../constants/colors";
 import { getFromCart } from "../database/database";
 import { removeFromCart } from "../database/database";
 import { cleanCart } from "../database/database";
 import ConfirmModal from "../utils/RemoveModal";
 import Toast from "react-native-toast-message";
 


 export default function ShoppingCartScreen() {

    const [productInfo, setProductInfo] = useState([])

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        loadProduct();
    }, []);

    const totalPrice = productInfo.reduce((sum, item) => sum + item.price, 0);

    const loadProduct = () => {
        const data = getFromCart();
        setProductInfo(data);
    };

    const ifHaveProducts = productInfo.length > 0;

    return(
        <>
            <View style={stylesShoppingCartScreen.topBorder}>
                <Text style={stylesShoppingCartScreen.topBorderText}>Cart</Text>
            </View>

            <View style={stylesShoppingCartScreen.divider}/>

            <View style={stylesShoppingCartScreen.constainer}>

                {!ifHaveProducts && (
                    <View style={{alignItems:'center', marginTop:40}}>
                        <Text style={{color:COLORS.textColor, fontSize: 20}}>There are no products here right now.</Text>
                    </View>
                )}
                <FlatList
                    data={productInfo}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <View style={stylesShoppingCartScreen.productInfo}>
                            <View style={{flex: 1}}>
                                <Image source={{uri: item.imageUrl || require('../../assets/made_in_Ukraine.jpg')}}
                                    style={stylesShoppingCartScreen.image}
                                />
                            </View>
                            <View style={{justifyContent: 'space-between', paddingVertical: 10, flex:1, marginLeft: 10}}>
                                <Text style={stylesShoppingCartScreen.text}>{item.name}</Text>
                                <Text style={stylesShoppingCartScreen.text}>Price: {item.price}$</Text>
                                <Text style={stylesShoppingCartScreen.text}>Count: {item.count}</Text>
                            </View>
                            <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
                                <TouchableOpacity
                                    style={stylesShoppingCartScreen.removeButton}
                                    onPress={() => {setSelectedProduct(item); setModalVisible(true);}}
                                >
                                    <Text style={{color:COLORS.textColor, fontSize: 18}}>
                                        Delete
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
            <View style={stylesShoppingCartScreen.divider}/>
            {ifHaveProducts && (
                <View style={stylesShoppingCartScreen.bottomBorder}>
                    <Text style={{color:COLORS.textColor, fontSize:20}}>
                        Total price: {totalPrice}$
                    </Text>
                    <TouchableOpacity 
                        style={stylesShoppingCartScreen.buyButton} 
                        onPress={() => {
                            cleanCart(); setProductInfo([]);
                            Toast.show({
                                type:'success',
                                text1:'Done',
                                text2:'All products were purchased'
                            });
                    }}
                    >
                    <Text style={{color:COLORS.textColor, fontSize:25}}>Buy</Text>
                    </TouchableOpacity>

                </View>
            )}
            

            <ConfirmModal
                visible={modalVisible}
                title="Delete product"
                message="Are you sure you want to delete this product from cart?"
                onCancel= {() => setModalVisible(false)}
                onConfirm= {() => {

                    removeFromCart(selectedProduct.id);
                    setProductInfo(prev =>
                    prev.filter(prod => prod.id !== selectedProduct.id));
                    Toast.show({
                        type: 'success',
                        text1: 'Done',
                        text2: 'Product successfully removed'
                    });
                setModalVisible(false);
                }}
            />
        </>
    );
 }


 const stylesShoppingCartScreen = StyleSheet.create({

    topBorder: {
        height: 80,
        backgroundColor:COLORS.topBorderBackground,
        justifyContent:'flex-end',
        
    },

    topBorderText: {
        color: COLORS.textColor,
        fontSize: 25,
        marginLeft: 10,
        marginBottom: 10 
    },

    bottomBorder: {
        height: 80,
        width: '100%',
        backgroundColor: COLORS.background,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    
    divider: {
        height: 1,
        backgroundColor: COLORS.borderColorGreen,
    },

    constainer: {
        backgroundColor: COLORS.background,
        flex: 1
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
    },

    image:{
        width: 100,
        height: 100,
        marginHorizontal: 20,
        borderRadius: 10,
        marginVertical: 10
    },

    removeButton: {
        width: 60,
        height: 40,
        backgroundColor: '#d80101',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 15
    },

    buyButton: {
        width: 80,
        height: 50,
        backgroundColor:COLORS.buttonColor,
        borderRadius: 15,
        alignItems:'center',
        justifyContent:'center',

    }


 });