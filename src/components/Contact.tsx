import * as React from 'react'

import { StyleSheet, Text, View } from 'react-native'

import { ColorScheme } from '../utils/ColorScheme'

export const Contact = ({ contact }) => {
	return (
		<View style={styles.contact}>
			<Text style={styles.text}>{contact.name}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	contact: {
		backgroundColor: ColorScheme.primary,
		paddingVertical: 20,
		marginBottom: 4,
	},
	text: {
		marginLeft: 10,
		color: ColorScheme.secondary,
	},
})
