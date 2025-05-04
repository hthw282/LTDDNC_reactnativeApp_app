import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const ProtectedScreen = ({ component: Component, ...props }) => {
    const { isAuth } = useSelector(state => state.user);
    const navigation = useNavigation();

    useEffect(() => {
        if (!isAuth) {
            navigation.replace('login');
        }
    }, [isAuth, navigation]);

    return isAuth ? <Component {...props} /> : null;
};

export default ProtectedScreen;