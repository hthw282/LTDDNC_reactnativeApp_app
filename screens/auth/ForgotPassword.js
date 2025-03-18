import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import InputBox from '../../components/Form/InputBox'
import { useNavigation } from '@react-navigation/native'

//redux hooks
import { useDispatch, useSelector } from 'react-redux'
import { sendCheckOTP, saveRegisterData } from '../../redux/features/auth/userActions'
import { useReduxStateHook } from '../../hooks/customeHook'

const ForgotPassword = ({navigation}) => {
    const loginImage="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
    const [email, setEmail] = useState('')

    //hooks
    const dispatch = useDispatch()
    const loading =  useReduxStateHook(navigation, "resetPassword")

    //login function
    const handleForgotPassword = () => {
        if(!email ) {
            return alert('Please fill all the fields')
        }
        const formData = { email };
        // Lưu thông tin vào Redux trước khi gửi OTP
        dispatch(saveRegisterData(formData));

        dispatch(sendCheckOTP(email))
    }

    return (
    <View style={styles.container}>
      <Image source={{uri: loginImage}} style={styles.image} />
      <InputBox placeholder={"Enter your email"} value={email} setValue={setEmail} autoComplete={"email"}/>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleForgotPassword}>
            <Text style={styles.loginBtnText}>Send</Text>
        </TouchableOpacity>
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

export default ForgotPassword