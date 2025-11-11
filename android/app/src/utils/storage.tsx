import AsyncStorage from '@react-native-async-storage/async-storage';


export interface User {
username: string;
password: string;
}


const USERS_KEY = 'POKE_USERS';
const SESSION_KEY = 'POKE_SESSION';


export const getUsers = async (): Promise<User[]> => {
const raw = await AsyncStorage.getItem(USERS_KEY);
return raw ? JSON.parse(raw) : [];
};


export const saveUsers = async (users: User[]) => {
await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
};


export const registerUser = async (user: User) => {
const users = await getUsers();
if (users.find(u => u.username === user.username)) throw new Error('Username sudah ada');
users.push(user);
await saveUsers(users);
};


export const loginUser = async (user: User) => {
const users = await getUsers();
console.log('USERS DITEMUKAN:', users);
const found = users.find(u => u.username === user.username && u.password === user.password);
if (!found) throw new Error('Username atau password salah');
await AsyncStorage.setItem(SESSION_KEY, JSON.stringify({ username: user.username }));
return { username: user.username };
};


export const getSession = async (): Promise<{ username: string } | null> => {
const raw = await AsyncStorage.getItem(SESSION_KEY);
return raw ? JSON.parse(raw) : null;
};


export const logout = async () => {
await AsyncStorage.removeItem(SESSION_KEY);
};