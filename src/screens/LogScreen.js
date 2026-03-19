import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { COLORS } from '../constants/colors';
import { checkUser } from '../database/database';
import { useState } from 'react';

import { LinearGradient } from 'expo-linear-gradient';

export default function LogScreen({navigation}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkUsers = () => {
    if(checkUser(email, password)){
      navigation.replace('Main');
    }
    else{
      alert('User not found or wrong password');
      return;
    }
  };

  const isValide = email && password;
  
  return (
    <View style= {stylesLog.container}>

      <View style= {stylesLog.divText}>
        <Text style= {stylesLog.text}>Log In</Text>
      </View>

      <View>
        <TextInput
          style={stylesLog.textInput}
          keyboardType='email-address'
          autoCapitalize='none'
          placeholder='Email'
          placeholderTextColor={'#626262b3'}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={stylesLog.textInput}
          secureTextEntry= {true}
          placeholder='Password'
          placeholderTextColor={'#626262b3'}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <View style={stylesLog.buttonView}>
          <TouchableOpacity 
            disabled={!isValide}
            onPress={() => checkUsers()}>
              <LinearGradient
                style={[stylesLog.button, {opacity: isValide ? 1 : 0.5}]}
                colors={["#3033de", "#e73fd0"]}
                start={{x:0,y:0}}
                end={{x:1,y:0}}>
                <Text style={stylesLog.buttonText}>Log In</Text>
              </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={stylesLog.linkText}>
          <TouchableOpacity 
          
            onPress={() => navigation.navigate('Registration')}
            
          >
            <Text style={{color: COLORS.textColor}}>
              Dont have account? <Text style={stylesLog.link}> Register</Text>
            </Text>
          </TouchableOpacity> 
        </View>

      </View>
    </View> 
  );
}

const stylesLog = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },

  divText: {
    margin: 70,
    alignItems: 'center'
  },

  text: {
    fontSize: 50,
    color: COLORS.textColor,
    fontFamily: 'sans-serif',
    fontWeight: '800'
  },

   textInput: {
    height: 60,
    marginHorizontal: 50,
    padding: 10,
    borderRadius: 30,
    borderColor:COLORS.borderColorGrey,
    borderWidth: 1,
    backgroundColor: COLORS.inputTextColor,
    fontSize: 20,
    marginBottom: 40,
    color: COLORS.textColor,
  },

  button: {
    height: 60,
    width: 260,
    marginHorizontal: 50,
    borderRadius: 30,
    justifyContent:'center',
    alignItems: 'center'
  },

  buttonView: {
    height: 60,
    width: 260,
    marginTop: 200
  },

  buttonText: {
    fontSize: 30,
    fontFamily: 'sans-serif',
    fontWeight: '700',
    color:COLORS.textColor
  },
  
  link: {
    color: '#070ab5',
    marginBottom: -4
  },

  linkText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  }
});


  