import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import InputBox from '../../components/Form/InputBox';
import { useDispatch, useSelector } from 'react-redux';
import { saveRegisterData, sendCheckOTP, updateProfile, verifyOtpForUpdate, updateProfilePic } from '../../redux/features/auth/userActions';
import { useReduxStateHook } from '../../hooks/customeHook';
import * as ImagePicker from "expo-image-picker";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, registerData } = useSelector((state) => state.user) || {};

  // State quản lý form nhập dữ liệu
  const [email, setEmail] = useState(user?.email || '');
  const [profilePic, setProfilePic] = useState(user.profilePic || '');

  const [name, setName] = useState(user?.name || '');
  const [address, setAddress] = useState(user?.address || '');
  const [city, setCity] = useState(user?.city || '');
  const [country, setCountry] = useState(user?.country || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // State quản lý OTP (hiển thị khi đã có registerData)
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false); // Kiểm soát hiển thị OTP

  // Lưu email, phone ban đầu để kiểm tra thay đổi
  const [initialEmail] = useState(user?.email);
  const [initialPhone] = useState(user?.phone);

  const loading = useReduxStateHook(navigation, "profile");

  // Khi có registerData, kích hoạt ô nhập OTP
  useEffect(() => {
    if (registerData) {
      setIsOtpSent(true);
    }
  }, [registerData]);

  // Object chứa dữ liệu cần cập nhật
  const formData = { email, name, address, city, phone, country };

  // Xử lý cập nhật hồ sơ (Gửi OTP nếu email/phone thay đổi)
  const handleRequestOtp = async () => {
    if (!email || !name || !address || !city || !phone) {
      return alert('Please fill all the fields');
    }
  
    const emailChanged = email !== initialEmail;
    const phoneChanged = phone !== initialPhone;
  
    if (emailChanged || phoneChanged) {
      dispatch(sendCheckOTP(email)); // Gửi OTP
      dispatch(saveRegisterData({ email, name, address, city, phone, country })); // Lưu thông tin nhưng không reset
      setIsOtpSent(true); // Hiển thị ô nhập OTP
      alert('OTP has been sent to your email.');
    } else {
      dispatch(updateProfile(formData));
      alert('Profile updated successfully');
    }
  };
  
  
  const pickImage = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })
    if (!result.canceled) {
      setSelectedPhoto(result.assets[0])
    }
  }

  useEffect(() => {
    if (selectedPhoto) {
      setProfilePic(selectedPhoto.uri);
      dispatch(updateProfilePic(selectedPhoto));
    }
  }, [selectedPhoto]);  // Xử lý xác thực OTP

  const handleVerifyOtp = async () => {
    const result = await dispatch(verifyOtpForUpdate(email, otp, formData));
    if (result.type === 'verifyOtpSuccess') {
      dispatch(updateProfile(formData)); // Cập nhật hồ sơ sau khi xác thực OTP thành công
      alert('Profile updated successfully');
      navigation.navigate("account"); // Chuyển về màn hình Account
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.imageContainer}>
        <Image 
              source={{ uri:  user.profilePic?.url || "https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png" }} 
              style={styles.image}
            />

            <TouchableOpacity onPress={pickImage} style={styles.btnUpdatePic}>
              <Text style={{ color: "red" }}>Update your profile pic</Text>
            </TouchableOpacity>
          </View>
          <InputBox value={name} setValue={setName} placeholder="Enter your name" autoComplete="name" />
          <InputBox value={email} setValue={setEmail} placeholder="Enter your email" autoComplete="email" />
          <InputBox value={address} setValue={setAddress} placeholder="Enter your address" autoComplete="address-line1" />
          <InputBox value={city} setValue={setCity} placeholder="Enter your city" autoComplete="country" />
          <InputBox value={country} setValue={setCountry} placeholder="Enter your country" autoComplete="country" />
          <InputBox value={phone} setValue={setPhone} placeholder="Enter your phone no" autoComplete="tel" />

          {/* Hiển thị ô nhập OTP sau khi gửi */}
          {isOtpSent ? (
            <>
              <InputBox 
                value={otp} 
                setValue={setOtp} 
                placeholder="Enter OTP" 
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.btnVerify} onPress={handleVerifyOtp}>
                <Text style={styles.btnVerifyText}>VERIFY OTP</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.btnUpdate} onPress={handleRequestOtp}>
              <Text style={styles.btnUpdateText}>SAVE CHANGES</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </Layout>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 100,
    width: "100%",
    resizeMode: "contain",
  },
  btnUpdate: {
    backgroundColor: '#000000',
    height: 40,
    borderRadius: 20,
    marginHorizontal: 30,
    justifyContent: 'center',
    marginTop: 10,
  },
  btnUpdateText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
  },
  btnVerify: {
    backgroundColor: '#4CAF50',
    height: 40,
    borderRadius: 20,
    marginHorizontal: 30,
    justifyContent: 'center',
    marginTop: 10,
  },
  btnVerifyText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Profile;
