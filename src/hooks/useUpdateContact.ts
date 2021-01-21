import * as Contacts from 'expo-contacts'

import { InfiniteData, useMutation, useQueryClient } from 'react-query'

const updateContact = async (contactId: string, updatedContact: Contacts.Contact) => {
	const data = await Contacts.presentFormAsync(contactId, updatedContact)
	return { data }
}

type ContactsQueryPage = {
	data: Contacts.Contact[]
	pageParam: number
}

export const useUpdateContact = () => {
	const queryClient = useQueryClient()
	return useMutation((id, updatedContact) => updateContact(id, updatedContact), {
		onMutate: async (deletedId: string) => {
			await queryClient.cancelQueries('contacts')
			// Get 'contacts' value from cache
			const previousContacts = queryClient.getQueryData<InfiniteData<ContactsQueryPage>>('contacts')
			// If it exists...
			if (previousContacts) {
				// Create a new placeholder array for updated pages
				const newPageArray: ContactsQueryPage[] = []
				// Loop through existing pages
				previousContacts?.pages.forEach(page => {
					// Filter out the deleted id
					const newDataArray = page.data.filter(contact => contact.id !== deletedId)
					// Add the filtered array along with unaltered pageParam to the newPageArray
					newPageArray.push({ data: newDataArray, pageParam: page.pageParam })
				})
				// Updated pages without filtered value
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
			}
			console.log(error)
		},
		onSettled: () => {
			queryClient.invalidateQueries('contacts')
		},
	})
}