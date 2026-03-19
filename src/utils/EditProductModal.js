import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useState, useEffect } from "react";
import { getCategories } from "../database/database";
import { COLORS } from "../constants/colors";
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';


export default function EditProductModal({
    visible,
    category,
    onSave,
    onCancel
}) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState('');

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    const isActive  = name.trim() && price && description.trim() && stock && image && value;

    useEffect(() => {
        const data = getCategories();
        const formatted = data.filter(cat => cat.isActive === 1).map(cat => ({
            label: cat.name,
            value: cat.id
        }))
        setItems(formatted);
        if(category){
            setName(category.name);
            setDescription(category.description)
            setImage(category.imageUrl);
            setPrice(String(category.price));
            setStock(String(category.stock));
            setValue(category.categoryId);
        }
    }, [category]);

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
    

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={stylesEditProduct.overlay}>
                <View style={stylesEditProduct.modal}>

                    <Text style={stylesEditProduct.title}>Edit category</Text>

                    <TextInput
                        style={stylesEditProduct.input}
                        value={name}
                        onChangeText={(text) => setName(text)}
                        placeholder="Product name"
                        placeholderTextColor="#aaa"
                    />

                    <TextInput
                        style={stylesEditProduct.input}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        placeholder="Product description"
                        placeholderTextColor="#aaa"
                    />

                    <TextInput
                        style={stylesEditProduct.input}
                        value={price}
                        onChangeText={(text) => setPrice(text)}
                        placeholder="Product price"
                        placeholderTextColor="#aaa"
                        keyboardType='number-pad'
                    />

                    <TextInput
                        style={stylesEditProduct.input}
                        value={stock}
                        onChangeText={(text) => setStock(text)}
                        placeholder="Product stock"
                        placeholderTextColor="#aaa"
                        keyboardType='number-pad'
                    />

                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="Product category"
                        placeholderStyle={{color: COLORS.placeHolderColor}}
                        style={stylesEditProduct.dropdown}
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

                    <View style={stylesEditProduct.buttons}>
                        <TouchableOpacity onPress={onCancel}>
                            <Text style={stylesEditProduct.cancel}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[stylesEditProduct.saveBtn, !isActive && {backgroundColor: '#ccc'}]}
                            onPress={() => onSave(name, Number(price), description, value, Number(stock), image)}
                            disabled={!isActive}
                        >
                            <Text style={stylesEditProduct.saveText}>Save</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
}

const stylesEditProduct = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {
        width: 300,
        backgroundColor: "#1e1e1e",
        padding: 20,
        borderRadius: 20
    },
    title: {
        fontSize: 20,
        color: "#fff",
        marginBottom: 15
    },
    input: {
        backgroundColor: "#333",
        color: "#fff",
        padding: 10,
        borderRadius: 10,
        marginBottom: 15
    },
    switchRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    cancel: {
        marginTop: 8,
        color: "#aaa",
        marginRight: 15
    },
    saveBtn: {
        backgroundColor: "#2a7",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10
    },
    saveText: {
        color: "#fff"
    }, 

    dropdown:{
        backgroundColor: "#333",
        color: "#fff",
        padding: 10,
        borderRadius: 10,
        marginBottom: 15
    },
});