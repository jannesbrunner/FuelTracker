import React, { Component, PropTypes } from 'react';
import { Button, View, StyleSheet } from 'react-native';

export default function StyledButton(props) {
    if (props.visible || props.visible === undefined) {
        return (
            <View style={[Style.homeButton, props.style]}>
                <Button
                    title={props.title}
                    onPress={props.onPress}
                />
            </View>
        );
    } else {
        return null
    }

}

const Style = StyleSheet.create({
    homeButton: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'blue',
    }
})
