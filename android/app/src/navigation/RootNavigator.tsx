import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LandingScreen from '../screens/LandingScreen';
import DetailScreen from '../screens/DetailScreen';
import SearchScreen from '../screens/SearchScreen';


export type RootStackParamList = {
Login: undefined;
Register: undefined;
Landing: undefined;
Detail: { name: string };
Search: { name?: string };
};


const Stack = createNativeStackNavigator<RootStackParamList>();


const RootNavigator = () => {
return (
<Stack.Navigator initialRouteName="Login" options={{ headerShown: false }}>
<Stack.Screen name="Login" component={LoginScreen} />
<Stack.Screen name="Register" component={RegisterScreen} />
<Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
<Stack.Screen name="Detail" component={DetailScreen} />
<Stack.Screen name="Search" component={SearchScreen} />
</Stack.Navigator>
);
};


export default RootNavigator;