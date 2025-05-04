import { server } from "../store";
import axios from "axios";
import { getAuthToken } from "../../utils/auth";

// create banner
export const createBanner = (bannerData) => async (dispatch) => {
    try {
        dispatch({ type: 'createBannerRequest' });

        const token = await getAuthToken();

        const formData = new FormData();
        formData.append('connerLabelColor', bannerData.connerLabelColor);
        formData.append('cornerLabelText', bannerData.cornerLabelText);
        formData.append('image', bannerData.image); // Gửi file ảnh

        const { data } = await axios.post(`${server}/banner/create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Quan trọng khi gửi file
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'createBannerSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "createBannerFail",
            payload: error.response?.data?.message || "Error creating banner"
        });
    }
};

// get all banners
export const getAllBanners = () => async (dispatch) => {
    try {
        dispatch({ type: 'getAllBannersRequest' });

        const { data } = await axios.get(`${server}/banner/get-all`); // Không cần token cho việc lấy tất cả banner (dựa trên routes)
        dispatch({ type: 'getAllBannersSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "getAllBannersFail",
            payload: error.response?.data?.message || "Error fetching banners"
        });
    }
};

// delete banner
export const deleteBanner = (bannerId) => async (dispatch) => {
    try {
        dispatch({ type: 'deleteBannerRequest' });

        const token = await getAuthToken();

        const { data } = await axios.delete(`${server}/banner/delete/${bannerId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'deleteBannerSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "deleteBannerFail",
            payload: error.response?.data?.message || "Error deleting banner"
        });
    }
};

// update banner
export const updateBanner = (bannerId, bannerData) => async (dispatch) => {
    try {
        dispatch({ type: 'updateBannerRequest' });

        const token = await getAuthToken();

        const formData = new FormData();
        if (bannerData.connerLabelColor) {
            formData.append('connerLabelColor', bannerData.connerLabelColor);
        }
        if (bannerData.cornerLabelText) {
            formData.append('cornerLabelText', bannerData.cornerLabelText);
        }
        if (bannerData.image) {
            formData.append('image', bannerData.image); // Gửi file ảnh nếu có cập nhật
        }

        const { data } = await axios.put(`${server}/banner/update/${bannerId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Quan trọng khi gửi file
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: 'updateBannerSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: "updateBannerFail",
            payload: error.response?.data?.message || "Error updating banner"
        });
    }
};