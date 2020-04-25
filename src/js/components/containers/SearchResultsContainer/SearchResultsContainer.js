import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, FlatList, Dimensions, Header, TouchableOpacity, Button } from 'react-native';
import { homeScreenView as HomeScreenView } from 'views/homeScreenView';

export class SearchResults extends Component {
    constructor( props ) {
        super( props );
    }
    render() {
        const { route, navigation } = this.props;
        const{ images } = route.params;
        console.log( images );
        return (
                <HomeScreenView
                    { ...this.props }
                    images = { images }
                />
        );
    }
}

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center'
	}
} );
