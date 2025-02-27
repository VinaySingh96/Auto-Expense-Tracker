import { StyleSheet, Dimensions } from "react-native";
import { textColor, THEME_COLOR } from "../constants/Colour";
import { FONT_SIZES } from "../constants/Font";

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export const DefaultStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    // paddingBottom: 10,
    backgroundColor: THEME_COLOR.background,
  },
  itemsCenter: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: textColor.textDark,
    backgroundColor: 'red',
    textAlign: 'center'
  },
  fontBold: {

  },
  smallText: {
    fontSize: FONT_SIZES.EXTRA_SMALL,
    color: textColor.subtext
  },
  primaryHeading: {
    textAlign: 'center',
    fontSize: FONT_SIZES.HEADING,
    color: textColor.heading,
    fontWeight: '600',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  p1: {
    padding: 6
  },
  p2: {
    padding: 12
  },
  p3: {
    padding: 18
  },

  welcomeImage: {
    width: deviceWidth,
    height: deviceWidth/2,
    resizeMode: 'contain',
    marginBottom: 20
  },

  backgroundColor: {
    backgroundColor: '#FFFFFF'
  },
  flexRow: {
    flexDirection: 'row',
    gap: 10
  }
});
