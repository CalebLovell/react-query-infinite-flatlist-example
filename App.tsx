import * as React from 'react'

import { QueryClient, QueryClientProvider } from 'react-query'

import { ContactsList } from './src/components/ContactList'

const queryClient = new QueryClient()

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ContactsList />
		</QueryClientProvider>
	)
}
