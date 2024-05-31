import { Text, View, ScrollView, Dimensions, Alert, Image } from 'react-native';
import React, {useState} from 'react';
import {Link, router} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField';

import images from '../../constants/images';
import CustomButton from '@/components/CustomButton';

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify0center min-h-[85vh] px-4 my-6">
                    <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log in to Aora</Text>
                    
                    <FormField 
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ 
                            ...form,
                            email: e
                        })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />

                    <FormField 
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({ 
                            ...form,
                            password: e
                        })}
                        otherStyles="mt-7"
                        keyboardType="password"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
    }

export default SignIn