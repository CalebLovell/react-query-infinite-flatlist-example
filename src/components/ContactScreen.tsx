import * as Contacts from 'expo-contacts'
import * as React from 'react'

import { Alert, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native'

import { ColorScheme } from '../utils/ColorScheme'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MUIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useContact } from '../hooks/useContact'
import { useDeleteContact } from '../hooks/useDeleteContact'

export const ContactScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
	// Grab param from React Navigation
	const { id } = route.params
	// Fetch the individual Contact data with it
	const { data: contact, refetch, isLoading } = useContact(id)
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

	const editContact = React.useCallback(async () => {
		await Contacts.presentFormAsync(contact?.id)
	}, [contact?.id])

	// React Navigation pattern for changing the header
	React.useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<MUIcon name='account-edit' size={32} color={ColorScheme.secondary} onPress={() => editContact()} style={{ paddingBottom: 1 }} />
			),
		})
	}, [editContact, navigation])

	return (
		<SafeAreaView style={styles.outerContainer}>
			<ScrollView contentContainerStyle={styles.innerContainer} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}>
				{contact?.image?.uri ? (
					<Image style={styles.image} source={{ uri: contact?.image?.uri }} />
				) : (
					<IonIcon name='person' size={120} color={ColorScheme.primary} />
				)}
				{contact?.name && <Text style={styles.text}>{contact?.name}</Text>}
				{contact?.company && <Text style={styles.text}>{contact?.company}</Text>}
				{contact?.birthday && <Text style={styles.text}>{contact?.birthday}</Text>}
				{contact?.phoneNumbers?.map(x => (
					<Text key={x?.id} style={styles.text}>
						{`${x?.label ? x?.label : ''}${x?.label ? ':' : ''} ${x?.number}`}
					</Text>
				))}
				{contact?.addresses?.map(x => (
					<Text key={x?.id} style={styles.text}>
						{x?.country} {x?.city} {x?.street} {x?.postalCode}
					</Text>
				))}
				{contact?.emails?.map(x => (
					<Text key={x?.id} style={styles.text}>
						{x?.email}
					</Text>
				))}
				<MUIcon name='trash' size={32} color={ColorScheme.accent} onPress={() => deleteContact()} />
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	outerContainer: {
		flex: 1,
		backgroundColor: ColorScheme.background,
		alignItems: 'center',
	},
	innerContainer: {
		marginTop: 50,
		alignItems: 'center',
		textAlign: 'center',
	},
	image: {
		borderRadius: 100,
		height: 120,
		width: 120,
	},
	text: {
		color: ColorScheme.secondary,
		fontSize: 18,
		marginTop: 8,
	},
})
