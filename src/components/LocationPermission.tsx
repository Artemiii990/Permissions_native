import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import * as Location from "expo-location";

export default function LocationPermission() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [status, setStatus] = useState("Not requested");

  const requestLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setStatus("Permission denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
    setStatus("Permission granted");
  };

  const isGranted = status === "Permission granted";

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>📍 Location</Text>
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

      <Pressable style={styles.actionButton} onPress={requestLocation}>
        <Text style={styles.actionButtonText}>Allow Location</Text>
      </Pressable>

      {latitude !== null && longitude !== null && (
        <View style={styles.coordsBox}>
          <Text style={styles.coordText}>Lat: {latitude.toFixed(4)}</Text>
          <Text style={styles.coordText}>Long: {longitude.toFixed(4)}</Text>
        </View>
      )}
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
  coordsBox: {
    marginTop: 12,
    padding: 10,
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  coordText: {
    fontSize: 13,
    color: "#475569",
    fontWeight: "500",
  },
});