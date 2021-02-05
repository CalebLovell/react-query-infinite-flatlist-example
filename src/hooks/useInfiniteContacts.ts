import * as Contacts from 'expo-contacts'

import { useInfiniteQuery } from 'react-query'

type Page = Contacts.Contact[]

type PaginationResponse = {
	page: Page
	pageParam: number
}

const getPaginatedContacts = async ({ pageParam = 0 }): Promise<PaginationResponse> => {
	const { data: page } = await Contacts.getContactsAsync({
		pageOffset: pageParam,
		pageSize: 10,
	})
	return { page, pageParam }
}

export const useInfiniteContacts = () => {
	return useInfiniteQuery('contacts', getPaginatedContacts, {
		select: data => {
			const allPagesArray: Page[] = []
			data?.pages ? data.pages.forEach(x => allPagesArray.push(x.page)) : null
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
