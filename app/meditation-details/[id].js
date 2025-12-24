import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
    Share,
    Alert,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import { MeditationTopDisplay, About, Footer, Tabs } from "../../components";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

const tabs = ["About", "Instructions"];

const MeditationDetails = () => {
    const params = useGlobalSearchParams();
    const router = useRouter();
    const id = params.id;
    const { data, isLoading, error, refetch } = useFetch("search", { query: id });
    const meditationItem = useFetch().getItemById(parseInt(id, 10));
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, []);

    // Fungsi untuk membagikan meditasi
    const onShare = async () => {
        try {
            await Share.share({
                message: `Check out this meditation: ${meditationItem?.title} (${meditationItem?.duration})`,
            });
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            {/* App Bar */}
            <View style={styles.appBar}>
                {/* Logo */}
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.btnContainer} onPress={() => router.back()}>
                        <Image source={icons.logo} style={styles.logo} />
                    </TouchableOpacity>
                </View>

                {/* Container untuk tombol Settings dan Share */}
                <View style={styles.iconContainer}>
                    {/* Tombol Settings */}
                    <TouchableOpacity style={styles.btnContainer} onPress={() => router.push("/settings")}>
                        <Image source={icons.settings} style={styles.image} />
                    </TouchableOpacity>

                    {/* Tombol Share */}
                    <TouchableOpacity style={styles.btnContainer} onPress={onShare}>
                        <Image source={icons.share} style={styles.image} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : !meditationItem ? (
                    <Text>No data available</Text>
                ) : (
                    <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                        <MeditationTopDisplay
                            meditationImage={meditationItem.image}
                            meditationTitle={meditationItem.title}
                            duration={meditationItem.duration}
                            target={meditationItem.target}
                        />
                        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                        {activeTab === "About" ? (
                            <About
                                title={meditationItem?.title || "No Title"}
                                info={meditationItem?.description || "No data provided"}
                            />
                        ) : (
                            <View style={styles.instructionsContainer}>
                                <Text style={styles.instructionsTitle}>Instructions:</Text>
                                <View style={styles.instructionsList}>
                                    {(meditationItem?.instructions ?? ["N/A"]).map((item, index) => (
                                        <View style={styles.instructionItem} key={index}>
                                            <View style={styles.instructionDot} />
                                            <Text style={styles.instructionText}>{item}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}
                    </View>
                )}
            </ScrollView>
            <Footer data={meditationItem} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    appBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.white,
        paddingVertical: 10,
        paddingHorizontal: SIZES.medium,
        elevation: 3,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    logo: {
        width: 100,
        height: 30,
        resizeMode: "contain",
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    btnContainer: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10, // Memberi jarak antara ikon Settings dan Share
    },
    image: {
        width: 24,
        height: 24,
        tintColor: COLORS.primary, // Warna ikon
    },
    instructionsContainer: {
        padding: SIZES.medium,
    },
    instructionsTitle: {
        fontSize: SIZES.large,
        fontWeight: "bold",
        marginBottom: SIZES.small,
    },
    instructionsList: {
        marginTop: SIZES.small,
    },
    instructionItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: SIZES.small / 2,
    },
    instructionDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.primary,
        marginRight: SIZES.small,
    },
    instructionText: {
        fontSize: SIZES.medium,
        color: COLORS.gray,
    },
});

export default MeditationDetails;
