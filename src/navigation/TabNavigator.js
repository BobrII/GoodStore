import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import SettingScreen from "../screens/SettingScreen";
import { COLORS } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigator(){
    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: COLORS.borderColorGreen,
                tabBarInactiveTintColor: COLORS.borderColorGrey,
                tabBarIcon: ({ color, size}) => {
                    let iconName;
                    if(route.name === 'Home') iconName = 'home';
                    
                    else if(route.name === 'Search') iconName = 'search';
                    
                    else if(route.name === 'Setting') iconName = 'settings';
                    
                    return <Ionicons name={iconName} size={size} color={color} />
                },

                tabBarStyle: {
                    backgroundColor: COLORS.topBorderBackground,
                    borderColor: COLORS.borderColorGreen,
                }
            })}
        >
            <Tab.Screen 
                name='Home' 
                component={HomeScreen} 
                options={{ headerShown: false }}
            />

            <Tab.Screen 
                name='Search' 
                component={SearchScreen}
                options={{ headerShown: false }}
            />

            <Tab.Screen
                name='Setting'
                component={SettingScreen}
                options={{headerShown: false}}
            />

        </Tab.Navigator>
    );
}