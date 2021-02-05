import * as Contacts from 'expo-contacts'
import * as React from 'react'

import { ActivityIndicator, Alert, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'

import { ColorScheme } from '../utils/ColorScheme'
import { Contact } from './Contact'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDeleteContact } from '../hooks/useDeleteContact'
import { useInfiniteContacts } from '../hooks/useInfiniteContacts'

export const ContactsScreen = ({ navigation }: { navigation: any }) => {
	const { status, data, error, isLoading, refetch, fetchNextPage } = useInfiniteContacts()
	const [multiSelect, setMultiSelect] = React.useState(false)
	const [selectedContacts, setSelectedContacts] = React.useState<Contacts.Contact[]>([])
	const { mutate } = useDeleteContact()

	const multiDelete = React.useCallback(() => {
		if (selectedContacts.length > 0) {
			Alert.alert(
				'Are you sure?',
				`This really will delete ${selectedContacts.length === 1 ? 'this contact' : 'these contacts'} from your phone forever!!`,
				[
					{
						text: 'Cancel',
						onPress: () => null,
						style: 'cancel',
					},
					{
						text: `Delete ${selectedContacts.length === 1 ? 'it' : 'them'} forever!`,
						onPress: () => {
							selectedContacts.forEach(contact => {
								mutate(contact.id)
							})
						},
						style: 'destructive',
					},
				],
			)
		}
	}, [mutate, selectedContacts])

	// React Navigation pattern for changing the header
	React.useEffect(() => {
		navigation.setOptions({
			headerLeft: () => <>{multiSelect ? <IonIcon name='trash' size={24} color={ColorScheme.accent} onPress={multiDelete} /> : null}</>,
			headerRight: () => (
				<TouchableOpacity onPress={() => setMultiSelect(!multiSelect)}>
					<Text style={[styles.text, { marginRight: 4 }]}>{multiSelect ? 'Stop Deleting' : 'Delete'}</Text>
				</TouchableOpacity>
			),
		})
	}, [multiDelete, multiSelect, navigation])

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ width: '100%' }}>
				{status === 'loading' ? (
					<ActivityIndicator />
				) : status === 'error' ? (
					<Text style={styles.text}>{error?.message}</Text>
				) : (
					<FlatList
						data={data?.contacts}
						keyExtractor={item => item.id}
						renderItem={({ item }) => (
							<Contact
								contact={item}
								multiSelect={multiSelect}
								selectedContacts={selectedContacts}
								setSelectedContacts={setSelectedContacts}
							/>
						)}
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
	text: {
		fontWeight: '600',
		fontSize: 16,
	},
})
