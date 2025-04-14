import { server } from "../../store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import socket from "../../../socket/socket";

//action login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: 'loginRequest'
        })
        //hitting node login api request
        const {data} = await axios.post(`${server}/user/login`, {email, password}, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: 'loginSuccess',
            payload: data
        })

        const userId = data?.user?._id;
        if (userId) {
            socket.emit("join", userId); // Gửi sự kiện join đến server
            console.log("joined socket room", userId);
        }

        await AsyncStorage.setItem("@auth", data?.token);
    } catch(error) {
        dispatch({
            type:"loginFail",
            payload: error.response.data.message
        })
    }
}

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
        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("No token found");

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

        const token = await AsyncStorage.getItem("@auth");
        if (!token) throw new Error("Token not found");

        const { data } = await axios.get(`${server}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({ type: 'getUserDataSuccess', payload: data?.user });
    } catch (error) {
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

        const auth =await AsyncStorage.getItem("@auth")
        const user = auth ? JSON.parse(auth) : null

        if (user?._id) {
            socket.emit("leave", user?._id); // Gửi sự kiện logout đến server
            console.log("👋 Left socket room", user?._id);
        }
        //hitting node login api request
        const {data} = await axios.get(`${server}/user/logout`, 
        )

        await AsyncStorage.removeItem("@auth");

        dispatch({
            type: 'logoutSuccess',
            payload: data?.message,
        })
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

        const token = await AsyncStorage.getItem("@auth"); // Lấy token từ storage
        if (!token) throw new Error("No token found");

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
  
      const token = await AsyncStorage.getItem("@auth");
      if (!token) throw new Error("No token found");
  
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
  
