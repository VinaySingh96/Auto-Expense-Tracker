import React, {useContext, useEffect} from 'react';
import {View, Image, StyleSheet, Animated, useWindowDimensions} from 'react-native';
import {DimensionContext} from '../../context/DimensionContext';
import {Easing} from 'react-native-reanimated';

const Splash = ({onFinish}) => {
  const scaleAnim = new Animated.Value(1); // Initial scale value
  const opacityAnim = new Animated.Value(1); // Opacity animation for fade-out
  // const {width, height} = useContext(DimensionContext);
  const {height, width} = useWindowDimensions();

  const styles = StyleSheet.create({
    splashContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff', // Background color of the splash screen
    },
    image: {
      width: width, // Adjust based on your image size
      height: height,
    },
  });

  useEffect(() => {
    // Start the zoom and fade-out animation
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1.5, // Zoom in
        duration: 1500, // Duration in milliseconds
        easing: Easing.inOut(Easing.ease), // Smooth easing curve
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0, // Fade out
        duration: 1500, // Same duration as zoom for synchronization
        delay: 200, // Slight delay to keep the image visible initially
        easing: Easing.inOut(Easing.ease), // Smooth easing curve
        useNativeDriver: true,
      }),
    ]).start(() => {
      onFinish(); // Call the callback to finish the splash screen
    });
  }, [scaleAnim, opacityAnim, onFinish]);

  return (
    <View style={styles.splashContainer}>
      <Animated.Image
        source={require('../../assets/splash.jpg')} // Replace with your image path
        style={[
          styles.image,
          {
            transform: [{scale: scaleAnim}],
            opacity: opacityAnim,
          },
        ]}
        // resizeMode="contain"
      />
    </View>
  );
};

export default Splash;
