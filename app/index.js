import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkLoginState = useCallback(async () => {
        try {
            const user = await AsyncStorage.getItem("userDetails");
            setIsLoggedIn(!!user); // Jika user ada, maka true, jika tidak, false
        } catch (error) {
            console.error("Error checking login state:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        checkLoginState();
    }, [checkLoginState]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#6200EE" />
            </View>
        );
    }

    return <Redirect href={isLoggedIn ? "/home" : "/login"} />;
}
