import { StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { COLORS } from "../constants/colors";


export default function SettingScreen({navigation}){
    const openScreen = (name) => {
        navigation.navigate(name);
    }

    return (
        <>
            <View style={stylesSetting.topBorder}></View>

            <View style={stylesSetting.divider}/>

            <View style={stylesSetting.container}>

                <TouchableOpacity style={stylesSetting.touchableButon} onPress={() => openScreen('AddProduct')}>
                    <Text style={stylesSetting.touchableButtonText}>Add Product</Text>
                </TouchableOpacity>

                <TouchableOpacity style={stylesSetting.touchableButon} onPress={() => openScreen('EditProductList')}>
                    <Text style={stylesSetting.touchableButtonText}>Edit Product</Text>
                </TouchableOpacity>

                <TouchableOpacity style={stylesSetting.touchableButon} onPress={() => openScreen('EditCategoryScreen')}>
                    <Text style={stylesSetting.touchableButtonText}>Edit Category</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const stylesSetting = StyleSheet.create({
    topBorder: {
        height: 80,
        backgroundColor:COLORS.topBorderBackground,
    },

    divider: {
        height: 1,
        backgroundColor: COLORS.borderColorGreen,
    },

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center'
    },

    touchableButon: {
        width: 300,
        height: 100,
        backgroundColor: COLORS.buttonColor,
        borderRadius: 20,
        justifyContent:'center',
        alignItems:'center',
        marginVertical: 10
    },

    touchableButtonText: {
        fontSize: 30,
        fontFamily: 'sans-serif',
        fontWeight: 800,
        color: COLORS.textColor
    }
});