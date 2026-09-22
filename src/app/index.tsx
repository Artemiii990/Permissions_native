import CameraPermission from "@/components/CameraPermission";
import ContactBlock from "@/components/contact";
import Contact from "@/components/contact";

import Header from "@/components/Header";
import PermissionCard from "@/components/PermissionCard";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={{marginTop: 50, margin: 10}}>
      <Header/>
      <View>
        <PermissionCard/>
      </View>
    </ScrollView>
  );
}
