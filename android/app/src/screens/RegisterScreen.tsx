import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { registerUser } from '../utils/storage';


type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;


const RegisterScreen: React.FC<Props> = ({ navigation }) => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);


const onRegister = async () => {
try {
setLoading(true);
await registerUser({ username, password });
Alert.alert('Sukses', 'Registrasi berhasil. Silakan login.');
navigation.goBack();
} catch (e: any) {
Alert.alert('Gagal', e.message);
} finally {
setLoading(false);
}
};


return (
<View style={styles.container}>
<Text style={styles.title}>Register</Text>
<TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
<TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
<Button title={loading ? 'Loading...' : 'Register'} onPress={onRegister} disabled={loading} />
</View>
);
};


const styles = StyleSheet.create({
container: { flex: 1, padding: 20, justifyContent: 'center' },
title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 12, borderRadius: 6 },
});


export default RegisterScreen;