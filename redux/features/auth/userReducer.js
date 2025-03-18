import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  registerData: null, // Thêm trạng thái lưu dữ liệu đăng ký
};

export const userReducer = createReducer(initialState, (builder) => {
  // LOGIN CASE
  builder.addCase("loginRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("loginSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
    state.isAuth = true;
    state.token = action.payload.token;
    state.user = action.payload.user; // ✅ Lưu thông tin user vào Redux
  });
  builder.addCase("loginFail", (state, action) => {
    state.isAuth = false;
    state.error = action.payload;
  });

  // ERROR MESSAGE CASE
  builder.addCase("clearError", (state) => {
    state.error = null;
  });
  builder.addCase("clearMessage", (state) => {
    state.message = null;
  });

  // REGISTER
  builder.addCase("registerRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("registerSuccess", (state, action) => {
    state.loading = false;
    //state.isAuth = true;
    //state.token = null;  
    state.message = action.payload.message;
  });
  builder.addCase("registerFail", (state, action) => {
    state.loading = false;
    //state.isAuth = false;
    state.error = action.payload;
  });

  // SEND OTP
  builder.addCase("sendOtpRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("sendOtpSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload;
  });
  builder.addCase("sendOtpFail", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  // VERIFY OTP
  builder.addCase("verifyOtpRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("verifyOtpSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload;
  });
  builder.addCase("verifyOtpFail", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  ///SEND CHECK OTP (FORGOTPASSWORD+UPDATEPHONE)
  builder.addCase("sendCheckOTPRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("sendCheckOTPSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload
  });
  builder.addCase("sendCheckOTPFail", (state, action) => {
    state.loading = false;
    state.error = action.payload
  });
  
  //RESET PASSWORD
  builder.addCase("resetPasswordRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("resetPasswordSuccess", (state, action) => {
    state.loading = false;
    //state.token = null;  
    state.message = action.payload
  });
  builder.addCase("resetPasswordFail", (state, action) => {
    state.loading = false;
    state.error = action.payload
  });

  //CHANGE PASSWORD
  builder.addCase("changePasswordRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("changePasswordSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload
  });
  builder.addCase("changePasswordFail", (state, action) => {
    state.loading = false;
    state.error = action.payload
  });

  // GET USER DATA
  builder.addCase("getUserDataRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("getUserDataSuccess", (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
  });
  builder.addCase("getUserDataFail", (state, action) => {
      state.isAuth = false;
      state.error = action.payload;
  });

  //UPDATE USER DATA
  builder.addCase("updateProfileRequest", (state) => {
      state.loading = true;
  });
  builder.addCase("updateProfileSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload; // Cập nhật thông tin người dùng
  });
  builder.addCase("updateProfileFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
  });
  //UPDATE PROFILE PIC
  builder.addCase("updateProfilePicRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("updateProfilePicSuccess", (state, action) => {
    state.loading = false;
    state.user.profilePic = action.payload;
  });
  builder.addCase("updateProfilePicFail", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  // LOGOUT
  builder.addCase("logoutRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("logoutSuccess", (state, action) => {
    state.loading = false;
    state.isAuth = false;
    state.user = null;
    //state.token = null;
    //state.registerData = null;
    state.message = action.payload;
  });  
  builder.addCase("logoutFail", (state, action) => {
    state.isAuth = false;
    state.error = action.payload;
  });

  // SAVE REGISTER DATA (Lưu thông tin đăng ký vào Redux)
  builder.addCase("SAVE_REGISTER_DATA", (state, action) => {
    state.registerData = action.payload;
  });

  // RESET REGISTER DATA (Xóa dữ liệu đăng ký sau khi xác thực OTP)
  builder.addCase("RESET_REGISTER_DATA", (state) => {
    state.registerData = null;
  });
});
