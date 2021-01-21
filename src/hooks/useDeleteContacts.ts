import * as Contacts from 'expo-contacts'

import { InfiniteData, useMutation, useQueryClient } from 'react-query'

const deleteContact = async (id: string) => {
	// const { deletedId } = await Contacts.removeContactAsync(id)
	return id
}

type ContactsQueryPage = {
	data: Contacts.Contact[]
	pageParam: number
}

// Is this totally insane or actually correct...?
export const useDeleteContacts = () => {
	const queryClient = useQueryClient()
	return useMutation(id => deleteContact(id), {
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
