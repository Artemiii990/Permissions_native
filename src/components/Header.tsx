import { View, Text } from "react-native";

export default function Header() {
    return (
        <View
            style={{
                justifyContent: "center",
                backgroundColor: "#000",
            }}
        >
            <Text style={{ color: "#fff" }}>
                =================================
            </Text>
            <Text style={{ color: "#fff" }}>Permission Center</Text>
            <Text style={{ color: "#fff" }}>
               Керування дозволами пристрою
            </Text>
            <Text style={{ color: "#fff" }}>=================================</Text>
        </View>
    );
}