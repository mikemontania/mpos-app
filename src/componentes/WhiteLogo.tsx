import React from 'react'
import { Image, View } from 'react-native'

export const WhiteLogo = () => {
    return (
        <View style={{
            alignItems: 'center', 
        backgroundColor:'white',
            borderRadius:50
            
        }} 
        >
            <Image 
                source={ require('../assets/logo-mb.png') }
                style={{
                    width: 250,
                    height: 100,   
                    resizeMode: 'contain',
                }}
            />
        </View>
    )
}
