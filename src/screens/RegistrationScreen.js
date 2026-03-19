import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { COLORS } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { addUser, checkEmail } from '../database/database';

export default function RegistrationScreen({navigation}){


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const setNewUser = () => {
        if(checkEmail(email)){
            alert('This account is already registered');
        }
        else{
            if(password === password2){
                addUser(email, password);
                navigation.replace('Main');
            }
            else{
                alert('Passwords must be the same');
            }
        }
    };

    return(
        <View style={stylesRegistration.container}>

            <View style={stylesRegistration.divText}>
                <Text style={stylesRegistration.mainText}>Registration</Text>
            </View>

            <View>

                <TextInput
                  style={stylesRegistration.textInput}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  placeholder='Email'
                  placeholderTextColor={'#626262b3'}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />

                <TextInput
                  style={stylesRegistration.textInput}
                  secureTextEntry= {true}
                  placeholder='Password'
                  placeholderTextColor={'#626262b3'}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />

                <TextInput
                  style={stylesRegistration.textInput}
                  secureTextEntry= {true}
                  placeholder='Confirm Password'
                  placeholderTextColor={'#626262b3'}
                  value={password2}
                  onChangeText={(text) => setPassword2(text)}
                />

            </View>

            <View>
                <TouchableOpacity onPress={() => setNewUser()}>
                    <LinearGradient 
                    style={stylesRegistration.button}
                    colors={["#3033de", "#e73fd0"]}
                    start={{x:0,y:0}}
                    end={{x:1,y:0}}>
                        <Text style={stylesRegistration.buttonText}>Register</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const stylesRegistration = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    divText: {
        marginTop: 70,
        marginBottom: 50,
        alignItems: 'center'
    },
    mainText: {
        fontSize: 50,
        color: '#1922c6',
        fontFamily: 'sans-serif',
        fontWeight: '800'
    },
    textInput: {
        height: 60,
        marginHorizontal: 50,
        padding: 10,
        borderRadius: 30,
        borderWidth: 1,
        backgroundColor: '#fff',
        fontSize: 20,
        marginBottom: 40,
        color: '#000',
  },
    button: {
        height: 60,
        marginHorizontal: 50,
        borderRadius: 30,
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 120
    },
    buttonText: {
        fontSize: 30,
        fontFamily: 'sans-serif',
        fontWeight: '700'
    },
})