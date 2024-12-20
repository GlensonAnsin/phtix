import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from 'react-native'
import React, { useCallback } from 'react'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';

const AdminDashboard = ({ events, setEvents, adminName, setAdminName, }) => {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });
      
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(`${year}-${month}-${day}`);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayOfWeek = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const monthName = months[date.getMonth()];
    const fullYear = date.getFullYear();

    return `${dayOfWeek} ${dayOfMonth} ${monthName} ${fullYear}`;
  };

  const handeDelete = (id) => {
    Alert.alert(
      'Delete event',
      'Are you sure you want to delete this event?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            const updatedEvents = events.filter(event => event.eventId !== id);
            setEvents(updatedEvents);
          }
        }
      ],
      { cancelable: false }
    );
  };

  const handeLogout = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
    setAdminName('Admin: ');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar style='light' backgroundColor='black' />
        <View style={styles.adminContainer}>
          <Text style={styles.appNameLbl1}>PH<Text style={styles.appNameLbl2}>Tix</Text></Text>
          <Text style={styles.adminTxt}>{adminName}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.addEventBtn}
              onPress={() => (
                navigation.navigate('Add Event')
              )}
            >
              <Text style={styles.addEventTxt}>Add event</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={handeLogout}
            >
              <Text style={styles.logoutTxt}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.eventLbl}>Events</Text>
        <View style={styles.hLine} />
        <FlatList
          style={styles.eventContainer}
          data={events}
          keyExtractor={(item) => item.eventId.toString()}
          renderItem={({ item }) => (
            <View style={styles.event}>
              <Image 
                source={{ uri: item.eventPoster }}
                style={styles.eventPoster}
              />
              <Text style={styles.eventName}>{item.eventName}</Text>
              <Text style={styles.artist}>{item.artist}</Text>
              <Text style={styles.city}>{item.city}</Text>
              <Text style={styles.eventVenue}>{item.eventVenue}</Text>
              <Text style={styles.date}>{formatDate(item.date)}</Text>
              <Text style={styles.regularTicket}>Regular Ticket: ₱ {item.regular}</Text>
              <Text style={styles.vipTicket}>VIP Ticket: ₱ {item.vip}</Text>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => handeDelete(item.eventId)}
              >
                <Text style={styles.deleteTxt}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  appNameLbl1: {
    fontSize: 40,
    fontFamily: 'Poppins_700Bold',
    color: '#007bff',
    alignSelf: 'center',
  },
  appNameLbl2: {
    fontFamily: 'Poppins_700Bold_Italic',
    color: 'red',
  },
  adminContainer: {
    backgroundColor: '#f8f8ff',
    width: '100%',
    padding: 20,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    elevation: 5, //android
    shadowColor: '#000', //ios
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  adminTxt: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 15,
  },
  addEventBtn: {
    width: '40%',
    height: 45,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  addEventTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  logoutBtn: {
    width: '40%',
    height: 45,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  logoutTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  eventLbl: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
    color: '#666',
  },
  hLine: {
    borderWidth: 0.5,
    width: '90%',
    marginBottom: 10,
  },
  eventContainer: {
    width: '90%',
    padding: 5,
  },
  event: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#f8f8ff',
    borderRadius: 10,
    padding: 15,
    elevation: 3, //android
    shadowColor: '#000', //ios
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventPoster: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins_400Regular',
  },
  artist: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Poppins_400Regular',
  },
  city: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'Poppins_400Regular',
  },
  eventVenue: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'Poppins_400Regular',
  },
  date: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins_400Regular',
  },
  regularTicket: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins_400Regular',
  },
  vipTicket: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins_400Regular',
  },
  deleteBtn: {
    width: '100%',
    height: 45,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  deleteTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  }
})

export default AdminDashboard;