import * as Contacts from 'expo-contacts'

import { InfiniteQueryResponse, Page } from '../utils/Types'
import { useMutation, useQueryClient } from 'react-query'

const deleteContact = async (id: string) => {
	const deletedId = await Contacts.removeContactAsync(id)
	return deletedId
}

export const useDeleteContact = () => {
	const queryClient = useQueryClient()
	return useMutation(id => deleteContact(id), {
		onMutate: async (deletedId: string) => {
			await queryClient.cancelQueries('contacts')
			// Get 'contacts' value from cache
			const previousContacts = queryClient.getQueryData<InfiniteQueryResponse>('contacts')
			// If it exists...
			if (previousContacts) {
				// Create a placeholder array for updated pages
				const newPageArray: Page[] = []
				// Loop through existing pages
				previousContacts?.pages.forEach(contactsArray => {
					// Filter out the deleted id
					const newDataArray = contactsArray.page.filter(contact => contact.id !== deletedId)
					// Add the filtered array along with the unchanged pageParam to the newPageArray
					newPageArray.push({ page: newDataArray, pageParam: contactsArray.pageParam })
				})
				const newContactsArray = newPageArray.flat()
				// Updated pages without filtered value
				// Make sure the data structure is correct
				queryClient.setQueryData('contacts', {
					pages: newPageArray,
					pageParams: previousContacts.pageParams,
					contacts: newContactsArray,
				})
			}
			return { previousContacts }
		},
		onError: (error: Error, _, context) => {
			if (context?.previousContacts) {
				queryClient.setQueryData('contacts', context.previousContacts)
				console.log(error)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries('contacts')
		},
	})
}
