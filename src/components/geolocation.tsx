import { useState } from "react";
import { Alert, Pressable, Text, View, StyleSheet, Linking } from "react-native";
import * as Location from "expo-location";

export default function GeolocationBlock() {
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(null);
  const [loading, setLoading] = useState(false);

  const findNearby = async () => {
    const granted = status?.granted ? status : await requestPermission();

    if (!granted.granted) {
      return;
    }

    setLoading(true);

    try {
      const cached = await Location.getLastKnownPositionAsync();
      if (cached) {
        setCoords(cached.coords);
      }

      const fresh = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setCoords(fresh.coords);
    } catch (error) {
      console.error("Location error:", error);

      Alert.alert(
        "Геолокація недоступна",
        "Увімкніть геолокацію на телефоні та дозвольте доступ до неї для Expo Go."
      );
    } finally {
      setLoading(false);
    }
  };

  if (status && !status.granted && !status.canAskAgain) {
    return (
      <View style={styles.card}>
        <Text style={styles.warningText}>
          Геолокация отключена для этого приложения. Вы можете включить её в
          настройках устройства.
        </Text>
        <Pressable style={styles.outlineButton} onPress={() => Linking.openSettings()}>
          <Text style={styles.outlineButtonText}>Открыть настройки</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>🌐 Поиск вакансий поблизости</Text>
      </View>

      <Pressable
        style={[styles.actionButton, loading && styles.disabledButton]}
        onPress={findNearby}
        disabled={loading}
      >
        <Text style={styles.actionButtonText}>
          {loading ? "Определение..." : "Найти вакансии рядом"}
        </Text>
      </Pressable>

      {coords && (
        <View style={styles.coordsBox}>
          <Text style={styles.coordLabel}>Текущие координаты:</Text>
          <Text style={styles.coordText}>
            {coords.latitude.toFixed(4)}, {coords.longitude.toFixed(4)}
          </Text>
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
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  actionButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#93c5fd",
  },
  actionButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  outlineButton: {
    borderColor: "#2563eb",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  outlineButtonText: {
    color: "#2563eb",
    fontSize: 15,
    fontWeight: "600",
  },
  warningText: {
    color: "#4b5563",
    fontSize: 14,
    marginBottom: 10,
  },
  coordsBox: {
    marginTop: 12,
    padding: 10,
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    alignItems: "center",
  },
  coordLabel: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 2,
  },
  coordText: {
    fontSize: 14,
    color: "#1e293b",
    fontWeight: "600",
  },
});