import * as Contacts from 'expo-contacts'

export type ContactsArray = Contacts.Contact[]

export type Page = {
	page: ContactsArray
	pageParam: number
}

export type InfiniteQueryResponse = {
	pages: Page[]
	pageParams: number[]
	contacts: ContactsArray
}
