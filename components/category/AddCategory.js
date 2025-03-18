// import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
// import React, { useState } from 'react';
// import axios from 'axios';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// // Danh sách icon mẫu (bạn có thể thêm nhiều hơn)
// const iconList = ["mobile1", "laptop", "desktop", "tablet1", "customerservice", "windowso"];

// const AddCategory = () => {
//     const [category, setCategory] = useState("");
//     const [selectedIcon, setSelectedIcon] = useState(null);

//     const handleSubmit = async () => {
//         if (!category || !selectedIcon) {
//             alert("Vui lòng nhập tên danh mục và chọn icon!");
//             return;
//         }

//         try {
//             const { data } = await axios.post("http://localhost:5000/api/categories", {
//                 category,
//                 icon: selectedIcon,
//             });

//             alert("Thêm danh mục thành công!");
//             setCategory("");
//             setSelectedIcon(null);
//         } catch (error) {
//             console.error("Error adding category:", error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Nhập tên danh mục"
//                 value={category}
//                 onChangeText={setCategory}
//             />

//             <Text style={styles.label}>Chọn Icon:</Text>
//             <FlatList
//                 horizontal
//                 data={iconList}
//                 keyExtractor={(item) => item}
//                 renderItem={({ item }) => (
//                     <TouchableOpacity onPress={() => setSelectedIcon(item)} style={styles.iconContainer}>
//                         <AntDesign name={item} size={30} color={selectedIcon === item ? "blue" : "black"} />
//                     </TouchableOpacity>
//                 )}
//             />

//             <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//                 <Text style={styles.buttonText}>Thêm Danh Mục</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: "#ccc",
//         padding: 10,
//         marginBottom: 10,
//         borderRadius: 5,
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: "bold",
//         marginBottom: 5,
//     },
//     iconContainer: {
//         padding: 10,
//         marginRight: 10,
//     },
//     button: {
//         marginTop: 20,
//         backgroundColor: "blue",
//         padding: 10,
//         borderRadius: 5,
//         alignItems: "center",
//     },
//     buttonText: {
//         color: "white",
//         fontWeight: "bold",
//     },
// });

// export default AddCategory;
