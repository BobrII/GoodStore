import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { COLORS } from "../constants/colors";
import { useState, useEffect } from "react";
import { addNewProducts, getCategories } from '../database/database';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from "react-native-toast-message";
import * as ImagePicker from 'expo-image-picker';


export default function AddProductScreen() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const [stock, setStock] = useState('');
    const [image, setImage] = useState('');

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    const checkPrice = (num) => {
        if(num >= 0) setPrice(num);
        else alert('Price cant be less then null');
    };

    const checkStock = (num) => {
        if(num >= 0) setStock(num);
        else alert('Stock cant be less then null')
    };

    useEffect(() => {
        const data = getCategories();
        const formatted = data.filter(cat => cat.isActive === 1).map(cat => ({
            label: cat.name,
            value: cat.id
        }))
        setItems(formatted);
    }, []);

    const ifFormValid = name && price && value && description && image && stock;

    const pickImage = async () => { 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync(); 
        if (!permissionResult.granted) { 
            alert("Permission to access gallery is required!");
            return; 
        }
        const result = await ImagePicker.launchImageLibraryAsync(
            { mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7, });
        if (!result.canceled) { 
            const uri = result.assets[0].uri;
            setImage(uri); 
        } 
    };

    const handleAddNewProduct = () => {
        addNewProducts(name, price, value, stock, image, description);
        Toast.show({
            type: 'success',
            text1: 'Done',
            text2: 'Product added to the main page'
        });
        setName('');
        setDescription('');
        setPrice('');
        setValue(''); 
        setStock('');
        setImage('');
    };

    return (
        <View style={{flex: 1}}>
            <View style={stylesAddProduct.topBorder}></View>
            <View style={stylesAddProduct.divider}/>

            <ScrollView 
                contentContainerStyle={stylesAddProduct.constainer}
                showsVerticalScrollIndicator={false}
            >

                <TouchableOpacity onPress={pickImage}>
                    {image ? (
                        <Image
                            source={{ uri: image }}
                            style={{ width: 150, height: 150, marginBottom: 20, borderRadius: 10 }}
                        />
                    ) : 
                        <Image source={require('../../assets/placeholderImage.jpg')}
                            style={{ width: 150, height: 150, marginBottom: 20, borderRadius: 10}}
                        />}
                </TouchableOpacity>

                <TextInput
                    style = {stylesAddProduct.textInput}
                    placeholder= 'Product name'
                    value={name}
                    onChangeText={(text) => setName(text)}
                    placeholderTextColor={COLORS.placeHolderColor}
                    
                />

                <TextInput
                    style = {stylesAddProduct.textInput}
                    placeholder= 'Product price'
                    keyboardType='number-pad'
                    value={price}
                    onChangeText={(text) => checkPrice(text)}
                    placeholderTextColor={COLORS.placeHolderColor}
                />
                
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Select category"
                    listMode="SCROLLVIEW"
                    placeholderStyle={{color: COLORS.placeHolderColor}}
                    style={stylesAddProduct.dropdown}
                    textStyle={{fontSize: 20, color: '#fff'}}

                    dropDownContainerStyle={{
                        backgroundColor: COLORS.inputTextColor, 
                        width: 200, 
                        maxHeight: 200, 
                        marginLeft: 40,
                        borderColor: COLORS.borderColorGreen,
                    }}
                    listItemLabelStyle= {{color: COLORS.textColor}}
                    arrowIconStyle={{tintColor: COLORS.borderColorGreen}}
                />

                <TextInput
                    style = {stylesAddProduct.textInput}
                    placeholder= 'Product stock'
                    keyboardType='number-pad'
                    value={stock}
                    onChangeText={(text) => checkStock(text)}
                    placeholderTextColor={COLORS.placeHolderColor}
                />

                

                <TextInput
                    style = {stylesAddProduct.textInputDesc}
                    placeholder= 'Product description'
                    value={description}
                    multiline={true}
                    numberOfLines={5}
                    textAlignVertical="top"
                    onChangeText={(text) => setDescription(text)}
                    placeholderTextColor={COLORS.placeHolderColor}
                />

                <TouchableOpacity 
                    disabled={!ifFormValid} 
                    style={[stylesAddProduct.touchableOpasity, {opacity: ifFormValid ? 1 : 0.5}]}
                    onPress={() => handleAddNewProduct()}>
                        <Text style={{fontSize: 30, color: ifFormValid ? '#fff' : '#000'}}>Add</Text>
                </TouchableOpacity>
            </ScrollView>
            
        </View>
    );
};

const stylesAddProduct = StyleSheet.create({
    topBorder: {
        height: 80,
        backgroundColor:COLORS.topBorderBackground,
    },

    divider: {
        height: 1,
        backgroundColor: COLORS.borderColorGreen,
    },

    constainer: {
        paddingTop: 20,
        alignItems: 'center',
        backgroundColor: COLORS.background,
        flexGrow: 1
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
        marginBottom: 20,
        color: '#fff',
    },

    dropdown:{
        height: 60,
        width: 300,
        padding: 10,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: COLORS.borderColorGreen,
        backgroundColor: COLORS.inputTextColor,
        fontSize: 20,
        marginBottom: 20,
        marginLeft: 30,
        color: COLORS.background
    },

    textInputDesc: {
        height: 150,
        width: 300,
        padding: 10,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: COLORS.borderColorGreen,
        backgroundColor: COLORS.inputTextColor,
        fontSize: 20,
        marginBottom: 20,
        color: '#fff'
    },
    touchableOpasity: {
        height: 60,
        width: 260,
        backgroundColor: COLORS.buttonColor,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },

    imageButton: {

    }

})