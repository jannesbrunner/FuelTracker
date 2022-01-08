import React, { Component, PropTypes } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function StyledButton(props) {
    if (props.visible || props.visible === undefined) {
        return (
            <Pressable onPress={props.onPress} style={[Style.button, props.buttonStyle]}>
                <Text
                    style={[Style.buttonText, props.textStyle]}>
                    {props.title}    
                </Text>
            </Pressable>
        );
    } else {
        return null
    }

}

const Style = StyleSheet.create({
    button: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'blue',
    },
    buttonText: {
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: 'white',
    }
})
