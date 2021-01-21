import { getContacts } from '../api/Contacts'
import { useInfiniteQuery } from 'react-query'

export const useContacts = () => {
	return useInfiniteQuery('localContacts', getContacts, {
		getNextPageParam: lastPage => lastPage.pageParam + 10,
		onError: (error: Error) => console.log(error),
	})
}
