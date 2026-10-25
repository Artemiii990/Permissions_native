import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.appTitle}>Permission Center</Text>
      <Text style={styles.subTitle}>Керування дозволами пристрою</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#111827",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 10,
  },
  appTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  subTitle: {
    color: "#9ca3af",
    fontSize: 14,
    marginTop: 4,
  },
});