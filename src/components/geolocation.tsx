import { useState } from 'react';
import { Alert, Button, Linking, Text, View } from 'react-native';
import * as Location from 'expo-location';

export default function GeolocationBlock() {
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(null);
  const [loading, setLoading] = useState(false);

    const findNearby = async () => {
        const granted = status?.granted
            ? status
            : await requestPermission();

        if (!granted.granted) {
            return;
        }

        setLoading(true);

        try {
            const cached =
            await Location.getLastKnownPositionAsync();

            if (cached) {
            setCoords(cached.coords);
            }

            const fresh =
            await Location.getCurrentPositionAsync({
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
      <View style={{ padding: 24, gap: 12 }}>
        <Text style={{ color: '#fff' }}>
          Location is off for this app. You can turn it on in Settings, or enter
          your area manually.
        </Text>
        <Button title="Open Settings" onPress={() => Linking.openSettings()} />
        <Button title="Enter it manually" onPress={/* … */ undefined} />
      </View>
    );
  }

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Button
        title={loading ? 'Locating…' : 'Find jobs near me'}
        onPress={findNearby}
        disabled={loading}
      />
      {coords && (
        <Text style={{ color: '#fff' }}>
          {coords.latitude.toFixed(4)}, {coords.longitude.toFixed(4)}
        </Text>
      )}
    </View>
  );
}