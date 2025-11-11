import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

type Ability = {
  ability: {
    name: string;
  };
};

type PokemonDetail = {
  name: string;
  abilities: Ability[];
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  base_experience: number;
};

const DetailScreen: React.FC<Props> = ({ route }) => {
  const { name } = route.params;
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();
        setPokemon(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [name]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load Pokémon data.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{pokemon.name}</Text>

        <Image
          source={{ uri: pokemon.sprites.front_default }}
          style={styles.image}
        />

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Height: {pokemon.height}</Text>
          <Text style={styles.infoText}>Weight: {pokemon.weight}</Text>
          <Text style={styles.infoText}>Base EXP: {pokemon.base_experience}</Text>
        </View>

        <Text style={styles.subtitle}>Abilities:</Text>
        {pokemon.abilities.map((a, i) => (
          <Text key={i} style={styles.ability}>
            • {a.ability.name}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fcefbaff',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 10,
    color: '#333',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#f9df75ff',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    alignSelf: 'flex-start',
    color: '#f9df75ff',
  },
  ability: {
    fontSize: 16,
    textTransform: 'capitalize',
    color: '#444',
    alignSelf: 'flex-start',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
