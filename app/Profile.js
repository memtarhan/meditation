import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, SafeAreaView } from "react-native";
import { COLORS, FONT, SIZES } from "../constants";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [newName, setNewName] = useState("");
    const router = useRouter();

    useEffect(() => {
        const loadUserDetails = async () => {
            const user = await AsyncStorage.getItem("userDetails");
            if (user) {
                const parsedUser = JSON.parse(user);
                setUserDetails(parsedUser);
                setNewName(parsedUser.userName);
            }
        };
        loadUserDetails();
    }, []);

    const handleSave = async () => {
        if (!newName.trim()) return;

        const updatedUser = { ...userDetails, userName: newName };
        await AsyncStorage.setItem("userDetails", JSON.stringify(updatedUser));
        setUserDetails(updatedUser);
        router.push({
            pathname: "/home",
            params: { refresh: true }
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, padding: SIZES.medium }}>
            {/* App Bar */}
            <ScreenHeaderBtn isAppBar={true} title="My Profile" />

            <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.xLarge, color: COLORS.primary }}>
                Profile
            </Text>

            {userDetails ? (
                <>
                    <Text style={{ fontFamily: FONT.regular, fontSize: SIZES.medium, marginTop: 10 }}>
                        Username:
                    </Text>
                    <TextInput
                        style={{
                            borderBottomWidth: 1,
                            borderColor: COLORS.primary,
                            fontSize: SIZES.medium,
                            paddingVertical: 5,
                        }}
                        value={newName}
                        onChangeText={setNewName}
                    />
                    <Button title="Save" onPress={handleSave} />
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </SafeAreaView>
    );
};

export default Profile;