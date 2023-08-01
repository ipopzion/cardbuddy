import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../../../constants";

const styles = StyleSheet.create({
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  progressBar: {
    alignItems: "center",
    justifyContent: "center",
  },
  progressBarBack: {
    height: 250,
    width: 250,
    borderRadius: 125,
    borderColor: COLORS.gray2,
    borderWidth: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  progressBarFront: (degrees, isSecondary, filled = false) => ({
    position: "absolute",
    height: 250,
    width: 250,
    borderRadius: 125,
    borderLeftColor: isSecondary ? "limegreen" : "green",
    borderBottomColor: degrees < 0 ? 'rgba(158, 150, 150, .01)' : isSecondary ? "limegreen" : "green",
    borderRightColor: degrees < 90 ? 'rgba(158, 150, 150, .01)' : isSecondary ? "limegreen" : "green",
    borderTopColor: filled ? "green" : 'rgba(158, 150, 150, .01)',
    borderWidth: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: isSecondary ? [{ rotate: degrees + "deg" }] : [],

  }),
  progressTracker: (transX, transY, isSecondary) => (
    transX ?
      {
        position: "absolute",
        height: 7,
        width: 7,
        backgroundColor: isSecondary ? "limegreen" : "green",
        borderRadius: 3.5,
        transform: `translate(${transX}px, ${-transY}px)`,
        elevation: 1,
      } : {}),
  additionalCashBack: (isExcluded) => ({
    color: isExcluded ? "red " : "green",
    fontSize: SIZES.xxLarge,
    marginTop: SIZES.small,
  }),
  additionalDescription: (isExcluded) => ({
    color: isExcluded ? "red " : "green",
    fontSize: SIZES.medium,
    marginBottom: SIZES.small
  }),
  description: {
    color: COLORS.gray,
    fontSize: SIZES.small,
  }, totalCashBack: {
    fontSize: SIZES.medium,
  },
  noMansLand: {
    width: "100%",
    height: 60,
    backgroundColor: COLORS.lightWhite,
    transform: [{ translateY: -41 }],
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    elevation: 0,
  },
  submitButton: (disabled) => ({
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    padding: SIZES.small,
    width: 125,
    backgroundColor: disabled ? COLORS.gray2 : "green",
    borderRadius: SIZES.xSmall,
    textAlign: "center",
    marginTop: 12,
  }),
});

export default styles;
