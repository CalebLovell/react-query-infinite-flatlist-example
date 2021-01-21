import * as Contacts from 'expo-contacts'

export const getContacts = async ({ pageParam = 0 }) => {
	const { data } = await Contacts.getContactsAsync({
		pageOffset: pageParam,
		pageSize: 10,
	})
	return { data, pageParam }
}

export const updateContact = async contactId => {
	const data = await Contacts.presentFormAsync(contactId)
	return data
}

export const deleteContact = async (contact: Contacts.Contact) => {
	const deletedContact = await Contacts.removeContactAsync(contact.id)
	return deletedContact
}
