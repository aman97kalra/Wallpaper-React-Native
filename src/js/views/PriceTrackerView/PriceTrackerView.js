import React, { Component } from 'react';
import { TextInput, View, Text, Button } from 'react-native';

export const PriceTrackerView = ( props ) => {
    const { handleFieldChange, checkPrice } = props;
    return (
        <View>
            <Text> Working </Text>
            <TextInput
                style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
                placeholder = 'Enter URL'
                onChangeText = { ( value ) => handleFieldChange( 'url', value )}
            />
            <TextInput
                style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
                placeholder = 'Enter Price'
                onChangeText = { ( value ) => handleFieldChange( 'price', value )}
            />
            <Button
                title = "Submit"
                onPress = { () => checkPrice( props.url, props.price )}
            />
        </View>
    );

};

