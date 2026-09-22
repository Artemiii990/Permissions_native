import { Button, View, Text, FlatList, StyleSheet, Alert } from "react-native";
import * as Contacts from 'expo-contacts';
import {ContactField, ContactsSortOrder, Contact } from "expo-contacts";
import { useState } from "react";

interface PhoneRecord {
  number: string;
  label?: string;
}

export default function ContactBlock(){
    const [contacts, setContacts] = useState<Awaited<ReturnType<typeof Contact.getAllDetails>>>([]);
      
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
        } 
        else {
            Alert.alert("Отказ", "Вы отклонили доступ к контактам.");
        }    
    };

    return(
        <View>
            <Button         
                title="контактам" 
                onPress={handleGetContactsPermission}
            >
            </Button>
            {contacts.length > 0 &&
                <FlatList
                    data={contacts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.contactItem}>
                            <Text style={styles.name}>{item.fullName || "Без імені"}</Text>
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
            }

        </View>
    )
}
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 16 },
  contactItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  name: { fontSize: 18, fontWeight: "bold" },
  phone: { fontSize: 14, color: "#666", marginTop: 2 }
});