import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuthToken = async () => {
    const authData = await AsyncStorage.getItem('@auth');
    if (authData) {
        const { token } = JSON.parse(authData);
        return token;
    }
    return null;
};