import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import * as Location from "expo-location";

export default function LocationPermission() {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [status, setStatus] = useState("");

    const requestLocation = async () => {
        const { status } =
            await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            setStatus("Permission denied");
            return;
        }

        const location = await Location.getCurrentPositionAsync({});

        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        setStatus("Permission granted");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📍 Location</Text>

            <Pressable
                style={styles.button}
                onPress={requestLocation}
            >
                <Text style={styles.buttonText}>
                    Allow Location
                </Text>
            </Pressable>

            {status !== "" && (
                <Text style={styles.status}>
                    Status: {status}
                </Text>
            )}

            {latitude !== null && longitude !== null && (
                <View>
                    <Text style={styles.coordinate}>
                        Latitude: {latitude}
                    </Text>

                    <Text style={styles.coordinate}>
                        Longitude: {longitude}
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 16,
    },

    title: {
        fontSize: 20,
        fontWeight: "600",
    },

    button: {
        alignSelf: "flex-start",
        backgroundColor: "#000",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },

    status: {
        fontSize: 16,
    },

    coordinate: {
        fontSize: 16,
        marginTop: 4,
    },
});