import React, { useState } from "react";
import {
    View,
    SafeAreaView,
    Image,
    Alert,
    TextInput,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    Modal,
    Button
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS } from "../constants";
import bcrypt from "bcryptjs"; // Library untuk hashing password

const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRouter();

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleRegister = async () => {
        let validationErrors = {};
        if (!userName) {
            validationErrors.userName = "Please enter your username.";
        }
        if (!email) {
            validationErrors.email = "Please enter your email.";
        } else if (!validateEmail(email)) {
            validationErrors.email = "Please enter a valid email address.";
        }
        if (!password) {
            validationErrors.password = "Please enter your password.";
        } else if (password.length < 6) {
            validationErrors.password = "Password must be at least 6 characters.";
        }
        if (password !== confirmPassword) {
            validationErrors.confirmPassword = "Passwords do not match.";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        try {
            const hashedPassword = await bcrypt.hash(password, 10); // Hash password
            const userDetails = { userName, email, password: hashedPassword, token: "sample-token" };
            await AsyncStorage.setItem("userDetails", JSON.stringify(userDetails));
            setLoading(false);
            console.log("User registered:", userDetails);
            setModalVisible(true);
        } catch (error) {
            setLoading(false);
            console.error("Error saving user details", error);
            Alert.alert("Error", "An error occurred while registering.");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => <></>,
                    headerTitle: "",
                }}
            />
            <View style={{ padding: 20 }} testID="signupContainer">
                <View
                    style={{
                        padding: 20,
                        marginLeft: "auto",
                        marginRight: "auto",
                        backgroundColor: "#f0f0f0",
                        borderRadius: 50,
                        height: 90,
                        ...SHADOWS.medium,
                        shadowColor: COLORS.white,
                    }}
                    testID="imageIcon"
                >
                    <Image source={icons.menu} style={{ width: 50, height: 50 }} />
                </View>
                <View style={{ marginTop: 30 }} testID="formData">
                    <View style={{ marginBottom: 10 }} testID="userName">
                        <TextInput
                            style={[
                                styles.input,
                                errors.userName && { borderColor: "red" }
                            ]}
                            value={userName}
                            onChangeText={setUserName}
                            placeholder="UserName"
                        />
                        {errors.userName && <Text style={styles.errorText}>{errors.userName}</Text>}
                    </View>
                    <View style={{ marginBottom: 10 }} testID="email">
                        <TextInput
                            style={[
                                styles.input,
                                errors.email && { borderColor: "red" }
                            ]}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email"
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    </View>
                    <View style={{ marginBottom: 10 }} testID="password">
                        <TextInput
                            style={[
                                styles.input,
                                errors.password && { borderColor: "red" }
                            ]}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            placeholder="Password"
                        />
                        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                    </View>
                    <View style={{ marginBottom: 20 }} testID="confirmPassword">
                        <TextInput
                            style={[
                                styles.input,
                                errors.confirmPassword && { borderColor: "red" }
                            ]}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={true}
                            placeholder="Confirm Password"
                        />
                        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleRegister}
                        disabled={loading}
                        testID="handleRegister"
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Sign Up</Text>
                        )}
                    </TouchableOpacity>
                </View>
                <View
                    style={styles.loginContainer}
                    testID="textData"
                >
                    <Text style={{ marginRight: 5 }}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => router.push("/login")}>
                        <Text style={{ color: "blue" }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modal untuk menampilkan informasi signup berhasil */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Signup Successful!</Text>
                        <Text style={styles.modalMessage}>You have successfully signed up.</Text>
                        <Button title="Go to Login" onPress={() => {
                            setModalVisible(false);
                            router.replace("/login");
                        }} />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: -10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
    },
});

export default SignUp;