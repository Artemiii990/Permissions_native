import { StyleSheet} from "react-native";
import LocationPermission from "@/components/LocationPermission";
import ContactsPermission from "@/components/ContactsPermission";
import GalleryPermission from "@/components/GalleryPermission";
import GeolocationBlock from "@/components/geolocation";
import CameraPermission from "./CameraPermission";

export default function PermissionCard() {
    return (
        <>
            <CameraPermission/>
            <LocationPermission/>
            <ContactsPermission/>
            <GalleryPermission/>
        </>
    );
}

