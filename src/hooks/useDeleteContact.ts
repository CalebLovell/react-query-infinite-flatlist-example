import * as Contacts from 'expo-contacts'

import { InfiniteData, useMutation, useQueryClient } from 'react-query'

import { ContactsQueryPage } from '../utils/types'

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
			const previousContacts = queryClient.getQueryData<InfiniteData<ContactsQueryPage>>('contacts')
			// If it exists...
			if (previousContacts) {
				// Create a placeholder array for updated pages
				const newPageArray: ContactsQueryPage[] = []
				// Loop through existing pages
				previousContacts?.pages.forEach(page => {
					// Filter out the deleted id
					const newDataArray = page.data.filter(contact => contact.id !== deletedId)
					// Add the filtered array along with the unchanged pageParam to the newPageArray
					newPageArray.push({ data: newDataArray, pageParam: page.pageParam })
				})
				// Updated pages without filtered value
				// Make sure the data structure is correct
				queryClient.setQueryData('contacts', {
					...previousContacts,
					pages: newPageArray,
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
