import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { REQUEST_GET } from 'constants/generic';
import { dataFetcherHoc } from 'hoc/generic/dataFetcherHoc';

export class EmojiDict extends Component {
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
export const EmojiDictWithDataFetcher = dataFetcherHoc( EmojiDict, { path: 'src/assets/jsons/sample', method: REQUEST_GET } );

