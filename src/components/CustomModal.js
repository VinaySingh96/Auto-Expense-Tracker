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

const CustomModal = ({visible, onClose, children, title = 'Custom Modal'}) => {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Title Bar */}
            <View style={styles.titleContainer}>
              <Text style={styles.modalTitle}>{title}</Text>
            </View>

            {/* Scrollable Content */}
            <View style={styles.contentContainer}>
              <TouchableWithoutFeedback>
                {children}
              </TouchableWithoutFeedback>
            </View>

            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
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
    // padding: 10,
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
    paddingBottom: 120
  },
  closeButton: {
    width: 80,
    padding: 8,
    backgroundColor: THEME_COLOR.primary,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 14,
    position: 'absolute',
    bottom: 2
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomModal;
