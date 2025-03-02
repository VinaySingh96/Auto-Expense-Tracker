import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { THEME_COLOR } from '../constants/Colour';

const CustomModal = ({
  visible,
  onClose,
  children,
  title = 'Custom Modal',
  save = '',
  onSave,
}) => {
  return (
    <Modal transparent visible={visible} animationType="slide">
      {/* Overlay: Close modal when clicking outside */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          {/* Modal Content: Prevent clicks inside from closing the modal */}
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              {/* Title Bar */}
              <View style={styles.titleContainer}>
                <Text style={styles.modalTitle}>{title}</Text>
              </View>

              {/* Scrollable Content */}
              <View style={styles.contentContainer}>
                {children}
              </View>

              {/* Close Button */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={onClose}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
                {save && (
                  <TouchableOpacity style={styles.button} onPress={onSave}>
                    <Text style={styles.buttonText}>{save}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    overflow: 'hidden',
  },
  titleContainer: {
    width: '100%',
    height: 50,
    backgroundColor: THEME_COLOR.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
    width: '100%',
    padding: 10,
    paddingBottom: 80, // Add padding to avoid overlap with buttons
  },
  buttonContainer: {
    position: 'absolute', // Position at the bottom
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'white', // Ensure buttons are visible
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0', // Add a border for separation
  },
  button: {
    flex: 1,
    backgroundColor: THEME_COLOR.primary,
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomModal;