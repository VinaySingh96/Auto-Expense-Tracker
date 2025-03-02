import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {THEME_COLOR} from '../constants/Colour';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NothingToShow = ({
  message = 'Nothing to show',
  icon = 'playlist-check',
  iconSize = 100,
}) => {
  return (
    <View style={{marginVertical: 'auto'}}>
      <Icon name={icon} style={[styles.icon, {fontSize: iconSize}]} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    color: THEME_COLOR.textSecondary,
  },
  icon: {
    fontSize: 100,
    textAlign: 'center',
    marginTop: 20,
    color: THEME_COLOR.textSecondary,
  },
});

export default NothingToShow;
