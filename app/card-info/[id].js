import { useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native'
import { Stack, useRouter, useSearchParams } from 'expo-router'

import { ScreenHeaderBtn } from "../../components"
import { COLORS, icons, SIZES } from "../../constants"

import CardDetails from '../../assets/database/card_details'

const CardInfo = () => {
  const cardInfo = useSearchParams();
  const router = useRouter();
  // const cardInfo = params.cardInfo
  console.log(params)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen options={{
        headerStyle: { backgroundColor: COLORS.lightWhite },
        headerShadowVisible: false,
        headerBackVisible: false,
        headerLeft: () => (
          <ScreenHeaderBtn
            iconUrl={icons.left}
            dimension="60%"
            handlePress={() => router.back()}
          />),
        headerRight: () => (
          <ScreenHeaderBtn
            iconUrl={icons.share}
            dimension="60%"
            handlePress={() => router.back()}
          />),
        headerTitle: ''
      }} />

      <>
        <ScrollView showsVerticalScrollIndicator={false} >
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            <Text>{cardInfo.card_name}</Text>
            <FlatList
              data={cardInfo.cardhistory}
              renderItem={(t) => <View><Text>{t.amount}</Text></View>}

            />
          </View>
        </ScrollView>
      </>
    </SafeAreaView >
  )
}

export default CardInfo