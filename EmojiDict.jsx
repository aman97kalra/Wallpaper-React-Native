import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { REQUEST_GET } from './src/js/constants/generic';

// import { dataFetcherHoc } from './src/js/hoc/generic/dataFetcherHoc/dataFetcherHoc';
import { dataFetcherHoc } from 'src/js/hoc/generic/dataFetcherHoc';

class EmojiDict extends Component {
	state = {
		'😃': '😃 Smiley',
		'🚀': '🚀 Rocket',
		'⚛️': '⚛️ Atom Symbol'
	};

	render() {
		return (
				<Text>{this.state[ '😃' ]}</Text>
		);
	}
}

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
} );

export const _EmojiDict = EmojiDict;
export const EmojiDictWithDataFetcher = dataFetcherHoc( EmojiDict, { path: './src/assets/jsons/sample.json', method: REQUEST_GET } );

