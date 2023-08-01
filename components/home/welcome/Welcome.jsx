import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";
import MerchantList from "../../../assets/database/merchant_details";

const Welcome = ({
  user,
  mcc,
  setMcc,
  searchTerm,
  setSearchTerm,
  price,
  setPrice,
  setMerchantId,
  transhistory,
  merchants,
}) => {
  const name = user ? user.given_name : "Stranger";
  const [relatedSearch, setRelatedSearch] = useState([]);

  useEffect(() => {
    setRelatedSearch(merchants);
  }, []);

  if (!relatedSearch) {
    return <></>;
  }

  const handleTextChange = (text) => {
    setSearchTerm(text);
    if (text == "") {
      setMcc(null);
      setRelatedSearch(merchants);
    } else {
      const filteredList = merchants.filter((i) =>
        i.merchant_name.toLowerCase().includes(text.toLowerCase())
      );
      const exactMatch = merchants.filter(
        (i) => i.merchant_name.toLowerCase() == text.toLowerCase()
      );

      if (exactMatch.length) {
        setMcc(exactMatch[0].mcc);
        setMerchantId(exactMatch[0].merchant_id);
        setRelatedSearch([]);
      } else {
        setMcc(null);
        setMerchantId(0);
        setRelatedSearch(filteredList);
      }
    }
  };

  const updatePrice = (n) => {
    // n =  ? n.toString() : "";
    n = n.replace(/[^\d\.]/, "");
    console.log(n);
    if (n.match(/^\d+\.?\d*$/)) {
      setPrice(n);
    } else {
      setPrice("");
    }

    // n = n.replace(".", "");
    // while (n.length > 3) {
    //   if (n.startsWith("0")) {
    //     n = n.slice(1);
    //   }
    // }
    // console.log(n);
    // n = n.padStart(3, "0");
    // n = n.slice(0, n.length - 2) + "." + n.slice(n.length - 2);
    // console.log(n);
    return n.toString();
  };

  const sortByFreq = (a, b) => {
    const countFreq = (merchant) => {
      return transhistory.filter((t) => t.merchant_id == merchant.merchant_id);
    };
    return countFreq(a) < countFreq(b);
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello {name}</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper(mcc)}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={handleTextChange}
            placeHolder="Where are you shopping?"
            placeholder="Where are you shopping?"
          />
        </View>
      </View>

      <View style={styles.tabsContainer}>
        {mcc ? (
          <View style={styles.searchWrapper(price)}>
            <TextInput
              style={styles.searchInput}
              value={price}
              onChangeText={(value) => updatePrice(value)}
              inputMode="numeric"
              placeHolder="How much are you paying?"
              placeholder="How much are you paying?"
              autoFocus
            />
          </View>
        ) : (
          <FlatList
            data={relatedSearch.sort(sortByFreq).slice(0, 5)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tab}
                onPress={() => {
                  handleTextChange(item.merchant_name);
                }}
              >
                <Text style={styles.tabText}>{item.merchant_name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.merchant_name}
            contentContainerStyle={{ columnGap: SIZES.small }}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Welcome;
