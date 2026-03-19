import { COLORS } from "../constants/colors";
import { useFocusEffect} from "@react-navigation/native";
import { FlatList, View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import { useState, useCallback, useEffect} from "react";
import { getProducts } from "../database/database";
import { removeProducts } from "../database/database";
import { updateProducts } from "../database/database";
import Toast from "react-native-toast-message";


import RemoveModal from "../utils/RemoveModal";
import EditProductModal from "../utils/EditProductModal";

export default function EditProductList(){

    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);

    const [editModalVisible, setEditModalVisible] = useState(false);

    useFocusEffect(
        useCallback(() => {
            loadProducts();
        }, [])
    );
       

    const loadProducts = () => {
        const data = getProducts();
        setProducts(data);
    };
    
    return(
        <>
            <View style={stylesEditProductList.topBorder}/>

            <View style={stylesEditProductList.divider}/>
            
            <View style={stylesEditProductList.container}>
               
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => (
                        <View style={stylesEditProductList.productInfo}>
                            <View>
                                <Image source={item.imageUrl && typeof item.imageUrl === 'string'
                                    ? { uri: String(item.imageUrl) }
                                    : require('../../assets/made_in_Ukraine.jpg')
                                }
                                style={stylesEditProductList.image} 
                            />
                            </View>
                            <View style={{justifyContent: 'space-between', paddingVertical: 10, width: 180}}>
                                <Text style={stylesEditProductList.text}>{item.name}</Text>
                                <Text style={stylesEditProductList.text}>Price: {item.price}$</Text>
                                <Text style={stylesEditProductList.text}>Category: {item.categoryName}</Text>
                                <View style={stylesEditProductList.buttonBox}>
                                    <TouchableOpacity 
                                        style={stylesEditProductList.editButton}
                                        onPress={() => {
                                            setEditModalVisible(true);
                                            setSelectedProducts(item);
                                        }}
                                    >
                                        <Text style={{color:COLORS.textColor, fontSize: 18}}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={stylesEditProductList.removeButton}
                                        onPress={() => {
                                            setModalVisible(true);
                                            setSelectedProducts(item);
                                    }}>
                                        <Text style={{color:COLORS.textColor, fontSize: 18}}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
            <RemoveModal
                visible={modalVisible}
                title="Delete product?"
                message="Are you sure you want to delete this product?"
                onCancel={() => setModalVisible(false)}
                onConfirm={() => {
                    removeProducts(selectedProducts.id);
                    setProducts(prev =>
                    prev.filter(prod => prod.id !== selectedProducts.id));
                    Toast.show({
                        type: 'success',
                        text1: 'Done',
                        text2: 'Products successfully removed'
                    });
                setModalVisible(false);
                }}
            />

            <EditProductModal
                visible={editModalVisible}
                category={selectedProducts}
                onCancel={() => setEditModalVisible(false)}
                onSave={(name, price, description, categoryId, stock, imageUrl) => {
                    updateProducts(
                        selectedProducts.id,
                        name,
                        price,
                        description,
                        categoryId,
                        stock,
                        imageUrl
                    );
            
                    loadProducts();
                    setEditModalVisible(false);
                    Toast.show({
                        type: 'success',
                        text1: 'Done',
                        text2: 'Category successfully changed'
                    });
                }}
            />
        </>
    );

};

const stylesEditProductList = StyleSheet.create({
    
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
        flexDirection: 'row'
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
    },

    buttonBox: {
        justifyContent:'space-around',
        flexDirection:'row'
    },

    removeButton: {
        width: 60,
        height: 40,
        backgroundColor: '#d80101',
        borderRadius: 15,
        justifyContent:'center',
        alignItems:'center'
    },

    editButton: {
        width: 60,
        height: 40,
        backgroundColor: COLORS.buttonColor,
        borderRadius: 15, 
        justifyContent:'center',
        alignItems:'center',
        marginRight: 20
    }
});




