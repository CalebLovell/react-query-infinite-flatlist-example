import * as React from 'react'

import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'

import { ColorScheme } from '../utils/ColorScheme'
import { Contact } from './Contact'
import { useInfiniteContacts } from '../hooks/useInfiniteContacts'

export const ContactsScreen = () => {
	// Fetch paginated Contacts
	const { status, data, error, isLoading, refetch, fetchNextPage } = useInfiniteContacts()

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ width: '100%' }}>
				{status === 'loading' ? (
					<ActivityIndicator />
				) : status === 'error' ? (
					<Text>{error?.message}</Text>
				) : (
					<FlatList
						data={data.contacts}
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
