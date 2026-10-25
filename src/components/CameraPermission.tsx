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

  const isGranted = status === "Permission granted";

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>📷 Camera</Text>
        <View
          style={[
            styles.badge,
            isGranted ? styles.badgeSuccess : styles.badgeDefault,
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              isGranted ? styles.badgeTextSuccess : styles.badgeTextDefault,
            ]}
          >
            {status}
          </Text>
        </View>
      </View>

      <Pressable style={styles.actionButton} onPress={requestPermission}>
        <Text style={styles.actionButtonText}>Allow Camera</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeDefault: {
    backgroundColor: "#f3f4f6",
  },
  badgeSuccess: {
    backgroundColor: "#dcfce7",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
  },
  badgeTextDefault: {
    color: "#6b7280",
  },
  badgeTextSuccess: {
    color: "#15803d",
  },
  actionButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
});