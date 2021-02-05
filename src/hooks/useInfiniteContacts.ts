import * as Contacts from 'expo-contacts'

import { ContactsArray, Page } from '../utils/Types'

import { useInfiniteQuery } from 'react-query'

const getPaginatedContacts = async ({ pageParam = 0 }): Promise<Page> => {
	const { data: page } = await Contacts.getContactsAsync({
		pageOffset: pageParam,
		pageSize: 10,
	})
	return { page, pageParam }
}

export const useInfiniteContacts = () => {
	return useInfiniteQuery('contacts', getPaginatedContacts, {
		select: data => {
			const allPagesArray: ContactsArray[] = []
			data?.pages ? data.pages.forEach(contactsArray => allPagesArray.push(contactsArray.page)) : null
			const flatContacts = allPagesArray.flat()
			return {
				pages: data.pages,
				pageParams: data.pageParams,
				contacts: flatContacts,
			}
		},
		getNextPageParam: lastPage => lastPage.pageParam + 10,
		onError: (error: Error) => console.log(error),
	})
}
