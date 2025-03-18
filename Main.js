import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import OtpVerification from './screens/auth/OtpVerification';
import ForgotPassword from './screens/auth/ForgotPassword';
import ResetPassword from './screens/auth/ResetPassword';

//routes
const Stack = createNativeStackNavigator();
export default function Main() {
    const [isAuth, setIsAuth] = useState(null)
    //get user
    useEffect(() => {
        const getUserLocalData = async () => {
          try {
            let data = await AsyncStorage.getItem("@auth");
            if (data) {
              let loginData = JSON.parse(data);
              if (loginData && loginData.email) {
                setIsAuth(loginData); // Lưu vào state dưới dạng object
                console.log("user login data ==>", loginData);
              }
            }
          } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
          }
        };
        getUserLocalData();
      }, []);
      
  return (
    <>
        <NavigationContainer>
        <Stack.Navigator initialRouteName='login'>
            <Stack.Screen name="home" component={Home} options={{
            headerShown: false,
            }}/>
            <Stack.Screen name="productDetails" component={ProductDetails}/>
            <Stack.Screen name="cart" component={Cart}/>
            <Stack.Screen name="checkout" component={Checkout}/>
            <Stack.Screen name="payment" component={Payment}/>
            <Stack.Screen name="account" component={Account}/>
            <Stack.Screen name="notifications" component={Notifications}/>
            <Stack.Screen name="profile" component={Profile}/>
            <Stack.Screen name="my-orders" component={MyOrders}/>
            <Stack.Screen name="productsList" component={ProductsList}/>
            <Stack.Screen name="mobile" component={About}/> 
            {!isAuth && (
                <>
                    <Stack.Screen name="login" component={Login} options={{headerShown:false}}/>
                    <Stack.Screen name="register" component={Register} options={{headerShown:false}}/>
                    <Stack.Screen name="otpVerification" component={OtpVerification} options={{headerShown:false}}/>
                    <Stack.Screen name="forgotPassword" component={ForgotPassword} options={{headerShown:false}}/>
                    <Stack.Screen name="resetPassword" component={ResetPassword} options={{headerShown:false}}/>
                </>
            )}
        </Stack.Navigator>
        </NavigationContainer>
    </>
  );
}
