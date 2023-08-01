import { Text, View, Animated, TouchableOpacity, Easing } from "react-native";

import styles from "./cardinfo.style";

const CardInfo = ({
  cardList,
  activeCardIndex,
  mcc,
  searchTerm,
  price,
  addTransaction,
}) => {
  const activeCard = cardList[activeCardIndex];
  const amount = activeCard.amount_spent;
  const currentCashBack = activeCard.total_cashback;
  price = price ? parseFloat(price) : 0;

  const isExcluded = activeCard.isExcluded(mcc, searchTerm);
  const cashbackRate = activeCard.getCashBackRate(mcc, searchTerm);
  const minimumSpend = activeCard.minimum_spend;
  const percent = minimumSpend ? amount / minimumSpend : 1;
  const percent2 = minimumSpend ? (amount + price) / minimumSpend : 1;
  const newCashBack = (cashbackRate * price) / 100;
  const totalCashBack = newCashBack + currentCashBack;

  const calcDegrees = (percent) => {
    percent = percent > 1 ? 1 : percent;
    let degrees = percent * 270 - 90;
    return degrees;
  };

  const degrees = calcDegrees(percent);
  const degrees2 = calcDegrees(percent2);

  let spinValue = new Animated.Value(0);

  const handleSubmit = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start((animation) => {
      if (animation.finished) {
        addTransaction(cashbackRate);
      }
    });
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: [degrees + "deg", degrees2 + "deg" ?? degrees + "deg"],
  });

  const animatedStyle = { transform: [{ rotate: spin }] };

  return (
    <View style={styles.infoContainer}>
      <View style={styles.progressBarBack}>
        {minimumSpend ? (
          <View style={styles.progressBarFront(degrees2, true)} />
        ) : (
          <></>
        )}
        <Animated.View
          style={{
            ...styles.progressBarFront(degrees, false, minimumSpend == 0),
            ...animatedStyle,
          }}
        />

        <Text style={styles.totalCashBack}>${amount.toFixed(2)} /</Text>
        <Text style={styles.description}>
          {minimumSpend ? "$" + minimumSpend : "No"} Minimum Spend
        </Text>
        <Text style={styles.additionalCashBack(isExcluded)}>
          {isExcluded ? "Excluded" : "$" + newCashBack.toFixed(2)}
        </Text>
        <Text style={styles.additionalDescription(isExcluded)}>
          New Cashback
        </Text>
        <Text style={styles.totalCashBack}>${totalCashBack.toFixed(2)}</Text>
        <Text style={styles.description}>Total Cashback</Text>
      </View>
      <View style={styles.noMansLand}>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={price == 0}
        >
          <Text style={styles.submitButton(price == 0)}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardInfo;
