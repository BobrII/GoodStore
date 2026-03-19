import { View, StyleSheet, FlatList, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/colors";
import { getCategories } from "../database/database";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { checkCatProduct } from "../database/database";
import { deleteCategory } from "../database/database";
import { updateCategory } from "../database/database";
import { addCategory } from "../database/database";
import Toast from "react-native-toast-message";

import RemoveModal from "../utils/RemoveModal";
import EditCategoryModal from "../utils/EditCategoryModals";
import AddCategoryModal from "../utils/AddCategoryModal";



export default function EditCategoryScreen() {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedEditCategory, setSelectedEditCategory] = useState(null);

    const [addModalVisible, setAddModalVisible] = useState(false);
   
    const [categories, setCategories] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadCategories();
        }, [])
    );

    const loadCategories = () => {
        const data = getCategories();
        setCategories(data);
    };

    const isActive = (num) => {
        if(num === 1) return 'Yes';
        else return 'No';
    };

    return(
        <>
            <View style={stylesEditCategory.topBorder}></View>

            <View style={stylesEditCategory.divider}/>
            
            <View style={stylesEditCategory.constainer}>
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <View style={stylesEditCategory.element}>
                            <View>
                                <Text style={stylesEditCategory.categoryText}>Category name: {item.name}</Text>
                                <Text style={stylesEditCategory.categoryText}>Is active: {isActive(item.isActive)}</Text>
                            </View>

                            <View style={{flexDirection:'row', marginTop: 5, marginRight: 10}}>
                                <TouchableOpacity 
                                    style={stylesEditCategory.editButton}
                                    onPress={() => {
                                        setSelectedEditCategory(item);
                                        setEditModalVisible(true);
                                    }}
                                >
                                    <Text style={stylesEditCategory.buttonText}>Edit</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={stylesEditCategory.removeButton}
                                    onPress={() => {setSelectedCategory(item);
                                        setModalVisible(true);
                                    }}
                                >
                                    <Text style={stylesEditCategory.buttonText}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />

                <View style={{height: 100, width: '100%', alignItems: 'flex-end'}}>
                    <TouchableOpacity 
                        style={stylesEditCategory.addButton}
                        onPress={() => {
                            setAddModalVisible(true);
                        }}
                    >
                        <Text style={{fontSize: 40, color:COLORS.textColor}}>+</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <RemoveModal
                visible={modalVisible}
                title="Delete category"
                message="Are you sure you want to delete this category?"
                onCancel={() => setModalVisible(false)}
                onConfirm={() => {
                    const result = checkCatProduct(selectedCategory.id);

                    if (result) {
                        Toast.show({
                            type: 'error',
                            text1: 'Error',
                            text2: 'Cant remove because category use'
                        });
                    } else {
                        deleteCategory(selectedCategory.id);
                        setCategories(prev =>
                        prev.filter(cat => cat.id !== selectedCategory.id)
                        );
                        Toast.show({
                            type: 'success',
                            text1: 'Done',
                            text2: 'Category successfully removed'
                        });
                    }
                    setModalVisible(false);
                }}
            />

            <EditCategoryModal
                visible={editModalVisible}
                category={selectedEditCategory}
                onCancel={() => setEditModalVisible(false)}
                onSave={(name, isActive) => {

                    updateCategory(
                    selectedEditCategory.id,
                    name,
                    isActive ? 1 : 0
                    );

                    setCategories(prev =>
                        prev.map(cat =>
                            cat.id === selectedEditCategory.id
                            ? { ...cat, name, isActive: isActive ? 1 : 0 }
                            : cat
                        )
                    );
                    setEditModalVisible(false);
                    Toast.show({
                        type: 'success',
                        text1: 'Done',
                        text2: 'Category successfully changed'
                    });
                }}
            />

            <AddCategoryModal
                visible={addModalVisible}
                onCancel={() => setAddModalVisible(false)}
                onSave={(name, isActive) => {
                    const checkName = categories.some(item => item.name.toLowerCase() === name.toLowerCase());
                    if(checkName){
                        alert('This category name using, please enter another name');
                    }
                    else{
                        addCategory(name, isActive ? 1 : 0);
                        loadCategories();
                        setAddModalVisible(false);
                        Toast.show({
                            type: 'success',
                            text1: 'Done',
                            text2: 'Category added to the database'
                        });
                    }
                }}
            
            />
        </>
    );
};

const stylesEditCategory = StyleSheet.create({
    topBorder: {
        height: 80,
        backgroundColor:COLORS.topBorderBackground,
    },

    addButton:{
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor:COLORS.buttonColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20
    },

    divider: {
        height: 1,
        backgroundColor: COLORS.borderColorGreen,
    },

    constainer: {
        paddingTop: 20,
        backgroundColor: COLORS.background,
        flex: 1
    },

    element: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent:'space-between',
        backgroundColor: '#555555',
        borderRadius: 20,
        marginTop: 10
    },

    editButton: {
        width: 50,
        height: 40,
        backgroundColor:COLORS.buttonColor,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal: 5,
    },

    removeButton: {
        width: 70,
        height: 40,
        backgroundColor:'#c20404',
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
    },

    buttonText: {
        color: COLORS.textColor,
        fontSize: 17
    },

    categoryText: {
        color: COLORS.textColor,
        fontSize: 18,
        marginLeft: 20,
    }
});
