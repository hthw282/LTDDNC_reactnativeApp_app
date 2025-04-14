import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import InputBox from '../../components/Form/InputBox'
import { useNavigation } from '@react-navigation/native'

//redux hooks
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/features/auth/userActions'
import { useReduxStateHook } from '../../hooks/customeHook'

const Login = ({navigation}) => {
    const loginImage="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //hooks
    const dispatch = useDispatch()
    const loading =  useReduxStateHook(navigation, "home")

    //login function
    const handleLogin = () => {
        if(!email || !password) {
            return alert('Please fill all the fields')
        }
        dispatch(login(email, password))
    }
    

    return (
    <View style={styles.container}>
      <Image source={{uri: loginImage}} style={styles.image} />
      <InputBox placeholder={"Enter your email"} value={email} setValue={setEmail} autoComplete={"email"}/>
      <InputBox placeholder={"Enter your password"} value={password} setValue={setPassword} secureTextEntry={true}/>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>
        <Text>Forgot your password?{" "} <Text style={styles.link} onPress={() => navigation.navigate('forgotPassword')}>click here</Text></Text>
        <Text>Don't have an account?{" "} <Text style={styles.link} onPress={() => navigation.navigate('register')}>Register here</Text></Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        //alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    image: {
        height: 200,
        width: '100%',
        resizeMode: 'contain',
    },
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginBtn: {
        backgroundColor: '#000000',
        width: '80%',
        justifyContent: 'center',
        height: 40,
        borderRadius: 10,
        marginVertical: 20,
    },
    loginBtnText: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    link: {
        color: 'blue'
    }
});

export default Login