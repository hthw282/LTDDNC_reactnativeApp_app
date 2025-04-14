import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Layout from '../../components/Layout/Layout'
import { userData } from '../../data/userData'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const Account = ({navigation}) => {
    const {user} = useSelector((state) => state.user)
    return (
    <Layout>
      <View style={styles.container}>
        <Image source={{uri:user.profilePic?.url}} style={styles.image}/>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.name}>Hi {' '}
            <Text style={{color: 'green'}}>{user ? user.name: 'User '}</Text>
             👋</Text>
          <Text>Email: {user ? user.email : 'N/A'}</Text>
          <Text>Contact Number: {user ? user.phone : 'N/A'}</Text>
        </View>
        <View style={styles.btnContainer}>
            <Text style={styles.heading}>Account Setting</Text>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('profile', {id: user._id})}>
                <AntDesign style={styles.btnText} name="edit"/>
                <Text style={styles.btnText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('my-orders', {id: user._id})}>
                <AntDesign style={styles.btnText} name="bars"/>
                <Text style={styles.btnText}>My Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('financial-summary', {id: user._id})}>
                <AntDesign style={styles.btnText} name="bars"/>
                <Text style={styles.btnText}>Financial Summary</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('notifications')}>
                <AntDesign style={styles.btnText} name="bells"/>
                <Text style={styles.btnText}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('admin-panel')}>
                <AntDesign style={styles.btnText} name="windows"/>
                <Text style={styles.btnText}>Admin Panel</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    image: {
        height: 100,
        width: "100%",
        resizeMode: 'contain',
    },
    name: {
        marginTop: 10,
        fontSize: 20,
    },
    btnContainer: {
        padding: 10,
        backgroundColor: '#ffffff',
        margin: 10,
        marginVertical: 20,
        elevation: 5,
        borderRadius: 10,
        paddingBottom: 30,
    },
    heading: {
        fontSize: 20,
        textAlign: 'center',
        paddingBottom: 10,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
    },
    btn:{
        flexDirection: 'row',
        alignContent: 'center',
        marginVertical: 10,
        padding: 5,
    },
    btnText:{
        fontSize: 15,
        marginRight: 10,
    }
})

export default Account