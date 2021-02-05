import * as React from 'react'

import { QueryClient, QueryClientProvider } from 'react-query'

import { ColorScheme } from './src/utils/ColorScheme'
import { ContactScreen } from './src/components/ContactScreen'
import { ContactsScreen } from './src/components/ContactsScreen'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 60 * 24,
			onError: error => console.log(error),
		},
		mutations: {
			onError: error => console.log(error),
		},
	},
})

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
						name='Contacts_A'
						component={ContactsStack}
						options={{
							tabBarIcon: ({ color }) => <IonIcon name='body' size={32} color={color} />,
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
					marginRight: 6,
				},
				headerLeftContainerStyle: {
					marginLeft: 6,
				},
			}}>
			<Stack.Screen name='Contacts' component={ContactsScreen} />
			<Stack.Screen name='Contact' component={ContactScreen} />
		</Stack.Navigator>
	)
}
