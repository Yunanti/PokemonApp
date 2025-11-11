import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabParamList } from './LandingScreen';
import { RootStackParamList } from '../navigation/RootNavigator';
import { getSession, logout } from '../utils/storage';

// Typing: Bottom tab props + Native stack props (untuk akses ke stack parent jika perlu)
type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getSession();
      if (session) setUsername(session.username);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();

    // Ambil parent navigator (stack) supaya kita bisa reset ke route 'Login'
    // Parent kita cast ke NativeStackNavigationProp<RootStackParamList>
    const parent = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();

    if (parent) {
      parent.reset({
        index: 0,
        routes: [{ name: 'Login' }], // sekarang TypeScript tahu 'Login' adalah route stack
      });
    } else {
      // Fallback: kalau parent gak ada, coba paksa reset di current navigator (kurang ideal)
      navigation.reset({
        index: 0,
        // perlu cast karena current navigator mengharapkan BottomTabParamList keys
        routes: [{ name: 'Profile' as never }],
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {username ? <Text style={styles.username}>Welcome, {username} 👋</Text> : <Text>Loading...</Text>}
      <View style={{ marginTop: 30 }}>
        <Button title="Logout" onPress={handleLogout} color="#000000ff" />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9df75ff',
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  username: { fontSize: 18, color: '#333' },
});
