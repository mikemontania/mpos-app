import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { THEME_COLOR } from '../theme/theme'

export const LoadingScreen = () => {
    return (
        <View style={{ 
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ActivityIndicator 
                size={ 50 }
                color={THEME_COLOR}
            />
        </View>
    )
}
