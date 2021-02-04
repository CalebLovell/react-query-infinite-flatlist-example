import * as React from 'react'

import { Alert, SafeAreaView, StyleSheet, Text } from 'react-native'

import { ColorScheme } from '../utils/ColorScheme'
import Icon from 'react-native-vector-icons/Ionicons'
import { useContact } from '../hooks/useContact'
import { useDeleteContact } from '../hooks/useDeleteContact'

export const ContactScreen = ({ route, navigation }) => {
	// Grab param from React Navigation
	const { id } = route.params
	// Fetch the individual Contact data with it
	const { data: contact } = useContact(id)
	// Destructure delete mutation from hook
	const { mutate } = useDeleteContact()

	const deleteContact = React.useCallback(() => {
		Alert.alert('Are you sure?', 'This really will delete the contact from your phone forever!!', [
			{
				text: 'Cancel',
				onPress: () => null,
				style: 'cancel',
			},
			{
				text: 'Delete It Forever!',
				onPress: () => {
					if (contact) {
						// Delete contact
						mutate(contact.id)
						// Navigate back to the main list (scroll position saved!)
						navigation.goBack()
					}
				},
				style: 'destructive',
			},
		])
	}, [contact, mutate, navigation])

	// React Navigation pattern for changing the header
	React.useEffect(() => {
		navigation.setOptions({
			headerRight: () => <Icon name='trash' size={24} color={ColorScheme.accent} onPress={deleteContact} />,
		})
	}, [deleteContact, mutate, navigation])

	return (
		<SafeAreaView style={styles.container}>
			<Icon name='person' size={56} color={ColorScheme.primary} />
			{contact?.name && <Text style={styles.text}>{contact?.name}</Text>}
			{contact?.company && <Text style={styles.text}>{contact?.company}</Text>}
			{contact?.birthday && <Text style={styles.text}>{contact?.birthday}</Text>}
			{contact?.phoneNumbers?.map(x => (
				<Text key={x.id} style={styles.text}>
					{x.label}: {x.number}
				</Text>
			))}
			{contact?.addresses?.map(x => (
				<Text key={x.id} style={styles.text}>
					{x.country} {x.city} {x.street} {x.postalCode}
				</Text>
			))}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 30,
		paddingBottom: 8,
		backgroundColor: ColorScheme.background,
		alignItems: 'center',
	},
	text: {
		color: ColorScheme.secondary,
		fontSize: 18,
		marginTop: 8,
	},
})
