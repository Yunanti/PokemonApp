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
import { loginUser } from '../utils/storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  const onLogin = async () => {
    try {
      setLoading(true);
      await loginUser({ username, password });
      navigation.replace('Landing');
    } catch (e: any) {
      alert('Login gagal: ' + e.message);
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
        Silakan login jika sudah memiliki akun, atau register jika belum.
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

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={onLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Loading...' : 'Login'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>
            Belum punya akun? <Text style={{ color: '#cea916ff' }}>Register</Text>
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

export default LoginScreen;
