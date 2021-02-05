import * as Contacts from 'expo-contacts'
import * as React from 'react'

import { StyleSheet, Text } from 'react-native'

import { ColorScheme } from '../utils/ColorScheme'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

type Props = {
	contact: Contacts.Contact
	multiSelect: boolean
	selectedContacts: Contacts.Contact[]
	setSelectedContacts: any
}

export const Contact: React.FC<Props> = ({ contact, multiSelect, selectedContacts, setSelectedContacts }) => {
	const navigation = useNavigation()
	const selected = selectedContacts.some(x => x.id === contact.id)

	// React Navigation pattern for navigating to a new screen and data params
	const open = () => {
		navigation.navigate('Contact', { id: contact.id })
	}

	const select = () => {
		if (!selected) {
			setSelectedContacts([...selectedContacts, contact])
		} else {
			setSelectedContacts(selectedContacts.filter((x: Contacts.Contact) => x.id !== contact.id))
		}
	}

	return (
		<TouchableOpacity style={styles.contact} onPress={multiSelect ? select : open}>
			<Text style={styles.text}>{contact.name}</Text>
			{multiSelect ? (
				<React.Fragment>
					{selected ? (
						<FAIcon name='dot-circle-o' size={26} color={ColorScheme.secondary} style={{ marginRight: 2 }} />
					) : (
						<FAIcon name='circle-o' size={26} color={ColorScheme.secondary} style={{ marginRight: 2 }} />
					)}
				</React.Fragment>
			) : (
				<IonIcon name='ios-arrow-forward' size={30} color={ColorScheme.secondary} />
			)}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	contact: {
		height: 45,
		backgroundColor: ColorScheme.primary,
		marginBottom: 4,
		paddingHorizontal: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	text: {
		fontWeight: 'bold',
		fontSize: 16,
		color: ColorScheme.secondary,
	},
})
