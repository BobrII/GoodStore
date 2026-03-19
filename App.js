import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { initDatabase } from './src/database/database';
import Toast from 'react-native-toast-message';

import LogScreen from './src/screens/LogScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import TabNavigator from './src/navigation/TabNavigator';
import AddProductScreen from './src/screens/AddProductScreen';
import ProductInfoScreen from './src/screens/ProductInfoScreen';
import ShoppingCartScreen from './src/screens/ShoppingCartScreen';
import EditCategoryScreen from './src/screens/EditCategoryScreen';
import EditProductList from './src/screens/EditProductList';

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Main'>

          <Stack.Screen 
            name='Login'
            component={LogScreen}
            options={{ headerShown : false }}
          />

          <Stack.Screen
            name='Registration'
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='Main'
            component={TabNavigator}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name='AddProduct'
            component={AddProductScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name='ProductInfoScreen'
            component={ProductInfoScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name='ShoppingCartScreen'
            component={ShoppingCartScreen}
            options={{headerShown: false}}
          />
 
          <Stack.Screen
            name='EditCategoryScreen'
            component={EditCategoryScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name='EditProductList'
            component={EditProductList}
            options={{headerShown: false}}
          />

        </Stack.Navigator>
      </NavigationContainer>
      <Toast/>
    </>
  );
}


  