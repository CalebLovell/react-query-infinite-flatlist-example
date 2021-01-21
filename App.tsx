import * as React from 'react'

import { ActivityIndicator, StatusBar } from 'react-native'
import { QueryClient, QueryClientProvider } from 'react-query'

import { ColorScheme } from './src/utils/ColorScheme'
import { ContactScreen } from './src/components/ContactScreen'
import { ContactsList } from './src/components/ContactList'
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { useIsFetching } from 'react-query'

const queryClient = new QueryClient()
const Stack = createStackNavigator()
const BottomTabs = createBottomTabNavigator()

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<NavigationContainer>
				<BottomTabs.Navigator
					tabBarOptions={{
						activeTintColor: ColorScheme.accent,
						inactiveTintColor: ColorScheme.primary,
						keyboardHidesTabBar: true,
						style: {
							backgroundColor: ColorScheme.background,
							borderTopColor: ColorScheme.background,
							borderTopWidth: 1,
						},
						showLabel: false,
					}}>
					<BottomTabs.Screen
						name='Contacts A'
						component={ContactsStack}
						options={{
							tabBarIcon: ({ color }) => <Icon name='body' size={32} color={color} />,
						}}
					/>
					<BottomTabs.Screen
						name='Contacts B'
						component={ContactsStack}
						options={{
							tabBarIcon: ({ color }) => <Icon name='cog' size={32} color={color} />,
						}}
					/>
				</BottomTabs.Navigator>
				<StatusBar backgroundColor={ColorScheme.background} barStyle='dark-content' />
			</NavigationContainer>
		</QueryClientProvider>
	)
}

const ContactsStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTintColor: ColorScheme.secondary,
				headerTitleAlign: 'center',
				headerTitleContainerStyle: {
					width: '35%',
					height: '80%',
					justifyContent: 'center',
					alignItems: 'center',
				},
				headerStyle: {
					backgroundColor: ColorScheme.background,
					elevation: 0,
					shadowOpacity: 0,
					borderBottomWidth: 1,
					borderBottomColor: ColorScheme.background,
				},
				headerBackTitleVisible: false,
				headerRightContainerStyle: {
					marginRight: 10,
				},
				headerRight: () => <GlobalLoadingIndicator />,
			}}>
			<Stack.Screen name='Contact List' component={ContactsList} />
			<Stack.Screen name='Contact' component={ContactScreen} />
		</Stack.Navigator>
	)
}

const GlobalLoadingIndicator = () => {
	const isFetching = useIsFetching()
	return isFetching ? <ActivityIndicator color={ColorScheme.secondary} /> : null
}
