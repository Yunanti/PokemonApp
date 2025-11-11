import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

export type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const LandingScreen: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, size }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = focused
              ? require('../components/images/home.png') // jika mau beda versi aktif
              : require('../components/images/home-notactive.png');
          } else if (route.name === 'Profile') {
            iconSource = focused
              ? require('../components/images/user.png')
              : require('../components/images/user-notactive.png');
          }

          return (
            <Image
              source={iconSource}
              style={{ width: size, height: size, resizeMode: 'contain' }}
            />
          );
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default LandingScreen;
