import React, { Component } from 'react';
import { View, Text, Image,  StyleSheet, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export class AboutUsView extends Component {
	constructor( props ) {
		super( props );
	}
	render() {
		console.log( 'AboutUsView.render()', this.props );
		return (
				<View style = { styles.container }>
					<Text style = {styles.text}> Thank you for downloading this app.</Text>
					<Text style = {styles.text}>Made with love and care by Aman !</Text>
					<View style = { styles.backlinks }>
						<TouchableOpacity style = { styles.icons } onPress = { () => Linking.openURL( 'https://github.com/aman97kalra' )}>
							<Image source = {require( 'src/images/github.png' )}
								style = {{ width: 50, height: 50 }}
							/>
						</TouchableOpacity>
						<TouchableOpacity style = { styles.icons } onPress = { () => Linking.openURL( 'https://in.linkedin.com/in/aman-kalra-50502a147' )}>
							<Image source = {require( 'src/images/linkedin.png' )}
								style = {{ width: 50, height: 50 }}
							/>
						</TouchableOpacity>
						<TouchableOpacity style = { styles.icons } onPress = { () => Linking.openURL( 'https://www.facebook.com/aman.kalra.125' )}>
							<Image source = {require( 'src/images/facebook.png' )}
								style = {{ width: 50, height: 50 }}
							/>
						</TouchableOpacity>
					</View>
				</View>
		);
	}
}

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	icons: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	text: {
		fontSize: 22,
		padding: 10,
		margin: 5
	},
	backlinks: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	}
} );
