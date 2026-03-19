import { View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import { COLORS } from '../constants/colors';
import { getProductsInfo } from '../database/database';
import { useState, useEffect } from 'react';
import { addToCart } from '../database/database';
import Toast from 'react-native-toast-message';


export default function ProductInfo({route}){

    const [count, setCount] = useState(1);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        if(count > 1){
            setCount(count - 1);
        }
    };

    const {productsId} = route.params;
    const [info, setInfo] = useState({});

    const countedPrice = info.price * count;

    useEffect(() =>{
        const item = getProductsInfo(productsId);
        setInfo(item);
    }, []);

    const date = new Date().toISOString();

    return(
        <>
        <View style={stylesProductInfo.topBorder}></View>

        <View style={stylesProductInfo.divider}/>

        <View style={stylesProductInfo.container}>
            <View style={{alignItems: 'center'}}>
                <Image
                    style={stylesProductInfo.image}
                    source={{uri: info.imageUrl}}
                />
            </View>
            
            <Text style={stylesProductInfo.text}>
                {info.name}
            </Text>
            
            <View style={stylesProductInfo.textDivider}/>

            <View style={{flexDirection: 'row'}}>
                <Text style={stylesProductInfo.text}>
                    Priсe: {countedPrice}$ 
                </Text>
                <View style={{flexDirection:'row', marginTop: 15, marginLeft: 80}}>
                    <TouchableOpacity onPress={() => decrement()}>
                        <Text style={{fontSize: 30, color: COLORS.buttonColor}}>–</Text>
                    </TouchableOpacity>
                        <Text style={{fontSize: 30, color: '#fff', marginHorizontal: 15}}>
                            {count}
                        </Text>
                    <TouchableOpacity onPress={() => increment()}>
                        <Text style={{fontSize: 30, color: COLORS.buttonColor}}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
                
            <View style={stylesProductInfo.textDivider}/>

            <View style={{flexDirection: 'row'}}>
                <Text style={stylesProductInfo.text}>
                    Stock: {info.stock}
                </Text>
                <TouchableOpacity 
                    style={stylesProductInfo.buyButton} 
                    onPress={() => 
                        {addToCart(info.name, countedPrice, count, info.imageUrl, date);
                        Toast.show({
                            type: 'success',
                            text1: 'Done',
                            text2: 'Product added to cart'
                        })  
                    }}
                >
                    <Text style={{fontSize: 20, color: COLORS.textColor}}>Add to Cart</Text>
                   
                </TouchableOpacity>
            </View>

            <View style={[stylesProductInfo.textDivider,  {marginTop: 10}]}/>

            <Text style={stylesProductInfo.text}>
                Description : {info.description}
            </Text>
        </View>
        
        </>
    );
};

const stylesProductInfo = StyleSheet.create({
    topBorder: {
        height: 80,
        backgroundColor:COLORS.topBorderBackground
    },

    divider: {
        height: 1,
        backgroundColor: COLORS.borderColorGreen,
    },

    text: {
        fontSize: 25,
        marginLeft: 29,
        marginTop: 20,
        color: COLORS.textColor
    },

    container: {
        backgroundColor: COLORS.background,
        flex: 1
    },
    
    buyButton: {
        width: 150,
        height: 50,
        backgroundColor: COLORS.buttonColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20, 
        marginLeft: 40,
        marginTop: 10
    },

    image: {
        width: 300,
        height: 300,
        marginTop: 20,
        borderRadius: 20
    },

    textDivider: {
        height: 1,
        backgroundColor: COLORS.borderColorGrey,
        marginTop: 15
    },



});