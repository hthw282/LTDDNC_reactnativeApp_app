import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useReduxStateHook } from '../../hooks/customeHook'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/features/auth/userActions'
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const Footer = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loading = useReduxStateHook(navigation, 'login')
  const isAuth = useSelector((state) => state.user.isAuth); // Lấy trạng thái đăng nhập từ Redux


  const handleLogout = async () => {
    dispatch(logout())
    navigation.navigate('login')
  }
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
      {/* Searching Page */}
      <TouchableOpacity 
        style={styles.menuContainer}
        onPress={() => navigation.navigate('productsList')}
        >
        <FontAwesome style={[styles.icon, route.name === 'productsList' && styles.active]} name="search" />
        <Text style={[styles.iconText, route.name === 'notifications' && styles.active]}>Search</Text>
      </TouchableOpacity>
      {/* Account Page */}
      <TouchableOpacity 
        style={styles.menuContainer}
        onPress={() => navigation.navigate(isAuth ? 'account' : 'login')}
        >
        <AntDesign style={[styles.icon, (route.name === 'account' || route.name === 'login') && styles.active]} name="user" />
        <Text style={[styles.iconText, (route.name === 'account' || route.name === 'login') && styles.active]}>{isAuth ? 'Account' : 'Login'}</Text>
      </TouchableOpacity>
      {/* Cart Page */}
      <TouchableOpacity 
        style={styles.menuContainer}
        onPress={() => navigation.navigate('cart')}
        >
        <AntDesign style={[styles.icon, route.name === 'cart' && styles.active]} name='shoppingcart'/>
        <Text style={[styles.iconText, route.name === 'cart' && styles.active]}>Cart</Text>
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