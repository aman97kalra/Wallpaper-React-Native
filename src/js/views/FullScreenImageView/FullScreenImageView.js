import React, { Component } from 'react';
import { Text, View, SafeAreaView,  Image, Dimensions, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import {  PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import RNFS from 'react-native-fs';
import CameraRoll from '@react-native-community/cameraroll';
import WallPaperManager from 'react-native-wallpaper-manager';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { height, width } = Dimensions.get( 'window' );
export class FullScreenImageView extends Component {
    constructor( props ) {
        super( props );
        this.state = {

        };
    }

    requestPermission( image ) {
        
        console.log( 'Requesting Permission for camera and storage' );
        request( 'android' === Platform.OS ? [ PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE ]:[ PERMISSIONS.IOS.CAMERA ] )
            .then( ( result ) => {
                switch ( result ) {
                case RESULTS.UNAVAILABLE:
                    console.log(
                    'This feature is not available (on this device / in this context)',
                    );
                    break;
                case RESULTS.DENIED:
                    console.log(
                    'The permission has not been requested / is denied but requestable',
                    );
                    break;
                case RESULTS.GRANTED:
                    console.log( 'The permission is granted' );
                    break;
                case RESULTS.BLOCKED:
                    console.log( 'The permission is denied and not requestable anymore' );
                    break;
                }
            } )
            .catch( ( error ) => {
                console.log( error );
            } );
            this.downloadFile( image );
    }
    
    // requestCameraPermission = async ( image ) => {
    //     try {
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.CAMERA,
    //         {
    //           title: 'Cool Photo App Camera Permission',
    //           message:
    //             'Cool Photo App needs access to your camera ' +
    //             'so you can take awesome pictures.',
    //           buttonNeutral: 'Ask Me Later',
    //           buttonNegative: 'Cancel',
    //           buttonPositive: 'OK'
    //         }
    //       );
    //       if ( granted === PermissionsAndroid.RESULTS.GRANTED ) {
    //         console.log( 'You can use the camera' );
    //       } else {
    //         console.log( 'Camera permission denied' );
    //       }
    //     } catch ( err ) {
    //       console.log( err );
    //     }
    //     this.downloadFile( image );

    //   };

    downloadFile( image ) {
        console.log( 'DownloadFile', image.urls.regular );

        RNFS.downloadFile( {
            fromUrl: image.urls.regular,

            //toFile: '/Users/Aman.Kalra/Desktop/Codechef'+image.id+'.jpg'
            toFile: RNFS.DocumentDirectoryPath + image.id+ '.jpg'

            //`${RNFS.DocumentDirectoryPath}/${image.id}.jpg`
          } ).promise.then( ( { r } ) => {
              
              CameraRoll.saveToCameraRoll( RNFS.DocumentDirectoryPath + image.id+ '.jpg', 'photo' )
              .then( r => {
                 console.log( 'Image saved to gallery' ),
                 Alert.alert(
                    'Success',
                    'Image saved to Gallery',
                  );
                 }
                )
              .catch( ( err ) => console.log( err ) );
              console.log( 'File saved successfully', RNFS.DocumentDirectoryPath + image.id+ '.jpg' );
          } );
    }

    setAsWallpaper( image ) {
        console.log( 'setAsWallppaper' );
        WallPaperManager.setWallpaper( {uri: image.urls.regular }, ( res ) =>
        console.log( res ) );
        Alert.alert(
            'Success',
            'Image set as wallpaper successfully',
          );
    }

    tryingNavigation() {
        console.log( 'tryingNavigation' );
        this.props.navigation.navigate( 'Demo', {
            images: this.state.images,
        } );

    }

    render() {
        const image = this.props.route.params.data;
        console.log( 'props image is ', image );
        return(
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{flex: 1 }}>
                <Image
                        style = { { height: '100%', width: '100%'}}

                        source = {{ uri: image.urls.regular }}

                        //source = {{ uri: image.urls.raw + '&w=40&h=700' }}
                    />
                </View>
                <View style={{ flexDirection: 'row', paddingBottom: 0, justifyContent: 'space-around'}}>
                <TouchableOpacity style={ styles.button } activeOpacity = {0.4} onPress = { () => this.tryingNavigation( image ) }>
                        <MaterialCommunityIcons name="cloud-download" size={36} color={'black'}/>
                        <Text style={{color: 'black'}} > Save to Gallery</Text>
                </TouchableOpacity>
                   { 'android' === Platform.OS ?
                   <TouchableOpacity style={ styles.button } activeOpacity = {0.4} onPress = { () => this.setAsWallpaper( image ) }>
                        <MaterialCommunityIcons name="wallpaper" size={36} color={'black'}/>
                        <Text style={{color: 'black'}}> Set as Wallpaper </Text>
                    </TouchableOpacity>:null}
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create( {
    controls: {
        backgroundColor: 'white',
        flexDirection: 'row'

        // left: 0,
        // right: 0,
        // bottom: 100,
        // marginBottom: 10,
        // height: 80
    },
    button: {

        // backgroundColor: '#335EFF',
        paddingLeft: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
} );
