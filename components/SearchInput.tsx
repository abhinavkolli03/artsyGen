import { Text, View, TextInput, StyleProp, TextInputProps, TouchableOpacity, Image, ViewStyle } from 'react-native'
import React, {useState} from 'react'
import icons from '../constants/icons';

interface SearchInputProps {
    title: string;
    value: string;
    placeholder: string;
    handleChangeText: (text: string) => void;
    otherStyles?: StyleProp<ViewStyle>;
    keyboardType?: TextInputProps['keyboardType'];
}

const SearchInput: React.FC<SearchInputProps> = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
  
    return (
        <View className="flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
            <TextInput 
                className="text-base mt-0.5 text-white flex-1 font-pregular text-lg pb-5"
                value={value}
                placeholder="Search for a video topic"
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChangeText}
                secureTextEntry={title === 'Password' && !showPassword}
                {...props}
            />

            <TouchableOpacity>
                <Image 
                    source={icons.search}
                    className="w-5 h-5"
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput