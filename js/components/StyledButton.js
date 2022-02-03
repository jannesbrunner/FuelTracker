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
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "#b3b3b3",
        uppercase: true
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: "#00a400",
        uppercase: true
    }
})
