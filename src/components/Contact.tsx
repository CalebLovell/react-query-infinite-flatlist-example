import * as React from 'react'

import { StyleSheet, Text, View } from 'react-native'

export const Contact = ({ contact }) => {
	return (
		<View style={styles.contact}>
			<Text>{contact.name}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 20,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	contact: {
		backgroundColor: '#f9c2ff',
		paddingHorizontal: 10,
		paddingVertical: 20,
		marginVertical: 4,
	},
	sectionHeader: {
		height: 30,
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
	},
	sectionHeaderText: {
		fontWeight: 'bold',
		textAlign: 'center',
		width: 30,
		height: 15,
	},
})
