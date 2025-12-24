import React, { useEffect, useState, useContext } from "react";
import { Image, SafeAreaView, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { COLORS, FONT, icons, SHADOWS, SIZES } from "../constants";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";
import { ThemeContext } from "../context/ThemeContext";

const Settings = () => {
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);

  const settings = [
    {
      id: 1,
      title: "Change Themes",
      icon: icons.settings,
      route: "/ThemeChange",
    },
    {
      id: 2,
      title: "My Favourites",
      icon: icons.heart,
      route: "/Favourites",
    },
    {
      id: 3,
      title: "Daily Reminders",
      icon: icons.clock,
      route: "/DailyReminders",
    },
    {
      id: 4,
      title: "Profile",
      icon: icons.share,
      route: "/Profile",
    },
  ];

  const loadUserDetails = async () => {
    const user = await AsyncStorage.getItem("userDetails");
    setUserDetails(user ? JSON.parse(user) : null);
  };

  useEffect(() => {
    loadUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("isLoggedIn");
      router.replace("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkTheme ? COLORS.dark : COLORS.lightWhite }}>
      {/* App Bar */}
      <ScreenHeaderBtn isAppBar={true} title="Meditation Details" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <View style={{ width: "100%" }} testID="userDetails">
            {userDetails && (
              <Text style={{ fontFamily: FONT.regular, fontSize: SIZES.large, color: isDarkTheme ? COLORS.lightWhite : COLORS.secondary }}>
                Hello {userDetails.userName}!
              </Text>
            )}
            <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.xLarge, color: isDarkTheme ? COLORS.lightWhite : COLORS.primary, marginTop: 2 }}>
              Would you like to change any settings?
            </Text>
          </View>

          {settings.map((setting) => (
            <TouchableOpacity
              key={setting.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: SIZES.medium,
                borderRadius: SIZES.small,
                backgroundColor: isDarkTheme ? COLORS.darkGray : "#FFF",
                ...SHADOWS.medium,
                shadowColor: COLORS.white,
                marginVertical: SIZES.small,
              }}
              onPress={() => router.push(setting.route)}
            >
              <Image source={setting.icon} style={{ width: 24, height: 24, marginRight: 10 }} />
              <Text style={{ fontSize: SIZES.medium, fontFamily: "DMBold", color: isDarkTheme ? COLORS.lightWhite : COLORS.primary }}>
                {setting.title}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: SIZES.medium,
              borderRadius: SIZES.small,
              backgroundColor: "#FFC0CB",
              ...SHADOWS.medium,
              shadowColor: COLORS.white,
              marginVertical: SIZES.small,
            }}
            onPress={handleLogout}
          >
            <Image source={icons.left} style={{ width: 24, height: 24, marginRight: 10 }} />
            <Text style={{ fontSize: SIZES.medium, fontFamily: "DMBold", color: COLORS.primary }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;