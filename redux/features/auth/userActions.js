import { server } from "../../store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import socket, { connectSocket, disconnectSocket, getSocket } from "../../../socket/socket";
import { getAuthToken } from "../../../utils/auth";
import { loadCartFromServer, setCart, syncCartAfterLogin } from "../cartActions";
import { Alert } from 'react-native';

// action login
export const login = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'loginRequest' });

            const { data } = await axios.post(`${server}/user/login`, { email, password }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            await AsyncStorage.setItem("@auth", JSON.stringify({ token: data.token, user: data.user }));

            dispatch({
                type: 'loginSuccess',
                payload: data
            });

            const userId = data?.user?._id;
            if (userId) {

                // Gọi connectSocket (nếu chưa được gọi)
                await connectSocket();
                const socket = getSocket();

                // Lắng nghe sự kiện 'connect' và emit 'join' sau khi kết nối thành công
                if (socket) {
                    socket.on('connect', () => {
                        socket.emit('join', userId);
                        console.log("✅ Joined socket room after login:", userId);
                    });

                    // Kiểm tra trạng thái kết nối ban đầu (trong trường hợp đã kết nối trước đó)
                    if (socket.connected) {
                        socket.emit('join', userId);
                        console.log("✅ Joined socket room (already connected) after login:", userId);
                    }
                } else {
                    console.log("⚠️ Socket instance not found after login.");
                }

                try {
                    await syncCartAfterLogin(userId);
                    await dispatch(loadCartFromServer(userId));
                } catch (error) {
                    Alert.alert("Cart Error", "Failed to sync your cart. Please check your connection.");
                }
            } else {
                console.log("login - userId not found");
            }
            return data.user;

        } catch (error) {
            console.error("login - Login failed:", error);
            dispatch({
                type: "loginFail",
                payload: error.response?.data?.message || "Login Failed. Please check your credentials.",
            });
            Alert.alert("Login Error", error.response?.data?.message || "Login Failed. Please check your credentials.");
            throw error;
        }
    };
};

//register action
export const register = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: 'registerRequest',
        });
        //hitapi register
        const {data} = await axios.post(`${server}/user/register`, formData, {
            headers: {
                'Content-Type':'application/json',
            },
        });
        dispatch({
            type: 'registerSuccess',
            payload:data
        });
    } catch (error) {
        console.log(error)
        dispatch({
            type: 'registerFail',
            payload: error.response.data.message
        })
    }
}
export const saveRegisterData = (data) => ({
    type: "SAVE_REGISTER_DATA",
    payload: data,
});

export const resetRegisterData = () => ({
    type: "RESET_REGISTER_DATA",
});

//send otp
export const sendOtp = (formData) => async (dispatch) => {
    try {
        dispatch({ type: "sendOtpRequest" });

        const { data } = await axios.post(`${server}/user/send-otp`, { email: formData.email }, {
            headers: { "Content-Type": "application/json" }
        });

        dispatch({ type: "sendOtpSuccess", payload: data.message });
        return Promise.resolve();
    } catch (error) {
        dispatch({ type: "sendOtpFail", payload: error.response.data.message });
        return Promise.reject(error);
    }
};

export const verifyOtp = (registerData, otp) => async (dispatch) => {
    try {
        dispatch({ type: "verifyOtpRequest" });

        // Kiểm tra dữ liệu đầu vào
        const formData = {
            email: registerData?.email, 
            otp
        };
        const token = await getAuthToken();

        const { data } = await axios.post(`${server}/user/verify-otp`, formData, {
            headers: { "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Thêm token vào headers
            }
        });

        dispatch({ type: "verifyOtpSuccess", payload: data.message });

        // Sau khi OTP được xác minh, thực hiện đăng ký
        if (registerData) {
            await dispatch(register(registerData));
        }
    } catch (error) {
        dispatch({ type: "verifyOtpFail", payload: error.response?.data?.message || "Đã xảy ra lỗi" });
    }
};

