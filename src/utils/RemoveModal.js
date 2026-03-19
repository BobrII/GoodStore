import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function RemoveModal({
    visible,
    title,
    message,
    onConfirm,
    onCancel
}) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={stylesConfModal.overlay}>
                <View style={stylesConfModal.modal}>

                    <Text style={stylesConfModal.title}>{title}</Text>
                    <Text style={stylesConfModal.message}>{message}</Text>

                    <View style={stylesConfModal.buttons}>
                        <TouchableOpacity style={stylesConfModal.cancelBtn} onPress={onCancel}>
                            <Text style={stylesConfModal.cancelText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={stylesConfModal.deleteBtn} onPress={onConfirm}>
                            <Text style={stylesConfModal.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
}

const stylesConfModal = StyleSheet.create({
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
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10
    },
    message: {
        fontSize: 16,
        color: "#ccc"
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 20
    },
    cancelBtn: {
        marginRight: 15
    },
    cancelText: {
        color: "#aaa",
        fontSize: 16
    },
    deleteBtn: {
        backgroundColor: "#c20404",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10
    },
    deleteText: {
        color: "#fff",
        fontSize: 16
    }
});