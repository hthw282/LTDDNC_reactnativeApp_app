import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { saveRegisterData, sendCheckOTP, updateProfile, verifyOtpForUpdate, updateProfilePic } from '../../redux/features/auth/userActions';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import InputBox from '../../components/Form/InputBox';

const Profile = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { user, registerData } = useSelector((state) => state.user) || {};

    // State for form input
    const [email, setEmail] = useState(user?.email || '');
    const [name, setName] = useState(user?.name || '');
    const [address, setAddress] = useState(user?.address || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [profilePic, setProfilePic] = useState(user.profilePic?.url || "https://via.placeholder.com/100"); //ADDED .url

    // State for OTP
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);

    // Keep track of initial email/phone for change detection
    const [initialEmail] = useState(user?.email);
    const [initialPhone] = useState(user?.phone);

    // Object for form data
    const formData = { email, name, address, city, phone, country };

    // Handle image picking
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            setSelectedPhoto({ uri: result.assets[0].uri }); // Corrected line
        }
    };

    // Update profile pic
    useEffect(() => {
        if (selectedPhoto) {
            setProfilePic(selectedPhoto.uri);
            dispatch(updateProfilePic(selectedPhoto));
        }
    }, [selectedPhoto, dispatch]);

    // Handle OTP sending
    const handleRequestOtp = async () => {
        if (!email || !name || !address || !city || !phone) {
            return alert('Please fill all the fields');
        }

        const emailChanged = email !== initialEmail;
        const phoneChanged = phone !== initialPhone;

        if (emailChanged || phoneChanged) {
            dispatch(sendCheckOTP(email));
            dispatch(saveRegisterData({ email, name, address, city, phone, country }));
            setIsOtpSent(true);
            alert('OTP has been sent to your email.');
        } else {
            dispatch(updateProfile(formData));
            alert('Profile updated successfully');
        }
    };

    // Handle OTP verification
    const handleVerifyOtp = async () => {
        const result = await dispatch(verifyOtpForUpdate(email, otp, formData));
        if (result.type === 'verifyOtpSuccess') {
            dispatch(updateProfile(formData));
            alert('Profile updated successfully');
            navigation.navigate('account');
        } else {
            alert('Invalid OTP. Please try again.');
        }
    };

    // Show OTP input when OTP is sent
    useEffect(() => {
        if (registerData) {
            setIsOtpSent(true);
        }
    }, [registerData]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
                    <Image
                        source={{ uri: selectedPhoto?.uri || profilePic || "https://via.placeholder.com/100" }} //ADDED selectedPhoto?.uri
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <Text style={styles.updatePicText}>Update Picture</Text>
                </TouchableOpacity>

                <View style={styles.formContainer}>
                    <InputBox
                        value={name}
                        setValue={setName}
                        placeholder="Name"
                        autoCapitalize="words"
                        style={styles.input}
                    />
                    <InputBox
                        value={email}
                        setValue={setEmail}
                        placeholder="Email"
                        keyboardType="email-address"
                        style={styles.input}
                    />
                    <InputBox
                        value={address}
                        setValue={setAddress}
                        placeholder="Address"
                        autoCapitalize="words"
                        style={styles.input}
                    />
                    <InputBox
                        value={city}
                        setValue={setCity}
                        placeholder="City"
                        autoCapitalize="words"
                        style={styles.input}
                    />
                    <InputBox
                        value={country}
                        setValue={setCountry}
                        placeholder="Country"
                        autoCapitalize="words"
                        style={styles.input}
                    />
                    <InputBox
                        value={phone}
                        setValue={setPhone}
                        placeholder="Phone"
                        keyboardType="phone-pad"
                        style={styles.input}
                    />

                    {isOtpSent ? (
                        <>
                            <InputBox
                                value={otp}
                                setValue={setOtp}
                                placeholder="Enter OTP"
                                keyboardType="numeric"
                                style={styles.input}
                            />
                            <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
                                <Text style={styles.buttonText}>Verify OTP</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={handleRequestOtp}>
                            <Text style={styles.buttonText}>Save Changes</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    profileContainer: {
        alignItems: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#e0e0e0',
        marginBottom: 10,
    },
    updatePicText: {
        color: '#3498db',
        fontSize: 16,
    },
    formContainer: {
        width: '100%',
    },
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Profile;
