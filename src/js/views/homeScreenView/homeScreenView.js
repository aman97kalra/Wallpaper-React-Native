import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image, FlatList, Dimensions, Header, TouchableOpacity, Button } from 'react-native';

export const homeScreenView = ( props ) => {
    console.log( props );
    const { isLoading, images, navigation } = props;
    return (
                <View style={{ flex: 1, backgroundColor: 'black' }}>
                    <FlatList
                        data = { images }
                        pagingEnabled
                        renderItem = { ( { item } ) => (
                            <TouchableOpacity onPress = { () => navigation.navigate( 'FullScreenImageView', {
                                data: item
                            } ) }>
                                <Image
                                    style = { { height: 200, width: 200, margin: 2}}
                                    source = {{ uri: item.urls.thumb }}
                                />
                            </TouchableOpacity>
                        ) }
                        numColumns = {2}
                        keyExtractor={item => item.id}

                    />
                </View>
            );
  };
