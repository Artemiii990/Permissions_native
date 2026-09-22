import {
    View,
    Text,
    Pressable,
    Image,
    StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function GalleryPermission() {
    const [image, setImage] = useState<string | null>(null);

    const openGallery = async () => {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permission.status !== "granted") {
            return;
        }

        const result =
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: false,
                quality: 1,
            });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🖼️ Gallery</Text>

            <Pressable
                style={styles.button}
                onPress={openGallery}
            >
                <Text style={styles.buttonText}>
                    Open Gallery
                </Text>
            </Pressable>

            {image && (
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: image }}
                        style={styles.image}
                    />
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

    imageContainer: {
        width: 250,
        height: 250,
        borderRadius: 10,
        overflow: "hidden",
    },

    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
});