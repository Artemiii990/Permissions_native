import { ScrollView, StyleSheet } from "react-native";
import LocationPermission from "@/components/LocationPermission";
import ContactsPermission from "@/components/ContactsPermission";
import GalleryPermission from "@/components/GalleryPermission";
import CameraPermission from "./CameraPermission";
import Header from "./Header";

export default function PermissionCard() {
  return (
    <ScrollView style={styles.wrapper} contentContainerStyle={styles.container}>
      <Header />
      <CameraPermission />
      <LocationPermission />
      <ContactsPermission />
      <GalleryPermission />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
});