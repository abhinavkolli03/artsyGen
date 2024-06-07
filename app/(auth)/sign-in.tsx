import { Text, View, ScrollView, Dimensions, Alert, Image } from 'react-native';
import React, {useState} from 'react';
import {Link, router} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCurrentUser, signIn } from '../../lib/appwrite';

import FormField from '@/components/FormField';
import images from '../../constants/images';
import CustomButton from '@/components/CustomButton';

const SignIn = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const submit = async () => {
        if (!form.password || !form.email) {
            Alert.alert('Error', "Please fill in all the fields")
        }

        setSubmitting(true);

        try {  
            await signIn(form.email, form.password);
            const result = await getCurrentUser();
            if (result) {
                router.replace('/home');
            } else {
                throw new Error("Signup failed.");
            }
        } catch (error) {
            Alert.alert("Error", (error as Error).message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[85vh] px-4 my-6">
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

                    <CustomButton 
                        title="Sign in"
                        handlePress={submit}
                        containerStyles='mt-7'
                        isLoading={isSubmitting}
                    />

                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Don't have an account?
                        </Text>
                        <Link href="/sign-up" className="text-lg font-psemibold text-secondary">Sign Up</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
    }

export default SignIn