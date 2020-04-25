import React, { Component } from 'react';
import { PriceTrackerView } from 'views/PriceTrackerView';
import { dataFetcherHoc } from 'hoc/generic/dataFetcherHoc';
import { REQUEST_GET } from 'constants/generic';
import { Alert } from 'react-native';

export class PriceTrackerContainer extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            price: 0,
            url: ''
        };
        this._bind();
    }

    _bind() {
        this.checkPrice = this.checkPrice.bind( this );
        this.handleFieldChange = this.handleFieldChange.bind( this );
    }

    handleFieldChange( key, value ) {
        this.setState( {

            // setting the value to key obtained as paramter
            [ key ]: value
        } );
    }

    checkPrice( url, price ) {
        this.props.fetchData( {
            url,
            price
        } );
        console.log( 'CheckPrice', url );
    }

    componentWillReceiveProps( nextProps ) {
        console.log( 'PriceTrackerContainer.componentWillReceiveProps()' );
        console.log( nextProps.componentData );
        if( this.props.componentData !== nextProps.componentData ) {
            Alert.alert(
                'Title',
                nextProps.componentData.message,
                [
                    {text: 'Cancel', onPress: () => { console.log( 'Cancel Pressed' ); } },
                    {text: 'Ok', onPress: () => { console.log( 'Ok Pressed' ); } }
                ],
                {onDismiss: () => {} }
            );
        }
    }

    render() {
        return(
            <PriceTrackerView
                { ...this.state }
                checkPrice = { this.checkPrice }
                handleFieldChange = { this.handleFieldChange }
            />
        );
    }
}

export const PriceTrackerWithDataFecther = dataFetcherHoc( PriceTrackerContainer, {path: '/checkPrice', method: REQUEST_GET } );
