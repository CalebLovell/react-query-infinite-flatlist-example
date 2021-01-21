import { useMutation, useQueryClient } from 'react-query'

export const useDeleteLocalContacts = () => {
	const queryClient = useQueryClient()
	return useMutation(remainingContacts => remainingContacts, {
		onSuccess: data => queryClient.setQueryData('localContacts', data),
	})
}
