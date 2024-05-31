import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Redirect, Stack } from 'expo-router';
import Loader from "../../components/Loader"
import React from 'react'

const AuthLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen 
                    name="sign-in"
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="sign-up"
                    options={{
                        headerShown: false
                    }}
                />
            </Stack>

            <StatusBar backgroundColor="#161622" style="light" />
        </>
    )
}

export default AuthLayout

const styles = StyleSheet.create({})