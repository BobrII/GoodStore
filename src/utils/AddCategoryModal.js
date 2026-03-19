import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { useState, useEffect } from "react";


export default function AddCategoryModal({
    visible,
    onSave,
    onCancel
}) {
    const [name, setName] = useState('');
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if(visible){
            setName('');
            setIsActive(false);
        }
    }, [visible]);

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={stylesAddCategory.overlay}>
                <View style={stylesAddCategory.modal}>

                    <Text style={stylesAddCategory.title}>Add category</Text>

                    <TextInput
                        style={stylesAddCategory.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Category name"
                        placeholderTextColor="#aaa"
                    />

                    <View style={stylesAddCategory.switchRow}>
                        <Text style={{color: '#fff'}}>Active:</Text>
                        <Switch
                            value={isActive}
                            onValueChange={setIsActive}
                        />
                    </View>

                    <View style={stylesAddCategory.buttons}>
                        <TouchableOpacity onPress={onCancel}>
                            <Text style={stylesAddCategory.cancel}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={stylesAddCategory.saveBtn}
                            onPress={() => onSave(name, isActive)}
                        >
                            <Text style={stylesAddCategory.saveText}>Save</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
}

const stylesAddCategory = StyleSheet.create({
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
    }
});