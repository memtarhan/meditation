import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SIZES, icons } from "../constants";

const ScreenHeaderBtn = ({ isAppBar = false, title }) => {
    const router = useRouter();

    if (isAppBar) {
        return (
            <View style={styles.appBar}>
                {/* Tombol Back */}
                <TouchableOpacity style={styles.btnContainer} onPress={() => router.back()}>
                    <Image source={icons.left} style={styles.image} />
                </TouchableOpacity>

                {/* Logo */}
                <TouchableOpacity style={styles.titleContainer} onPress={() => router.push("/home")}>
                    <Image source={icons.logo} style={styles.logo} />
                    {title && <Text style={styles.title}>{title}</Text>}
                </TouchableOpacity>

                {/* Tombol Settings */}
                <TouchableOpacity style={styles.btnContainer} onPress={() => router.push("/settings")}>
                    <Image source={icons.settings} style={styles.image} />
                </TouchableOpacity>
            </View>
        );
    }

    return null;
};

const styles = StyleSheet.create({
    appBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.white,
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
        tintColor: COLORS.primary, // Warna ikon
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
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.dark,
        marginLeft: 2,
    },
});

export default ScreenHeaderBtn;