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
            <Text style={styles.title}>Financial Overview</Text>

            <View style={styles.box}>
                <Text style={styles.label}>Total orders:</Text>
                <Text style={styles.value}>{totalOrders || "Loading..."}</Text>
            </View>

            <View style={styles.box}>
                <Text style={styles.label}>Total amount spent:</Text>
                <Text style={styles.value}>{totalSpent?.toLocaleString()} ₫</Text>
            </View>

            <Text style={styles.subTitle}>Statistics by status:</Text>
            {byStatus && Object.entries(byStatus).map(([status, data]) => (
              <View key={status} style={styles.statusBox}>
                <Text style={styles.statusTitle}>{status.toUpperCase()}</Text>
                <Text>Num of orders: {data.count}</Text>
                <Text>Total: {data.totalAmount?.toLocaleString()} VNĐ</Text>
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
      color: "#3498db",
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
      backgroundColor: "#CCFFFF",
      padding: 15,
      marginBottom: 10,
      borderRadius: 10,
    },
    statusTitle: {
      fontWeight: "bold",
      marginBottom: 5,
      color: "#3498db",
    },
  });

export default FinancialSummary;