import { StyleSheet, Dimensions } from "react-native";
import { textColor, THEME_COLOR } from "../constants/Colour";
import { FONT_SIZES } from "../constants/Font";

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export const DefaultStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // paddingBottom: 10,
    backgroundColor: THEME_COLOR.background,
    gap: 10
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
    fontWeight: 'bold'
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
    gap: 4
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    height: 60,
    lineHeight: 60,
    backgroundColor: THEME_COLOR.primary,
    color: THEME_COLOR.white,
  },
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2
  },
  chipText: {
    color: '#333',
    fontSize: 10,
  },
});
