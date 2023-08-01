import { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Image, TouchableOpacity, View, Text } from "react-native";
import styles from "./loginpage.style";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

const LoginPage = ({ setUser }) => {
  const [request, response, promptAysnc] = Google.useAuthRequest({
    clientId:
      "1061093200462-pc5aun87i4lqa15ptden73dlcpp49kig.apps.googleusercontent.com",
    iosClientId:
      "1061093200462-pg4bch66tkgv8kkk4l5hpnjpdbv1ts9f.apps.googleusercontent.com",
    androidClientId:
      "1061093200462-i200gcv4dtdh3m4c6f214qdea2esda0l.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleEffect();
  }, [response]);

  async function handleEffect() {
    const user = await getLocalUser();
    if (!user) {
      if (response?.type === "success") {
        console.log("response", response);
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUser(user);
      authenticateFirebase(user);
      console.log("loaded locally");
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (accessToken) => {
    if (!accessToken) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUser(user);
      authenticateFirebase(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.loginPage}>
      <Text style={styles.loginText}>Please Sign in To Continue</Text>
      <TouchableOpacity
        style={styles.loginButonContainer}
        disabled={!request}
        onPress={() => {
          promptAysnc();
        }}
      >
        <Image
          style={styles.loginButtonImage}
          resizeMode="contain"
          source={{
            uri: "https://onymos.com/wp-content/uploads/2020/10/google-signin-button.png",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;
