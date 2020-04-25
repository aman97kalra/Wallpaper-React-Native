import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export class DemoView extends Component {
	constructor( props ) {
		super( props );
	}
	render() {
		console.log( 'DemoView', this.props );
		return (
				<View style = { styles.container }>
					<TouchableOpacity onPress = { () => this.props.navigation.navigate( 'SearchResults', {
                    } ) }>
					<Text> Hello Aman this side </Text>
					</TouchableOpacity>
				</View>
		);
	}
}

// export const DemoView = _DemoView;

// export const DemoView = () => {
// 	console.log( 'TEST' );
// 	return <View style={[ styles.container]}></View>;
// };

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center'
	}
} );
