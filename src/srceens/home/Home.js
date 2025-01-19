import React, { useContext, useEffect } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import ButtonComponent from '../../components/Button'
import { DefaultStyle } from '../../utils/DefaultStyle'
import { getToken, saveToken } from '../../helper/Storage'
import { UserContext } from '../../context/UserContext'
import { PermissionsAndroid, Alert } from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';

const ReadSMS = () => {
  useEffect(() => {
    const requestSMSPermission = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: 'SMS Permission',
          message: 'App needs access to your SMS messages',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      
      console.log('requesting permission')
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const filter = {
          box: 'inbox', // 'inbox' or 'sent'
          indexFrom: 0, // Start from the first message
          maxCount: 10, // Read maximum 10 messages
        };

        SmsAndroid.list(
          JSON.stringify(filter),
          (fail) => {
            console.log('Failed with this error: ' + fail);
          },
          (count, smsList) => {
            console.log('Count: ', count);
            console.log('SMS List: ', smsList);

            const messages = JSON.parse(smsList);
            console.log('date = ', new Date(messages[0].date))
            console.log('date_sent = ', new Date(messages[0].date_sent))
            Alert.alert('Messages', JSON.stringify(messages, null, 2));
          }
        );
      } else {
        Alert.alert('Permission Denied');
      }
    };

    requestSMSPermission();
  }, []);

  return null;
};

const Home = ({ navigation }) => {
  const handleMakePayment = () => {
    navigation.navigate('Payment');
  }

  // useEffect(async() => {
  //   console.log(await getToken());
  // }, [])
  // const {user} = useContext(UserContext);
  // console.log(user)

  const handleLogout = async () => {
    await saveToken(null);
    navigation.reset({
      index: 0,
      routes: [{name: 'SignIn'}]
    })
  }
  
  return (
    <SafeAreaView>
      <View style={DefaultStyle.p2}>
        <Text>Yours this month's expense</Text>
        <ReadSMS />
      </View>
    </SafeAreaView>
  )
}

export default Home;