import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Camera } from "expo-camera";

export default function CameraPermission() {
    const [status, setStatus] = useState<string>("Not requested");

    const requestPermission = async () => {
        const result = await Camera.requestCameraPermissionsAsync();

        if (result.granted) {
            setStatus("Permission granted");
        } else {
            setStatus("Permission denied");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📷 Camera</Text>

            <Pressable
                style={styles.button}
                onPress={requestPermission}
            >
                <Text style={styles.buttonText}>
                    Allow Camera
                </Text>
            </Pressable>

            <Text style={styles.status}>
                Status: {status}
            </Text>
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
});