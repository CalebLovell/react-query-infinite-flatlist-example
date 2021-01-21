import * as Contacts from 'expo-contacts'

import { useInfiniteQuery } from 'react-query'

export const getContacts = async ({ pageParam = 0 }) => {
	const { data } = await Contacts.getContactsAsync({
		pageOffset: pageParam,
		pageSize: 10,
	})
	return { data, pageParam }
}

export const useContacts = () => {
	return useInfiniteQuery('contacts', getContacts, {
		getNextPageParam: lastPage => lastPage.pageParam + 10,
		onError: (error: Error) => console.log(error),
	})
}
