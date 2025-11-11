import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { fetchPokemonDetailByName } from '../utils/api';


type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;


const SearchScreen: React.FC<Props> = ({ route, navigation }) => {
const [name, setName] = useState(route.params?.name || '');
const [loading, setLoading] = useState(false);


useEffect(() => {
if (route.params?.name) onSearch();
}, []);


const onSearch = async () => {
try {
setLoading(true);
const detail = await fetchPokemonDetailByName(name);
navigation.navigate('Detail', { detail });
} catch (e: any) {
Alert.alert('Not found', e.message);
} finally {
setLoading(false);
}
};


return (
<View style={styles.container}>
<TextInput placeholder="Pokemon name" value={name} onChangeText={setName} style={styles.input} />
<Button title={loading ? 'Searching...' : 'Search'} onPress={onSearch} disabled={loading} />
{loading && <ActivityIndicator style={{ marginTop: 12 }} />}
</View>
);
};


const styles = StyleSheet.create({
container: { flex: 1, padding: 20 },
input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 6, marginBottom: 12 },
});


export default SearchScreen;