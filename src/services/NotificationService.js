import PushNotification from "react-native-push-notification";
import { getEndOfMonthDate } from "../utils/helper";

class NotificationService {
  constructor() {
    if(NotificationService.instance) {
      return NotificationService.instance;
    }
    console.log('Notification service created')
    NotificationService.instance = this;
  }

  configure = () => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },

      requestPermissions: Platform.OS === 'ios',
    });
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id',
        channelName: 'Default Channel',
        importance: 4, // High importance
        vibrate: true,
      },
      created => console.log(`Channel created: ${created}`),
    );
    //   PushNotification.configure({
    //     onRegister: function (token) {
    //       console.log("TOKEN:", token);
    //     },

    //     onNotification: function (notification) {
    //       console.log('Notification received:', notification);
    //     },
    //     popInitialNotification: true,
    //     requestPermissions: true,
    //   });
    // };

    // PushNotification.configure({
    //   // (optional) Called when Token is generated (iOS and Android)
    //   onRegister: function (token) {
    //     console.log('TOKEN:', token);
    //   },

    //   // (required) Called when a remote is received or opened, or local notification is opened
    //   onNotification: function (notification) {
    //     console.log('NOTIFICATION:', notification);

    //     // process the notification

    //     // (required) Called when a remote is received or opened, or local notification is opened
    //     notification.finish(PushNotificationIOS.FetchResult.NoData);
    //   },

    //   // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    //   onAction: function (notification) {
    //     console.log('ACTION:', notification.action);
    //     console.log('NOTIFICATION:', notification);

    //     // process the action
    //   },

    //   // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    //   onRegistrationError: function (err) {
    //     console.error(err.message, err);
    //   },

    //   // IOS ONLY (optional): default: all - Permissions to register.
    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true,
    //   },

    //   // Should the initial notification be popped automatically
    //   // default: true
    //   popInitialNotification: true,

    //   /**
    //    * (optional) default: true
    //    * - Specified if permissions (ios) and token (android and ios) will requested or not,
    //    * - if not, you must call PushNotificationsHandler.requestPermissions() later
    //    * - if you are not using remote notification or do not have Firebase installed, use this:
    //    *     requestPermissions: Platform.OS === 'ios'
    //    */
    //   requestPermissions: true,
    // });
  };

  localNotification = (title, message, id) => {
    console.log('Sending notification service')
    PushNotification.localNotification({
      ...(id && { id }),
      channelId: "default-channel-id",
      title: title,
      message: message,
      playSound: true,
      soundName: "default",
      // bigPicture: 'https://camo.githubusercontent.com/ba9ebb799048604d02db2e963b66eaf1c6607fae4b5eceee399df6e320a86839/68747470733a2f2f706e672e706e67747265652e636f6d2f706e672d766563746f722f32303233313231352f6f75726c617267652f706e67747265652d757365722d69636f6e2d77656172696e672d676c61737365732d706e672d696d6167655f31313336363333302e706e67', // Remote Image URL
      bigPicture: require('../assets/logo.jpg'), // Local Image
      largeIcon: "ic_launcher", // Default App Icon (stored in android/app/src/main/res)
      smallIcon: "ic_notification", // Default Small Icon
    });
  };

  scheduleNotification = (title, message, date, id) => {
    PushNotification.localNotificationSchedule({
      ...(id && { id }),
      channelId: "default-channel-id",
      title: title,
      message: message,
      date: date,
      // date: new Date(Date.now() + 10 * 1000), // Fire after 10 seconds
      allowWhileIdle: true, // Ensures it works even in Doze mode (Android)
    });
    console.log(`Notification scheduled for : ${title} on ${date}`)
  }

  cancelAllScheduledNotification() {
    PushNotification.cancelAllLocalNotifications();
  }

  scheduleMonthEndReportNotification() {
    const currentMonth = (new Date()).toLocaleString("en-US", { month: "long" });
    const title = 'Monthly Expense Report';
    const message = `View your ${currentMonth} month expense in detail.`;
    const date = getEndOfMonthDate();
    const id = 'expense_summary';
    this.scheduleNotification(title, message, date, id);
  }
}

export default NotificationService;
