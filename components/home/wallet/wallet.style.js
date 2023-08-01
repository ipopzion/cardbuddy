import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  walletContainer: {
    marginTop: SIZES.medium,
  },
  cardContainer: {
    height: 220,
    width: 230,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
  },
  cardImage: {
    height: "70%",
    width: "100%",
  },
  cardNameText: {
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
});

export default styles;
