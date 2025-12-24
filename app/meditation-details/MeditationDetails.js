import React, { useEffect, useState } from "react";
import { View, Text, Image, Share, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import { icons } from "../../constants/icons"; // Pastikan ini benar

const MeditationDetails = ({ route }) => {
    const { id, title, duration, image } = route.params;
    const navigation = useNavigation();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        checkFavorite();
    }, []);

    // Fungsi untuk mengecek apakah item sudah ada di Favorites
    const checkFavorite = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem("favorites");
            const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
            setIsFavorite(favorites.some(item => item.id === id));
        } catch (error) {
            console.error("Error checking favorite:", error);
        }
    };

    const addFavorite = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem("favorites");
            const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

            const newFavorites = [...favorites, { id, name: title, image }];
            await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
            setIsFavorite(true);
        } catch (error) {
            console.error("Error adding favorite:", error);
        }
    };

    // Fungsi untuk menambahkan atau menghapus dari Favorites
    const toggleFavorite = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem("favorites");
            let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

            if (isFavorite) {
                // Hapus dari favorit
                favorites = favorites.filter((item) => item.id !== id);
                Alert.alert("Removed", `"${title}" has been removed from favorites.`);
            } else {
                // Tambahkan ke favorit
                favorites.push({ id, title, duration, image });
                Alert.alert("Added", `"${title}" has been added to favorites.`);
            }

            await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error("Error updating favorites:", error);
        }
    };

    const onShare = async () => {
        try {
            await Share.share({
                message: `Coba sesi meditasi "${title}" selama ${duration}! 🌿`,
            });
        } catch (error) {
            console.error("Gagal berbagi sesi:", error);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: () => (
                <Image
                    source={icons.appLogo}
                    style={{ width: 100, height: 30, resizeMode: "contain" }}
                />
            ),
            headerLeft: () => (
                <ScreenHeaderBtn
                    iconUrl={icons.back}
                    handlePress={() => navigation.goBack()}
                    customStyle={{ marginLeft: 10 }}
                />
            ),
            headerRight: () => (
                <>
                    <ScreenHeaderBtn
                        iconUrl={isFavorite ? icons.heartFilled : icons.heart}
                        handlePress={toggleFavorite}
                        customStyle={{ marginRight: 10 }}
                    />
                    <ScreenHeaderBtn
                        iconUrl={icons.share}
                        handlePress={onShare}
                        customStyle={{ marginRight: 10 }}
                    />
                </>
            ),
        });
    }, [navigation, isFavorite]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            {/* App Bar */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: SIZES.medium }}>
                <ScreenHeaderBtn iconUrl={icons?.appLogo} handlePress={() => console.log("Logo Pressed")} />
                {/* Tambahkan navigasi ke Settings */}
                <ScreenHeaderBtn iconUrl={icons?.settings} handlePress={() => route.push("/settings")} />
            </View>

            {/* Main Content */}
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>{title}</Text>
                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                <Text style={{ marginTop: 10 }}>Durasi: {duration}</Text>

                <TouchableOpacity
                    onPress={addFavorite}
                    style={{
                        backgroundColor: isFavorite ? "gray" : "blue",
                        padding: 10,
                        borderRadius: 5,
                        marginTop: 20,
                    }}
                >
                    <Text style={{ color: "white" }}>
                        {isFavorite ? "Favorited" : "Add to Favorites"}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default MeditationDetails;
