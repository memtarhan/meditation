// PopularMeditation.js
import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../constants/theme";
import useFetch from "../hook/useFetch";

const PopularMeditation = () => {
    const router = useRouter();
    const { data, isLoading, error } = useFetch("search", {
        query: "Meditation",
        num_pages: "1",
    });

    const [selectedMeditation, setSelectedMeditation] = useState(null);

    const handleCardPress = (item) => {
        router.push(`/meditation-details/${item.id}`);
        setSelectedMeditation(item.id);
    };

    const renderMeditationCard = ({ item }) => (
        <TouchableOpacity
            style={styles.container(selectedMeditation, item)}
            onPress={() => handleCardPress(item)}
        >
            <TouchableOpacity style={styles.logoContainer}>
                <Image source={{ uri: item?.image }} resizeMode="cover" style={styles.logoImage} />
            </TouchableOpacity>
            <Text style={styles.meditationName(selectedMeditation, item)}>{item.title}</Text>
            <Text style={styles.publisher}>{item?.shortDescription}</Text>
            <Text style={styles.duration}>{item.duration}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.containerWrapper} testID="popularContainer">
            <View style={styles.header} testID="popularHeader">
                <Text style={styles.headerTitle}>Popular Meditations</Text>
            </View>
            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : (
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={renderMeditationCard}
                        contentContainerStyle={{ columnGap: SIZES.medium }}
                        horizontal
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerWrapper: {
        marginTop: SIZES.medium,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: SIZES.large,
        fontFamily: FONT.medium,
        color: COLORS.primary,
    },
    cardsContainer: {
        marginTop: SIZES.medium,
    },
    container: (selectedMeditation, item) => ({
        width: 270,
        padding: SIZES.medium,
        marginHorizontal: SIZES.small,
        backgroundColor: selectedMeditation === item.id ? COLORS.primary : "#FFF",
        borderRadius: SIZES.medium,
        ...SHADOWS.medium,
    }),
    logoContainer: {
        width: "100%",
        height: 140,
        borderRadius: SIZES.medium,
    },
    logoImage: {
        width: "100%",
        height: "100%",
        borderRadius: SIZES.large,
    },
    meditationName: (selectedMeditation, item) => ({
        fontSize: SIZES.large,
        fontFamily: FONT.medium,
        color: selectedMeditation === item.id ? COLORS.white : COLORS.primary,
    }),
    publisher: {
        fontSize: SIZES.medium,
        fontFamily: FONT.regular,
        color: COLORS.gray,
    },
    duration: {
        fontSize: SIZES.medium,
        fontFamily: FONT.regular,
        color: COLORS.secondary,
    },
});

export default PopularMeditation;