//forgot pass action
export const sendCheckOTP = (email) => async (dispatch) => {
    try {
        dispatch({ type: "sendCheckOTPRequest" });

        const { data } = await axios.post(`${server}/user/send-check-otp`, { email }, {
            headers: { "Content-Type": "application/json" }
        });

        dispatch({ type: "sendCheckOTPSuccess", payload: data.message });
        return Promise.resolve();
    } catch (error) {
        dispatch({ type: "sendCheckOTPFail", payload: error.response.data.message });
        return Promise.reject(error);
    }
};
//reset pass action
export const resetPassnVerifyOtp = (email, password, otp) => async (dispatch) => {
    try {
        dispatch({ type: "resetPasswordRequest" });

        // Kiểm tra dữ liệu đầu vào
        const formData = {
            email,
            otp
        };

        const { data } = await axios.post(`${server}/user/verify-otp`, formData, {
            headers: { "Content-Type": "application/json" }
        });

        // Sau khi OTP được xác minh, thực hiện đăng ký
        if (email) {
            dispatch(changePassword(email, password));
        }

        dispatch({ type: "resetPasswordSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "resetPasswordFail", payload: error.response?.data?.message || "Đã xảy ra lỗi" });
    }
};
//change password action
export const changePassword = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: 'changePasswordRequest',
        });
        const formData = {
            email,
            newPassword: password
        };
        //hitapi register
        const {data} = await axios.post(`${server}/user/reset-password`, formData, {
            headers: {
                'Content-Type':'application/json',
            },
        });
        dispatch({
            type: 'changePasswordSuccess',
            payload:data.message
        });
    } catch (error) {
        console.log(error)
        dispatch({
            type: 'changePasswordFail',
            payload: error.response.data.message
        })
    }
}
//get user data action
export const getUserData = () => async (dispatch) => {
    try {
        dispatch({ type: 'getUserDataRequest' });

        const token = await getAuthToken();
        console.log("Token being sent:", token); 

        const { data } = await axios.get(`${server}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({ type: 'getUserDataSuccess', payload: data?.user });
    } catch (error) {
        if (error.response?.status === 401 && error.response?.data?.message === 'TokenExpiredError') {
            await AsyncStorage.removeItem('@auth');
            dispatch(logout()); // Dispatch action logout
            // Chuyển hướng đến trang đăng nhập (bạn có thể dùng navigation ở đây nếu có)
            // Ví dụ: navigation.navigate('login'); // Nếu bạn có thể truy cập navigation
            alert('Your session has expired. Please log in again.'); // Thông báo cho người dùng
        }
        dispatch({
            type: "getUserDataFail",
            payload: error.response?.data?.message || "Error fetching user data"
        });
    }
};


//logout action
export const logout = () => async (dispatch) => {
    try {
        dispatch({
            type: 'logoutRequest'
        })
        //hitting node login api request
        const {data} = await axios.get(`${server}/user/logout`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${await getAuthToken()}` // Gửi token trong headers
            }
        }
        )
        const authData = await AsyncStorage.getItem("@auth");
        const { user } = JSON.parse(authData);
        if (user?._id) {
            const socket = getSocket();
            if (socket && socket.connected) {
                socket.emit("leave", user?._id); // Gửi sự kiện leave đến server nếu cần
                console.log("👋 Left socket room", user?._id);
            }
        }
        
        await AsyncStorage.removeItem("@auth");
        dispatch({
            type: 'logoutSuccess',
            payload: data?.message,
        })
        disconnectSocket();
        console.log("❌ Socket disconnected after logout");
    } catch(error) {
        dispatch({
            type:"logoutFail",
            payload: error.response.data.message
        })
    }
}


  
  
export const verifyOtpForUpdate = (email, otp, updatedData) => async (dispatch) => {
    try {
        dispatch({ type: "verifyOtpRequest" });

        const { data } = await axios.post(`${server}/user/verify-otp`, { email, otp }, {
            headers: { "Content-Type": "application/json" }
        });

        dispatch({ type: "verifyOtpSuccess", payload: data.message });

        // Nếu xác minh thành công, cập nhật thông tin người dùng
        dispatch(updateProfile(updatedData));
    } catch (error) {
        dispatch({ type: "verifyOtpFail", payload: error.response?.data?.message || "Đã xảy ra lỗi" });
    }
};

export const updateProfile = (formData) => async (dispatch, getState) => {
    try {
        dispatch({ type: "updateProfileRequest" });

        const token = await getAuthToken();

        const { data } = await axios.put(`${server}/user/update-profile`, formData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Gửi token trong headers
            },
        });

        dispatch({ type: "updateProfileSuccess", payload: data });
    } catch (error) {
        dispatch({
            type: "updateProfileFail",
            payload: error.response?.data?.message || "Update profile failed",
        });
    }
};
export const updateProfilePic = (photo) => async (dispatch) => {
    try {
      dispatch({ type: "updateProfilePicRequest" });
  
      const token = await getAuthToken();
  
      const formData = new FormData();
      formData.append("photo", {
        uri: photo.uri,
        type: photo.type || "image/jpeg",
        name: photo.fileName || "profile.jpg",
      });
  
      const { data } = await axios.put(`${server}/user/update-picture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
  
      dispatch({ type: "updateProfilePicSuccess", payload: data.profilePic });
    } catch (error) {
        console.error("Error updating profile picture:", error.response?.data || error.message);
        dispatch({
          type: "updateProfilePicFail",
          payload: error.response?.data?.message || "Profile picture update failed",
        });
    }
};
  
