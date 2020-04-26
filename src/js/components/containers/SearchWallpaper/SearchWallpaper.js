import React, { Component } from 'react';
import { View, SafeAreaView,  Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import axios from 'axios';
import { homeScreenView as HomeScreenView } from 'views/homeScreenView';
import { isUndefined } from 'lodash';

export class SearchWallpaper extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            search: '',
            images: [],
            isLoading: true
        };
    }

    handleFieldChange( key, value ) {
        console.log( 'handleFieldChange', key, value );
        this.setState( {
            [ key ]: value
        } );
    }

    searchQuery( param ) {
        console.log( 'param is ', param );
        const query = isUndefined( param ) ? this.state.search: param;
        console.log( 'query word is', query );
        console.log( this.props );
        if( ''!==this.state.search || !isUndefined( param ) ) {
            const url = `https://api.unsplash.com/search/photos?query=${query}&count=10&client_id=896979fdb70f80865638d7a4648bf9ce309675335318933eab2bf990af42e295`;
            axios.get( url ).then( ( response ) => {
                console.log( 'Search Request Completed', response.data.results );
                this.setState( {
                    images: response.data.results,
                    isLoading: false
                } );
                this.renderHomeView();
            } ).catch( ( error ) => {
                console.log( error );
            } ).finally( () => {
                console.log( 'Network request Completed' );
            } );
        }
    }

    renderHomeView( ) {
        console.log( 'renderHomeView' );
        this.props.navigation.navigate( 'SearchResults', {
            images: this.state.images,
        } );
    }

	render() {
        const data= [ 'travel', 'nature', 'india', 'sports', 'planets', 'bikes' ];
		return (

            // isEmpty( this.state.images ) ?
            // (
                <SafeAreaView style = { styles.container}>
                <TextInput
                    style={ styles.textinput }
                    onChangeText={text => this.handleFieldChange( 'search', text )}
                />
                <TouchableOpacity style = {styles.button}>
                    <Button
                        onPress = { () => this.searchQuery() }
                        title="Search Wallpaper by Category"
                        style={ styles.textinput }
                    />
                </TouchableOpacity>
                <Text style = { styles.text }> Top Searches </Text>
                <FlatList
                        data = { data }
                        pagingEnabled
                        renderItem = { ( { item } ) => (
                            <TouchableOpacity onPress = { () => this.searchQuery( item )}>
                                <View style= { styles.topTags }>
                                    <Text> { item } </Text>
                                </View>
                             </TouchableOpacity>
                        ) }
                        numColumns = {2}
                        keyExtractor={( item, index ) => 'key' + index+ item.key}

                />
                </SafeAreaView>

            // ):
            // <HomeScreenView
            //     { ...this.props }
            //     images = { this.state.images }
            //     isLoading = { this.state.isLoading }
            // />
		);
	}
}

const styles = StyleSheet.create( {
	container: {
        marginTop: 50,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
    },
    text: {
        fontSize: 20,
        textDecorationLine: 'underline',
        padding: 10,
        margin: 10
    },
    button: {
        padding: 10,
        marginBottom: 10
    },
    textinput: {
        height: 70,
        width: 300,
        borderColor: '#2196F3',
        borderWidth: 2,
        padding: 10,
        margin: 20,
    },
    topTags: {
        borderRadius: 20,
        padding: 10,
        width: 150,
        height: 60,
        backgroundColor: '#2196F3',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15
    }
} );
