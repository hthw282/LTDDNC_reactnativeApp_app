import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useReduxStateHook } from '../../hooks/customeHook'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/features/auth/userActions'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Footer = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loading = useReduxStateHook(navigation, 'login')
  return (
    <View style={styles.container}>
      {/* Home Page */}
      <TouchableOpacity 
        style={styles.menuContainer}
        onPress={() => navigation.navigate('home')}
        >
        <AntDesign style={[styles.icon, route.name === 'home' && styles.active]} name='home'/>
        <Text style={[styles.iconText, route.name === 'home' && styles.active]}>Home</Text>
      </TouchableOpacity>
      {/* Notification Page */}
      <TouchableOpacity 
        style={styles.menuContainer}
        onPress={() => navigation.navigate('notifications')}
        >
        <AntDesign style={[styles.icon, route.name === 'notifications' && styles.active]} name='bells'/>
        <Text style={[styles.iconText, route.name === 'notifications' && styles.active]}>Notification</Text>
      </TouchableOpacity>
      {/* Account Page */}
      <TouchableOpacity 
        style={styles.menuContainer}
        onPress={() => navigation.navigate('account')}
        >
        <AntDesign style={[styles.icon, route.name === 'account' && styles.active]} name='user'/>
        <Text style={[styles.iconText, route.name === 'account' && styles.active]}>Account</Text>
      </TouchableOpacity>
      {/* Cart Page */}
      <TouchableOpacity 
        style={styles.menuContainer}
        onPress={() => navigation.navigate('cart')}
        >
        <AntDesign style={[styles.icon, route.name === 'cart' && styles.active]} name='shoppingcart'/>
        <Text style={[styles.iconText, route.name === 'cart' && styles.active]}>Cart</Text>
      </TouchableOpacity>
      {/* Logout Page */}
      <TouchableOpacity 
        style={styles.menuContainer}
        onPress={async () => {
          dispatch(logout())
          await AsyncStorage.removeItem('@auth');
        }}
        >
        <AntDesign style={styles.icon} name='logout'/>
        <Text style={styles.iconText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10, 
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '105%', 
    height: 60, 
    borderTopWidth: 1, 
    borderTopColor: '#ccc',
  },
  menuContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, 
  },
  icon: {
    fontSize: 25,
    color: '#000000', 
  },
  iconText: {
    fontSize: 10,
    color: '#000000',
  },
  active: {
    color: 'blue',
  }
});

export default Footer;