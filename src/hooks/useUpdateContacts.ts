import * as Contacts from 'expo-contacts'

const updateContact = async (contactId: string, updatedContact: Contacts.Contact) => {
	const data = await Contacts.presentFormAsync(contactId, updatedContact)
	return data
}
