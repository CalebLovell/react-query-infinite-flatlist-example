import * as Contacts from 'expo-contacts'

export type ContactsQueryPage = {
	data: Contacts.Contact[]
	pageParam: number
}
