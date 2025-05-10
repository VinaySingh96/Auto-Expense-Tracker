import MMKVStorage from 'react-native-mmkv-storage';

// Initialize MMKV storage
const MMKV = new MMKVStorage.Loader().initialize();

/**
 * Save a token to MMKV storage
 * @param {string} token - The token to be saved
 */
export const saveToken = async (token) => {
  try {
    await MMKV.setStringAsync('userToken', token);
    console.log('Token saved successfully.');
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

/**
 * Retrieve the token from MMKV storage
 * @returns {Promise<string | null>} - The retrieved token, or null if not found
 */
export const getToken = async () => {
  try {
    const token = await MMKV.getStringAsync('userToken');
    if (token) {
      console.log('Token retrieved successfully.');
      return token;
    }
    console.log('No token found.');
    return null;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

/**
 * Save a value to MMKV storage by key.
 * @param {string} key - The key under which the value will be stored.
 * @param {any} value - The value to store (can be a string, number, boolean, object, or array).
 * @returns {Promise<boolean>} - Returns true if the value was saved successfully.
 */
export const saveValue = async (key, value) => {
  try {
    await MMKV.setStringAsync(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error saving value to MMKV:', error);
    return false;
  }
};

/**
 * Get a value from MMKV storage by key.
 * @param {string} key - The key for the value to retrieve.
 * @returns {Promise<any>} - Returns the stored value or null if the key does not exist.
 */
export const getValue = async (key) => {
  try {
    const value = await MMKV.getStringAsync(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error retrieving value from MMKV:', error);
    return null;
  }
};

/**
 * Remove a value from MMKV storage by key.
 * @param {string} key - The key for the value to remove.
 * @returns {Promise<boolean>} - Returns true if the value was removed successfully.
 */
export const removeValue = async (key) => {
  try {
    await MMKV.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing value from MMKV:', error);
    return false;
  }
};

/**
 * Clear all data from MMKV storage.
 * @returns {Promise<boolean>} - Returns true if the storage was cleared successfully.
 */
export const clearStorage = async () => {
  try {
    await MMKV.clearStore();
    return true;
  } catch (error) {
    console.error('Error clearing MMKV storage:', error);
    return false;
  }
};
