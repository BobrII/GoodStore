import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { useState, useEffect } from "react";


export default function EditCategoryModal({
    visible,
    category,
    onSave,
    onCancel
}) {
    const [name, setName] = useState('');
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (category) {
            setName(category.name);
            setIsActive(category.isActive === 1);
        }
    }, [category]);

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={stylesEditCategory.overlay}>
                <View style={stylesEditCategory.modal}>

                    <Text style={stylesEditCategory.title}>Edit category</Text>

                    <TextInput
                        style={stylesEditCategory.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Category name"
                        placeholderTextColor="#aaa"
                    />

                    <View style={stylesEditCategory.switchRow}>
                        <Text style={{color: '#fff'}}>Active:</Text>
                        <Switch
                            value={isActive}
                            onValueChange={setIsActive}
                        />
                    </View>

                    <View style={stylesEditCategory.buttons}>
                        <TouchableOpacity onPress={onCancel}>
                            <Text style={stylesEditCategory.cancel}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={stylesEditCategory.saveBtn}
                            onPress={() => onSave(name, isActive)}
                        >
                            <Text style={stylesEditCategory.saveText}>Save</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
}

const stylesEditCategory = StyleSheet.create({
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