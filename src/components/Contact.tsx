import * as Contacts from 'expo-contacts'
import * as React from 'react'

import { StyleSheet, Text } from 'react-native'

import { ColorScheme } from '../utils/ColorScheme'
import Icon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

type Props = {
	contact: Contacts.Contact
}

export const Contact: React.FC<Props> = ({ contact }) => {
	const navigation = useNavigation()

	// React Navigation pattern for navigating to a new screen and data params
	const onPress = () => {
		navigation.navigate('Contact', { id: contact.id })
	}

	return (
		<TouchableOpacity style={styles.contact} onPress={onPress}>
			<Text style={styles.text}>{contact.name}</Text>
			<Icon name='ios-arrow-forward' size={20} color={ColorScheme.secondary} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	contact: {
		backgroundColor: ColorScheme.primary,
		paddingVertical: 20,
		marginBottom: 4,
		paddingHorizontal: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	text: {
		color: ColorScheme.secondary,
	},
})
