import {
    View,
    Text,
    FlatList,
    Pressable,
    StyleSheet,
    Alert,
} from "react-native";
import * as Contacts from "expo-contacts";
import {
    ContactField,
    ContactsSortOrder,
    Contact,
} from "expo-contacts";
import { useState } from "react";

export default function ContactsPermission() {
    const [contacts, setContacts] = useState<Awaited<ReturnType<typeof Contact.getAllDetails>>>([]);

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

            // Виводимо тільки перші 2 контакти
            setContacts(data.slice(0, 2));
        } else {
            setStatus("Permission denied");

            Alert.alert(
                "Permission denied",
                "You denied access to contacts."
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>👤 Contacts</Text>

            <Pressable
                style={styles.button}
                onPress={handleGetContactsPermission}
            >
                <Text style={styles.buttonText}>
                    Allow Contacts
                </Text>
            </Pressable>

            <Text style={styles.status}>
                Status: {status}
            </Text>

            {contacts.length > 0 && (
                <View style={styles.contactsContainer}>
                    <Text style={styles.contactsTitle}>
                        Contacts:
                    </Text>

                    <FlatList
                        data={contacts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.contactItem}>
                                <Text style={styles.name}>
                                    {item.fullName || "Без імені"}
                                </Text>

                                {item.phones?.[0] && (
                                    <Text style={styles.phone}>
                                        {item.phones[0].label
                                            ? `${item.phones[0].label}: `
                                            : ""}
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
    container: {
        padding: 20,
        gap: 16,
    },

    title: {
        fontSize: 20,
        fontWeight: "600",
    },

    button: {
        alignSelf: "flex-start",
        backgroundColor: "#000",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },

    status: {
        fontSize: 16,
    },

    contactsContainer: {
        marginTop: 5,
    },

    contactsTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
    },

    contactItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },

    name: {
        fontSize: 18,
        fontWeight: "bold",
    },

    phone: {
        fontSize: 14,
        color: "#666",
        marginTop: 2,
    },
});