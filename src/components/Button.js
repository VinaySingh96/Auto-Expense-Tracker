import React from 'react';
import {Pressable, Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Use react-native-vector-icons
import {buttonColor, textColor as TextColor} from '../constants/Colour';
import {FONT_SIZES} from '../constants/Font';
import {DefaultStyle} from '../utils/DefaultStyle';

const ButtonComponent = ({
  label = 'Button',
  iconLeft,
  iconRight,
  onPress,
  disabled,
  backgroundColor = buttonColor.primary,
  textColor = '#FFF',
  fontSize = FONT_SIZES.BUTTON,
  paddingVertical,
  outline = false
}) => {
  return (
    <Pressable
      onPress={!disabled ? onPress : null} // Disable onPress if the button is disabled
      disabled={disabled} // Disable the Pressable component
      style={({pressed}) => [
        styles.button,
        {
          opacity: disabled ? 0.5 : pressed ? 0.7 : 1, // Adjust opacity for disabled and pressed states
          backgroundColor: disabled
            ? buttonColor.disabled
            : backgroundColor,
          paddingVertical,
          borderRadius: fontSize === FONT_SIZES.SMALL ? 4 : 8,
          borderWidth: outline ? 1 : 0,
          borderColor: TextColor.gray
        },
      ]}>
      <View style={styles.contentContainer}>
        {iconLeft && (
          <Icon
            name={iconLeft}
            size={24}
            color={textColor}
            style={styles.icon}
          />
        )}
        <Text
          style={[
            styles.label,
            {color: disabled ? buttonColor.disabledText : textColor, fontSize: fontSize},
          ]}>
          {label}
        </Text>
        {iconRight && (
          <Icon
            name={iconRight}
            size={24}
            color={textColor}
            style={styles.icon}
          />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...DefaultStyle.p2,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  icon: {
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
  },
});

export default ButtonComponent;
