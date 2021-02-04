import * as React from 'react'

import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'

import { ColorScheme } from '../utils/ColorScheme'
import { Contact } from './Contact'
import { useInfiniteContacts } from '../hooks/useInfiniteContacts'

export const ContactsScreen = () => {
	// Fetch paginated Contacts
	const { status, data, error, isLoading, refetch, fetchNextPage } = useInfiniteContacts()
	// Add local contacts holder to restructure data for a Flatlist
	const [contacts, setContacts] = React.useState([])

	// This useEffect listens to the data, and reformats it on change
	React.useEffect(() => {
		// Mounted check to prevent React warning about attempting
		// to perform a React state update on an unmounted component
		let mounted = true
		if (mounted) {
			const allPagesArray = []
			data?.pages ? data.pages.forEach(x => allPagesArray.push(x.data)) : null
			setContacts(allPagesArray.flat())
		}
		return () => {
			mounted = false
		}
	}, [data])

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ width: '100%' }}>
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
						onEndReached={() => fetchNextPage()}
					/>
				)}
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 8,
		backgroundColor: ColorScheme.background,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
