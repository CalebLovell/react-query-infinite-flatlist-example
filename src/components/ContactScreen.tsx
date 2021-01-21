import * as Contacts from 'expo-contacts'
import * as React from 'react'

import { Alert, StyleSheet, Text, View } from 'react-native'

import { ColorScheme } from '../utils/ColorScheme'
import Icon from 'react-native-vector-icons/Ionicons'
import { useDeleteContact } from '../hooks/useDeleteContact'

export const ContactScreen = ({ route, navigation }) => {
	const { contact }: { contact: Contacts.Contact } = route.params
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
					mutate(contact.id)
					navigation.goBack()
				},
				style: 'destructive',
			},
		])
	}, [contact.id, mutate, navigation])

	React.useEffect(() => {
		navigation.setOptions({
			headerRight: () => <Icon name='trash' size={24} color={ColorScheme.accent} onPress={deleteContact} />,
		})
	}, [deleteContact, mutate, navigation])

	return (
		<View style={styles.container}>
			<Icon name='person' size={32} color={ColorScheme.secondary} />
			{contact.name && <Text style={styles.text}>{contact.name}</Text>}
			{contact.company && <Text style={styles.text}>{contact.company}</Text>}
			{contact.birthday && <Text style={styles.text}>{contact.birthday}</Text>}
			{contact.phoneNumbers?.map(x => (
				<Text key={x.id} style={styles.text}>
					{x.label} {x.number}
				</Text>
			))}
			{contact.addresses?.map(x => (
				<Text key={x.id} style={styles.text}>
					{x.country} {x.city} {x.street} {x.postalCode}
				</Text>
			))}
		</View>
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
		color: ColorScheme.secondary,
	},
})
