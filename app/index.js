import axios from "axios";

import 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';

import { COLORS, icons, SIZES } from "../constants";
import { ScreenHeaderBtn, LoginPage } from "../components"
import HomeView from '../components/home/homeview/HomeView';
import MerchantList from '../assets/database/merchant_details';
import CardDetails from "../assets/database/card_details";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAI-Tzoufw0gYb4OrsfJocQ5hGH5F1853A",
  authDomain: "cardtracker-d2358.firebaseapp.com",
  projectId: "cardtracker-d2358",
  storageBucket: "cardtracker-d2358.appspot.com",
  messagingSenderId: "1061093200462",
  appId: "1:1061093200462:web:431dc6d34f23750b9be91f",
  databaseURL: "https://cardtracker-d2358-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);

const Home = () => {
  const [user, setUser] = useState(null);
  const [merchants, setMerchants] = useState([]);
  const [cards, setCards] = useState([])
  const [transhistory, setTranshistory] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.npoint.io/1c52c7ea1276f9a57c36")
      .then((response) => {
        data = Array.from(response.data);
        // console.log(data);
        // data = data.filter((n) => !merchants.includes(n));
        setMerchants([...data, ...MerchantList]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://api.npoint.io/38ba4ab8dd4dabb430d7")
      .then((response) => {
        data = Array.from(response.data);
        // console.log(data);
        // data = data.filter((n) => !cards.includes(n));
        setCards([...data, ...CardDetails]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user)
      dbtools.read(user.id, setTranshistory);
    }
  }, [user]);

  console.log(transhistory)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.nothing} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={user?.picture ?? "..\assets\images\profile.png"} dimension="100%" />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          {
            !user
              ? (<LoginPage setUser={setUser} />)
              : (<HomeView user={user} merchants={merchants} cards={cards} transhistory={transhistory} setTranshistory={setTranshistory} />)
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home; 