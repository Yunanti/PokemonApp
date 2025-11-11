import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator, 
  StyleSheet 
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { registerUser } from '../utils/storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [pikachuUrl, setPikachuUrl] = useState<string | null>(null);

  // Ambil gambar Pikachu dari PokéAPI
  useEffect(() => {
    const fetchPikachu = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
        const data = await res.json();
        setPikachuUrl(data.sprites.other['official-artwork'].front_default);
      } catch (error) {
        console.error('Gagal memuat Pikachu:', error);
      }
    };
    fetchPikachu();
  }, []);

  const onRegister = async () => {
    if (!username || !password || !confirmPassword) {
      alert('Semua kolom harus diisi');
      return;
    }
    if (password !== confirmPassword) {
      alert('Password tidak cocok');
      return;
    }

    try {
      setLoading(true);
      await registerUser({ username, password });
      alert('Registrasi berhasil! Silakan login.');
      navigation.replace('Login');
    } catch (e: any) {
      alert('Registrasi gagal: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {pikachuUrl ? (
        <Image source={{ uri: pikachuUrl }} style={styles.pikachu} />
      ) : (
        <ActivityIndicator size="large" color="#F9DF75" />
      )}

      <Text style={styles.welcome}>Welcome to Pokémon App</Text>
      <Text style={styles.subtitle}>
        Silakan buat akun baru untuk mulai berpetualang dengan Pokémon!
      </Text>

      <View style={styles.card}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Konfirmasi Password"
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={onRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Loading...' : 'Register'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerText}>
            Sudah punya akun? <Text style={{ color: '#F9DF75' }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000', 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 20 
  },
  pikachu: { 
    width: 150, 
    height: 150, 
    resizeMode: 'contain', 
    marginBottom: 20 
  },
  welcome: {
    color: '#F9DF75',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 4,
    fontSize: 14
  },
  card: {
    backgroundColor: '#FCEFBA',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: '#000',
  },
  button: {
    backgroundColor: '#F9DF75',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16
  },
  registerText: {
    textAlign: 'center',
    color: '#000',
    marginTop: 4
  }
});

export default RegisterScreen;
