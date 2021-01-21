import * as React from 'react'

import { FlatList, StyleSheet, Text, View } from 'react-native'

import { Contact } from './Contact'
import { useContacts } from '../hooks/useContacts'

export const ContactsList = () => {
	const { status, data, error, isLoading, isFetching, refetch, fetchNextPage } = useContacts()
	const [contacts, setContacts] = React.useState([])

	React.useEffect(() => {
		const allPagesArray = []
		data ? data.pages.forEach(x => allPagesArray.push(x.data)) : null
		setContacts(allPagesArray.flat())
	}, [data])

	return (
		<View style={styles.container}>
			<View style={{ width: '100%' }}>
				<Text style={{ marginTop: 20 }}>{isFetching ? 'Updating...' : ''}</Text>
				<Text>Here's ur contacts: </Text>
				{status === 'loading' ? (
					<Text>Loading...</Text>
				) : status === 'error' ? (
					<Text>{error?.message}</Text>
				) : (
					<FlatList
						data={contacts}
						keyExtractor={item => item.id}
						renderItem={({ item }) => <Contact contact={item} />}
						onRefresh={refetch}
						refreshing={isLoading}
						progressViewOffset={100}
						onEndReached={fetchNextPage}
						onEndReachedThreshold={0.7}
					/>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 20,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
