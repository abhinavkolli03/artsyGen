import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import React from 'react'

import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'

const Home = () => {
  return (
    <SafeAreaView className="bg-primary">
      <FlatList 
        data={[{id: 1}, {id: 2}, {id: 3}]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  JSMastery
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>


            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Trending Videos
              </Text>

              <Trending posts={[{ id: 1}, { id: 2}, { id: 3}] ?? []}/>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})