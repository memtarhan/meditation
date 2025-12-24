import AsyncStorage from '@react-native-async-storage/async-storage';

// Save user profile
export const saveUserProfile = async (profile) => {
    try {
        await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
    } catch (error) {
        console.error('Error saving user profile:', error);
    }
};

// Retrieve user profile
export const getUserProfile = async () => {
    try {
        const profile = await AsyncStorage.getItem('userProfile');
        return profile ? JSON.parse(profile) : null;
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
};

// Save user actions
export const saveUserAction = async (action) => {
    try {
        let actions = await AsyncStorage.getItem('userActions');
        actions = actions ? JSON.parse(actions) : [];
        actions.push(action);
        await AsyncStorage.setItem('userActions', JSON.stringify(actions));
    } catch (error) {
        console.error('Error saving user action:', error);
    }
};

// Retrieve user actions
export const getUserActions = async () => {
    try {
        const actions = await AsyncStorage.getItem('userActions');
        return actions ? JSON.parse(actions) : [];
    } catch (error) {
        console.error('Error fetching user actions:', error);
    }
};

// Save user notifications
export const saveNotification = async (notification) => {
    try {
        let notifications = await AsyncStorage.getItem('userNotifications');
        notifications = notifications ? JSON.parse(notifications) : [];
        notifications.push(notification);
        await AsyncStorage.setItem('userNotifications', JSON.stringify(notifications));
    } catch (error) {
        console.error('Error saving notification:', error);
    }
};

// Retrieve notifications
export const getNotifications = async () => {
    try {
        const notifications = await AsyncStorage.getItem('userNotifications');
        return notifications ? JSON.parse(notifications) : [];
    } catch (error) {
        console.error('Error fetching notifications:', error);
    }
};

// Save user details
export const saveUserDetails = async (userDetails) => {
    try {
        await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
    } catch (error) {
        console.error('Error saving user details:', error);
    }
};

// Retrieve user details
export const getUserDetails = async () => {
    try {
        const userDetails = await AsyncStorage.getItem('userDetails');
        return userDetails ? JSON.parse(userDetails) : null;
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
};

// Remove user details (for logout)
export const removeUserDetails = async () => {
    try {
        await AsyncStorage.removeItem('userDetails');
    } catch (error) {
        console.error('Error removing user details:', error);
    }
};

