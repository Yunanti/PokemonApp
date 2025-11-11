import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from './LandingScreen';

type Pokemon = {
  name: string;
  url: string;
};

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>('https://pokeapi.co/api/v2/pokemon?limit=10');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [pikachuImage, setPikachuImage] = useState<string | null>(null);

  // Fetch Pokémon list
  const fetchPokemons = useCallback(async () => {
    if (!nextUrl) return;
    setLoading(true);
    try {
      const res = await fetch(nextUrl);
      const data = await res.json();
      setPokemons(prev => [...prev, ...data.results]);
      setNextUrl(data.next);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [nextUrl]);

  // Fetch Pikachu image for header
  const fetchPikachu = useCallback(async () => {
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
      const data = await res.json();
      setPikachuImage(data.sprites.front_default);
    } catch (error) {
      console.error('Failed to fetch Pikachu image', error);
    }
  }, []);

  useEffect(() => {
    fetchPokemons();
    fetchPikachu();
  }, [fetchPokemons, fetchPikachu]);

  const handleSearch = async () => {
    if (!search.trim()) return;
    navigation.navigate('Detail', { name: search.toLowerCase() });
  };

  const renderItem = ({ item }: { item: Pokemon }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Detail', { name: item.name })}
    >
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Pokémon App</Text>
          <Text style={styles.headerSubtitle}>Catch your favorite Pokémon!</Text>
        </View>
        {pikachuImage && (
          <Image
            source={{ uri: pikachuImage }}
            style={styles.headerImage}
          />
        )}
      </View>
    <View style={styles.container}>
      {/* 🌟 Header */}

      {/* 🔍 Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search Pokémon..."
          style={styles.input}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* 📋 Pokémon List */}
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        onEndReached={fetchPokemons}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
      />
    </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9df75ff',
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 2,
  },
  headerImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  searchBtn: {
    backgroundColor: 'black',
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginLeft: 8,
    borderRadius: 10,
  },
  searchText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});
