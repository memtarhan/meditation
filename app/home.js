import React, { useEffect, useState, useCallback, useContext } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet, TouchableOpacity, Image, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SIZES, icons } from "../constants/theme";
import Welcome from "../components/Welcome";
import DailyQuote from "../components/DailyQuote";  // Menambahkan komponen DailyQuote
import PopularMeditation from "../components/PopularMeditation";
import DailyMeditation from "../components/DailyMeditation";
import { useRouter } from "expo-router"; // Import router untuk navigasi
import { ThemeContext } from "../context/ThemeContext";

const Home = () => {
    const [userDetails, setUserDetails] = useState(null);
    const router = useRouter(); // Menggunakan router
    const { isDarkTheme } = useContext(ThemeContext);

    const loadUserDetails = useCallback(async () => {
        try {
            const user = await AsyncStorage.getItem("userDetails");
            console.log("User Details:", user);
            setUserDetails(user ? JSON.parse(user) : null);
        } catch (error) {
            console.error("Error loading user details:", error);
        }
    }, []);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
            if (isLoggedIn !== "true") {
                router.push("/login");
            } else {
                loadUserDetails();
            }
        };
        checkLoginStatus();
    }, [loadUserDetails]);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("isLoggedIn");
            router.replace("/login");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDarkTheme ? COLORS.dark : COLORS.lightWhite }]}>
            {/* App Bar */}
            <View style={[styles.appBar, { backgroundColor: isDarkTheme ? COLORS.darkGray : COLORS.white }]}>
                {/* Logo */}
                <View style={styles.titleContainer}>
                    <Image source={icons.appLogo} style={styles.logo} />
                </View>

                {/* Tombol Settings */}
                <TouchableOpacity style={styles.btnContainer} onPress={() => router.push("/settings")}>
                    <Image source={icons.settings} style={[styles.image, { tintColor: isDarkTheme ? COLORS.lightWhite : COLORS.primary }]} />
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium }} testID="screensDisplay">
                    <Welcome userDetails={userDetails} />
                    <DailyQuote />  {/* Tambahkan Daily Quote */}
                    <PopularMeditation />
                    <DailyMeditation />
                    <Button title="Logout" onPress={handleLogout} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    appBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: SIZES.medium,
        elevation: 3, // Memberikan efek bayangan untuk tampilan lebih bagus
    },
    btnContainer: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 24,
        height: 24,
    },
    logo: {
        width: 100,
        height: 30,
        resizeMode: "contain",
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default Home;