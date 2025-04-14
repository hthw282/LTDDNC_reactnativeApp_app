import { Text, StyleSheet, ScrollView, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFinancialSummaryByUser } from "../../redux/features/orderActions";

const FinancialSummary = ({ route }) => {
    const dispatch = useDispatch();
    const { id: userId } = route.params;

    const { totalOrders, totalSpent, byStatus, loading, error } = useSelector((state) => state.order);

    useEffect(() => {
        if (userId) {
            dispatch(getFinancialSummaryByUser(userId));
        }
    }, [dispatch, userId]);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Tổng quan tài chính</Text>

            <View style={styles.box}>
                <Text style={styles.label}>Tổng số đơn hàng:</Text>
                <Text style={styles.value}>{totalOrders || "Đang tải..."}</Text>
            </View>

            <View style={styles.box}>
                <Text style={styles.label}>Tổng số tiền đã chi:</Text>
                <Text style={styles.value}>{totalSpent?.toLocaleString()} ₫</Text>
            </View>

            <Text style={styles.subTitle}>Thống kê theo trạng thái:</Text>
            {byStatus && Object.entries(byStatus).map(([status, data]) => (
              <View key={status} style={styles.statusBox}>
                <Text style={styles.statusTitle}>{status.toUpperCase()}</Text>
                <Text>Số đơn: {data.count}</Text>
                <Text>Tổng tiền: {data.totalAmount?.toLocaleString()} ₫</Text>
              </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: "#fff",
      flex: 1,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 20,
      color: "#00a86b",
    },
    subTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 30,
      marginBottom: 10,
    },
    box: {
      marginBottom: 15,
      backgroundColor: "#f1f1f1",
      padding: 15,
      borderRadius: 10,
    },
    label: {
      fontSize: 16,
    },
    value: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 5,
    },
    statusBox: {
      backgroundColor: "#e6f5ea",
      padding: 15,
      marginBottom: 10,
      borderRadius: 10,
    },
    statusTitle: {
      fontWeight: "bold",
      marginBottom: 5,
      color: "#007e4f",
    },
  });

export default FinancialSummary;