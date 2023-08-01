import { useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";

import styles from "./wallet.style";
import Carousel from "react-native-snap-carousel";
import { useRouter } from "expo-router";

const Card = ({ item }) => {
  const router = useRouter();
  return (
    // <TouchableOpacity
    //   onPress={() => {
    //   }}
    //   style={styles.cardContainer}
    // >
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: item.image_link }}
        resizeMode="contain"
        style={styles.cardImage}
      />
      <Text style={styles.cardNameText}>{item.card_name}</Text>
    </View>
    // </TouchableOpacity>
  );
};

const Wallet = ({ setActiveCardIndex, cardList }) => {
  const horizontalMargin = 15;
  const slideWidth = 220;
  const sliderWidth = Dimensions.get("window").width;
  const itemWidth = slideWidth + horizontalMargin * 2;

  return (
    <View style={styles.walletContainer}>
      <Carousel
        data={cardList}
        renderItem={(item) => <Card item={item.item} />}
        onSnapToItem={setActiveCardIndex}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
      />
    </View>
  );
};

export default Wallet;
