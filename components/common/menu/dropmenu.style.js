import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  dropMenu: {
    position: "absolute",
    backgroundColor: "red",
    width: 150,
    height: 150,
    right: SIZES.xSmall,
    top: SIZES.large
  },
  menuItems: {
  }
});

export default styles;


