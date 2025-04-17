import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface IProps{
    placeholder: string;
    onPress?: () => void;
    value?: string;
    onChangeText?: (text: string) => void;
    autoFocus?: boolean | false
}

const SearchBar = ({placeholder, onPress, value, onChangeText, autoFocus} : IProps) => {
  return (
    <View style={{display: "flex", flexDirection: "row", alignItems: "center", borderRadius: 50}} className='bg-dark-200 rounded-full px-5 py-2'>
      <Image
       source={icons.search}
       className='size-5'
       resizeMode='contain'
       tintColor={"#ab8bff"}
      />
      <TextInput
       autoFocus={autoFocus}
       onPress={onPress}
       placeholder={placeholder}
       value={value}
       onChangeText={onChangeText}
       placeholderTextColor={"#a8b5db"}
       className='flex-1 ml-2 text-white'
       />
    </View>
  )
}

export default SearchBar