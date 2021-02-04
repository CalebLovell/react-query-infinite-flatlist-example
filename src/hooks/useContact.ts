import * as Contacts from 'expo-contacts'

import { useQuery } from 'react-query'

const getContact = async (id: string) => {
	const contact = await Contacts.getContactByIdAsync(id)
	return contact
}

export const useContact = (id: string) => {
	return useQuery(['contact', id], () => getContact(id), {
		onError: error => console.log(error),
	})
}
