import * as React from 'react'

import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'

import { ColorScheme } from '../utils/ColorScheme'
import { Contact } from './Contact'
import { useContacts } from '../hooks/useContacts'

export const ContactsList = () => {
	const { status, data, error, isLoading, refetch, fetchNextPage } = useContacts()
	const [contacts, setContacts] = React.useState([])

	React.useEffect(() => {
		const allPagesArray = []
		data?.pages ? data.pages.forEach(x => allPagesArray.push(x.data)) : null
		setContacts(allPagesArray.flat())
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
