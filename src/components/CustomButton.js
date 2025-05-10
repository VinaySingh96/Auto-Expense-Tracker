import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { THEME_COLOR } from '../constants/Colour';


const CustomButton = ({ onPress, title, mode = 'text', icon = null, disabled = false }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.button,
          mode === 'contained' && styles.contained,
          mode === 'outlined' && styles.outlined,
          disabled && styles.disabled,
        ]}
        disabled={disabled}
      >
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <Text
          style={[
            styles.text,
            mode === 'contained' && styles.containedText,
            mode === 'outlined' && styles.outlinedText,
            disabled && styles.disabledText,
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    margin: 5,
  },
  contained: {
    backgroundColor: THEME_COLOR.primary,
  },
  outlined: {
    borderWidth: 1,
    borderColor: THEME_COLOR.primary,
  },
  text: {
    fontSize: 16,
    color: THEME_COLOR.primary,
  },
  containedText: {
    color: THEME_COLOR.white,
  },
  outlinedText: {
    color: THEME_COLOR.primary,
  },
  icon: {
    marginRight: 8,
  },
  disabled: {
    backgroundColor: '#e0e0e0',
    borderColor: '#e0e0e0',
  },
  disabledText: {
    color: THEME_COLOR.textSecondary
  },
});


export default CustomButton;