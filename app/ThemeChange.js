import React, { useContext } from "react";
import { View, Text, Switch, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SIZES, FONT } from "../constants";
import { ThemeContext } from "../context/ThemeContext";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";

const ThemeChange = () => {
    const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: isDarkTheme ? COLORS.dark : COLORS.lightWhite }}>
            {/* App Bar */}
            <ScreenHeaderBtn isAppBar={true} title="My Profile" />

            <View style={{ padding: SIZES.medium }}>
                <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.large, color: isDarkTheme ? COLORS.lightWhite : COLORS.primary }}>
                    Change Theme
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: SIZES.medium }}>
                    <Text style={{ fontFamily: FONT.regular, fontSize: SIZES.medium, color: isDarkTheme ? COLORS.lightWhite : COLORS.primary }}>
                        Dark Theme
                    </Text>
                    <Switch
                        value={isDarkTheme}
                        onValueChange={toggleTheme}
                        thumbColor={isDarkTheme ? COLORS.primary : COLORS.lightWhite}
                        trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
                        style={{ marginLeft: SIZES.small }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ThemeChange;