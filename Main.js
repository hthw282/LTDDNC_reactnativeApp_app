import { jwtDecode } from 'jwt-decode';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import Home from './screens/Home';
import About from './screens/About';
import ProductDetails from './screens/ProductDetails';
import Cart from './screens/Cart';
import Checkout from './screens/Checkout';
import Payment from './screens/Payment';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import Account from './screens/Account/Account';
import Notifications from './screens/Account/Notifications';
import Profile from './screens/Account/Profile';
import MyOrders from './screens/Account/MyOrders';
import ProductsList from './screens/ProductsList';
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import OtpVerification from './screens/auth/OtpVerification';
import ForgotPassword from './screens/auth/ForgotPassword';
import ResetPassword from './screens/auth/ResetPassword';
import Dashboard from './screens/Admin/Dashboard';
import SendNotification from './screens/Admin/SendNotification';
import socket from './socket/socket';
import FinancialSummary from './screens/Account/FinancialSummary';
import ProtectedScreen from './screens/auth/ProtectedScreen';
import { useDispatch, useSelector } from 'react-redux';
import OrderDetail from './screens/OrderDetail';
import { getUserData, logout } from './redux/features/auth/userActions';

//routes
const Stack = createNativeStackNavigator();

export default function Main() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { isAuth, user } = useSelector(state => state.user);
    const [showSplashScreen, setShowSplashScreen] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const authData = await AsyncStorage.getItem('@auth');
                if (authData) {
                    const { token, user: userData } = JSON.parse(authData);
                    const decoded = jwtDecode(token);

                    if (decoded.exp > Date.now() / 1000) {
                        dispatch(getUserData());
                    } else {
                        await AsyncStorage.removeItem('@auth');
                        dispatch(logout());
                    }
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            } finally {
                setTimeout(() => {
                    setShowSplashScreen(false);
                    setLoading(false);
                }, 2000);
            }
        };
        checkAuth();
    }, [dispatch]);

    if (showSplashScreen) {
        return (
            <View style={styles.splashContainer}>
                <Image
                    source={require('./assets/splash-screen.png')}
                    style={styles.splashImage}
                    resizeMode="cover"
                />
                <ActivityIndicator size="large" color="#4CAF50" style={styles.loadingIndicator} /> 
            </View>
        );
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='home'>
                    {/* không cần đăng nhập */}
                    <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
                    <Stack.Screen name="productDetails" component={ProductDetails} />
                    <Stack.Screen name="cart" component={Cart} />
                    <Stack.Screen name="productsList" component={ProductsList} options={{ headerShown: false }} />
                    <Stack.Screen name="mobile" component={About} />

                    {/* auth */}
                    <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
                    <Stack.Screen name="otpVerification" component={OtpVerification} options={{ headerShown: false }} />
                    <Stack.Screen name="forgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
                    <Stack.Screen name="resetPassword" component={ResetPassword} options={{ headerShown: false }} />
                    <Stack.Screen name="dashboard" component={Dashboard} options={{ headerShown: false }} />

                    {/* cần đăng nhập */}
                    <Stack.Screen name="checkout" >
                        {(props) => <ProtectedScreen {...props} component={Checkout} />}
                    </Stack.Screen>
                    <Stack.Screen name="payment" >
                        {(props) => <ProtectedScreen {...props} component={Payment} />}
                    </Stack.Screen>
                    <Stack.Screen
                    name="account"
                    options={{ headerShown: false }}
                    >
                    {(props) => <ProtectedScreen {...props} component={Account} />}
                    </Stack.Screen>
                    <Stack.Screen name="notifications">
                        {(props) => <ProtectedScreen {...props} component={Notifications} />}
                    </Stack.Screen>
                    <Stack.Screen name="profile">
                        {(props) => <ProtectedScreen {...props} component={Profile} />}
                    </Stack.Screen>
                    <Stack.Screen name="my-orders">
                        {(props) => <ProtectedScreen {...props} component={MyOrders} />}
                    </Stack.Screen>
                    <Stack.Screen name="order-detail">
                        {(props) => <ProtectedScreen {...props} component={OrderDetail} />}
                    </Stack.Screen>
                    <Stack.Screen name="financial-summary">
                        {(props) => <ProtectedScreen {...props} component={FinancialSummary} />}
                    </Stack.Screen>

                    <Stack.Screen name="admin-panel">
                        {(props) => <ProtectedScreen {...props} component={Dashboard} />}
                    </Stack.Screen>
                    <Stack.Screen name="sendNotification">
                        {(props) => <ProtectedScreen {...props} component={SendNotification} />}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
            <Toast />
        </>
    );
}

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    splashImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    loadingIndicator: {
        position: 'absolute', 
        bottom: 20, 
    },
});
