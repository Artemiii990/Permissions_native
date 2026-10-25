import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import * as Contacts from "expo-contacts";
import { ContactField, ContactsSortOrder, Contact } from "expo-contacts";
import { useState } from "react";

export default function ContactsPermission() {
  const [contacts, setContacts] = useState<
    Awaited<ReturnType<typeof Contact.getAllDetails>>
  >([]);
  const [status, setStatus] = useState("Not requested");

  const handleGetContactsPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === "granted") {
      setStatus("Permission granted");
      const data = await Contact.getAllDetails(
        [ContactField.FULL_NAME, ContactField.PHONES],
        {
          limit: 20,
          offset: 0,
          sortOrder: ContactsSortOrder.GivenName,
        }
      );
      setContacts(data.slice(0, 2));
    } else {
      setStatus("Permission denied");
      Alert.alert("Permission denied", "You denied access to contacts.");
    }
  };

  const isGranted = status === "Permission granted";

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>👤 Contacts</Text>
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

      <Pressable
        style={styles.actionButton}
        onPress={handleGetContactsPermission}
      >
        <Text style={styles.actionButtonText}>Allow Contacts</Text>
      </Pressable>

      {contacts.length > 0 && (
        <View style={styles.contactsSection}>
          <Text style={styles.sectionHeader}>Loaded Contacts:</Text>
          <FlatList
            data={contacts}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.contactCard}>
                <Text style={styles.contactName}>
                  {item.fullName || "Без імені"}
                </Text>
                {item.phones?.[0] && (
                  <Text style={styles.contactPhone}>
                    {item.phones[0].number}
                  </Text>
                )}
              </View>
            )}
          />
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
  contactsSection: {
    marginTop: 14,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: 8,
  },
  contactCard: {
    backgroundColor: "#f8fafc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
  },
  contactName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  contactPhone: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
});