import React, { useState, useRef } from 'react';
import { View, Text, Pressable, Animated, StyleSheet, ScrollView, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME_COLOR } from '../constants/Colour';

const AccordionItem = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);

  // Measure the height of the content
  const onContentLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    if (height !== contentHeight) {
      setContentHeight(height);
    }
  };

  // Interpolate height for animation
  const heightInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });

  // Toggle accordion state
  const toggleAccordion = () => {
    const toValue = expanded ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  return (
    <View style={styles.accordionItem}>
      <Pressable onPress={toggleAccordion} style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Icon
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="#333"
        />
      </Pressable>
      <Animated.View
        style={[styles.content, { height: heightInterpolation }]}
      >
        <View onLayout={onContentLayout} style={styles.contentWrapper}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const Accordion = ({ title, children }) => {
  return (
    <ScrollView style={styles.container}>
      <AccordionItem title={title}>{children}</AccordionItem>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
    // padding: 16,
    // width: '100%',
  },
  accordionItem: {
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: THEME_COLOR.section,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    overflow: 'hidden',
  },
  contentWrapper: {
    padding: 16,
  },
});

export default Accordion;