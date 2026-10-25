import { View, Text, FlatList, Pressable, StyleSheet, Alert } from "react-native";
import * as Contacts from "expo-contacts";
import { ContactField, ContactsSortOrder, Contact } from "expo-contacts";
import { useState } from "react";

export default function ContactBlock() {
  const [contacts, setContacts] = useState<
    Awaited<ReturnType<typeof Contact.getAllDetails>>
  >([]);

  const handleGetContactsPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === "granted") {
      const data = await Contact.getAllDetails(
        [ContactField.FULL_NAME, ContactField.PHONES],
        {
          limit: 20,
          offset: 10,
          sortOrder: ContactsSortOrder.GivenName,
        }
      );
      setContacts(data);
    } else {
      Alert.alert("Отказ", "Вы отклонили доступ к контактам.");
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>📇 Список контактов</Text>
      </View>

      <Pressable style={styles.actionButton} onPress={handleGetContactsPermission}>
        <Text style={styles.actionButtonText}>Запросить контакты</Text>
      </Pressable>

      {contacts.length > 0 && (
        <View style={styles.contactsSection}>
          <FlatList
            data={contacts}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.contactItem}>
                <Text style={styles.name}>{item.fullName || "Без имени"}</Text>
                {item.phones?.[0] && (
                  <Text style={styles.phone}>
                    {item.phones[0].label ? `${item.phones[0].label}: ` : ""}
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
  actionButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  contactsSection: {
    marginTop: 14,
  },
  contactItem: {
    backgroundColor: "#f8fafc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#2563eb",
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
  },
  phone: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2,
  },
});