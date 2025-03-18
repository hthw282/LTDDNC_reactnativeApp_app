import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import InputBox from '../../components/Form/InputBox'
import { useNavigation } from '@react-navigation/native'

//redux hooks
import { useDispatch, useSelector } from 'react-redux'
import { resetPassnVerifyOtp, resetRegisterData } from '../../redux/features/auth/userActions'
import { useReduxStateHook } from '../../hooks/customeHook'

const ResetPassword = ({navigation}) => {
    const loginImage="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
    const data = useSelector((state) => state.user.registerData);
    const email = data?.email || ''

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [otp, setOtp] = useState('');

    //hooks
    const dispatch = useDispatch()
    const loading =  useReduxStateHook(navigation, "login")

    //login function
    const handleResetPassword = () => {
        if(!confirmPassword || !password || !otp) {
            return alert('Please fill all the fields')
        }
        if (password.length < 6) {
            return alert('Password must be at least 6 characters');
        }
        if (password !== confirmPassword) {
            return alert('Passwords do not match!');
        }    
        dispatch(resetPassnVerifyOtp(email, password, otp))
        dispatch(resetRegisterData());
    }

    return (
    <View style={styles.container}>
      <Image source={{uri: loginImage}} style={styles.image} />
      <InputBox placeholder={"Enter your password"} value={password} setValue={setPassword} secureTextEntry={true}/>
      <InputBox placeholder={"Confirm your password"} value={confirmPassword} setValue={setConfirmPassword} secureTextEntry={true}/>
      <InputBox placeholder={"Enter OTP"} value={otp} setValue={setOtp} />
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleResetPassword}>
            <Text style={styles.loginBtnText}>{loading ? 'Verifying...' : 'Save Change'}</Text>
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

export default ResetPassword