import React, { useState, useEffect } from "react";
import {
    View,
    SafeAreaView,
    Image,
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS } from "../constants";
import bcrypt from "bcryptjs"; // Library untuk hashing password

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const router = useRouter();

    // Fungsi untuk validasi email
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    // Fungsi untuk handle login
    const handleLogin = async () => {
        let validationErrors = {};
        if (!email) {
            validationErrors.email = "Please enter your email.";
        } else if (!validateEmail(email)) {
            validationErrors.email = "Please enter a valid email address.";
        }
        if (!password) {
            validationErrors.password = "Please enter your password.";
        }

        // Jika ada error validasi, tampilkan error dan berhenti
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            // Ambil data user dari AsyncStorage
            const storedUser = await AsyncStorage.getItem("userDetails");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);

                // Bandingkan email dan password
                const passwordMatch = await bcrypt.compare(password, parsedUser.password);
                if (email === parsedUser.email && passwordMatch) {
                    // Jika kredensial valid, navigasi ke home
                    await AsyncStorage.setItem("isLoggedIn", "true");
                    router.push("/home");
                } else {
                    Alert.alert("Error", "Incorrect email or password.");
                }
            } else {
                Alert.alert("Error", "No user details found. Please sign up first.");
            }
        } catch (error) {
            console.error("Error accessing AsyncStorage", error);
            Alert.alert("Error", "An error occurred while logging in.");
        }
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
            if (isLoggedIn === "true") {
                router.push("/home");
            }
        };
        checkLoginStatus();
    }, []);

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
            <View style={{ padding: 20, flex: 1 }}>
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
                >
                    <Image
                        source={icons.menu}
                        style={{ width: 50, height: 50, marginBottom: 20 }}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <View style={{ marginBottom: 20 }}>
                        <TextInput
                            style={[styles.input, errors.email && { borderColor: "red" }]}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                        <TextInput
                            style={[styles.input, errors.password && { borderColor: "red" }]}
                            value={password}
                            secureTextEntry={true}
                            onChangeText={setPassword}
                            placeholder="Password"
                        />
                        {errors.password && (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        )}
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signupContainer}>
                    <Text style={{ marginRight: 5 }}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => router.push("/signup")}>
                        <Text style={{ color: "blue" }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>MeditationApp by YudhaE Version 1.0.0</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
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
    signupContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
    },
    footer: {
        marginTop: 'auto',
        alignItems: 'center',
        padding: 10,
    },
    footerText: {
        color: COLORS.gray,
        fontSize: 12,
    },
});

export default Login;