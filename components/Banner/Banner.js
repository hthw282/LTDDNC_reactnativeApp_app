import React, { useEffect } from 'react';
import {
    StyleSheet, View, Text, Image, Dimensions,
    Pressable,
} from 'react-native';
import Carousel, { PaginationLight } from 'react-native-x-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBanners } from '../../redux/features/bannerActions';

const { width } = Dimensions.get('window');

const Banner = () => {
    const { banners, loading, error } = useSelector((state) => state.banner); // Lấy state banners từ reducer
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBanners()); // Dispatch action để lấy tất cả banners khi component mount
    }, [dispatch]);

    const renderItem = (data) => (
        <View
            key={data?.image?.url || data?._id?.toString()} // Sử dụng một key duy nhất từ dữ liệu API
            style={styles.cardContainer}
        >
            <Pressable onPress={() => alert(data?._id)}>
                <View
                    style={styles.cardWrapper}
                >
                    <Image
                        style={styles.card}
                        source={{ uri: data?.image?.url }} // Sử dụng URL ảnh từ API
                    />
                    <View
                        style={[
                            styles.cornerLabel,
                            { backgroundColor: data?.connerLabelColor }, // Sử dụng màu từ API
                        ]}
                    >
                        <Text style={styles.cornerLabelText}>
                            { data?.cornerLabelText } {/* Sử dụng text từ API */}
                        </Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );

    if (loading) {
        return <Text>Loading banners...</Text>; // Hiển thị loading state
    }

    if (error) {
        return <Text>Error loading banners: {error}</Text>; // Hiển thị lỗi nếu có
    }

    return (
        <View style={styles.container}>
            <Carousel
                pagination={PaginationLight}
                renderItem={renderItem}
                data={banners} // Sử dụng dữ liệu banners từ Redux state
                loop
                autoplay
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width,
    },
    cardWrapper: {
    //    borderRadius: 8,
        overflow: 'hidden',
    },
    card: {
        width: width * 1,
        height: width * 0.5,
    },
    cornerLabel: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderTopLeftRadius: 8,
    },
    cornerLabelText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '600',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 2,
    },
});

export default Banner;