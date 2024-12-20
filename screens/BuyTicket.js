import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal } from 'react-native'
import React, { useState, useCallback } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';

const BuyTicket = ({ curEventId, events, users, setUsers, curUserId, bookings, setBookings, bookingId, setBookingId }) => {
  const navigation = useNavigation();

  const [buyModalVisible, setBuyModalVisible] = useState(false);
  const [purchaseDoneVisible, setPurchaseDoneVisible] = useState(false);
  const [ticketType, setTicketType] = useState('');
  const [dateToday, setDateToday] = useState('');
  const [referenceNum, setReferenceNum] = useState('');

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

  const eventDetail = events.find(event => event.eventId === curEventId);
  const eventName = eventDetail.eventName;
  const eventPoster = eventDetail.eventPoster;
  const artist = eventDetail.artist;
  const date = eventDetail.date;
  const eventVenue = eventDetail.eventVenue;
  const city = eventDetail.city;
  const regularTicket = eventDetail.regular;
  const vipTicket = eventDetail.vip;
  const userDetail = users.find(user => user.id === curUserId);
  const userName = `${userDetail.firstname} ${userDetail.lastname}`;

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

  const getDate = () => {
    const date = new Date();
    const dateToday = date.toISOString().split('T')[0];

    return dateToday;
  };

  const generateRefNum = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${timestamp}${random}`;
  };

  const handleBuy = (ticket) => {
    const ticketPrice = events.find(event => event.eventId === curEventId);
    if (ticket === 'Regular') {
        const updatedAccountBalance = users.map((user) => {
            if (user.id === curUserId) {
                if (user.eWallet < ticketPrice.regular) {
                    alert('Insufficient funds');
                    setBuyModalVisible(false);
                } else {
                    const storeDate = getDate();
                    const storeRefNum = generateRefNum();
                    let addBooking = [...bookings];
                    addBooking.push({
                      'bookingId' : bookingId,
                      'userId' : curUserId,
                      'eventId' : curEventId,
                      'eventPoster' : eventPoster,
                      'eventName' : eventName,
                      'artist' : artist,
                      'eventVenue' : eventVenue,
                      'city' : city,
                      'date' : date,
                      'ticketType' : ticket,
                      'purchaseDate' : storeDate,
                      'refNum' : storeRefNum,
                    });
                    setBookings(addBooking);
                    setDateToday(storeDate);
                    setReferenceNum(storeRefNum);
                    setBookingId(bookingId + 1);
                    setBuyModalVisible(false);
                    setPurchaseDoneVisible(true);
                    return {...user, eWallet: user.eWallet - ticketPrice.regular};
                }
            }
            return user;
        });
        setUsers(updatedAccountBalance);
    } else {
        const updatedAccountBalance = users.map((user) => {
            if (user.id === curUserId) {
                if (user.eWallet < ticketPrice.vip) {
                    alert('Insufficient funds');
                    setBuyModalVisible(false);
                } else {
                    const storeDate = getDate();
                    const storeRefNum = generateRefNum();
                    let addBooking = bookings;
                    addBooking.push({
                      'bookingId' : bookingId,
                      'userId' : curUserId,
                      'eventId' : curEventId,
                      'eventPoster' : eventPoster,
                      'eventName' : eventName,
                      'artist' : artist,
                      'eventVenue' : eventVenue,
                      'city' : city,
                      'date' : date,
                      'ticketType' : ticket,
                      'purchaseDate' : storeDate,
                      'refNum' : storeRefNum,
                    });
                    setBookings(addBooking);
                    setDateToday(storeDate);
                    setReferenceNum(storeRefNum);
                    setBookingId(bookingId + 1);
                    setBuyModalVisible(false);
                    setPurchaseDoneVisible(true);
                    return {...user, eWallet: user.eWallet - ticketPrice.vip};
                }
            }
            return user;
        });
        setUsers(updatedAccountBalance);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar style='light' backgroundColor='black' />
        <View style={styles.eventDetailContainer}>
          <Text style={styles.eventName}>{eventName}</Text>    
          <Image 
            source={{ uri: eventPoster }}
            style={styles.eventPoster}
          />
          <View style={styles.arrangeDetailContainer}>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>{formatDate(date)}</Text>
            </View>
            <View style={styles.arrangeDetail}>
              <Text style={styles.artist}>{artist}</Text>
              <Text style={styles.eventVenue}>{eventVenue} <Text style={styles.city}>| {city}</Text></Text>
            </View>
          </View>
        </View>
        <Text style={styles.ticketsLbl}>Tickets</Text>
        <View style={styles.hLine} />
        <ScrollView contentContainerStyle={styles.ticketsContainer}>
          <View style={styles.buyTicket}>
            <Text style={styles.ticketTxt}>Regular</Text>
            <Text style={styles.ticketPrice}>₱ {regularTicket}</Text>
            <TouchableOpacity
              style={styles.buyTicketBtn}
              onPress={() => {
                setTicketType('Regular');
                setBuyModalVisible(true);
              }}
            >
              <Text style={styles.buyTicketTxt}>Buy ticket</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buyTicket}>
            <Text style={styles.ticketTxt}>VIP</Text>
            <Text style={styles.ticketPrice}>₱ {vipTicket}</Text>
            <TouchableOpacity
              style={styles.buyTicketBtn}
              onPress={() => {
                setTicketType('VIP');
                setBuyModalVisible(true);
              }}
            >
              <Text style={styles.buyTicketTxt}>Buy ticket</Text>
            </TouchableOpacity>
            <Modal
              animationType='fade'
              transparent={true}
              visible={buyModalVisible}
              onRequestClose={() => setBuyModalVisible(false)}
            >
              <View style={styles.buyModalBg}>
                <View style={styles.buyModal}>
                  <Text style={styles.confirmationLbl}>Confirmation</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.cancelBtn}
                        onPress={() => setBuyModalVisible(false)}
                    >
                        <Text style={styles.cancelTxt}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.confirmBtn}
                        onPress={() => handleBuy(ticketType)}
                    >
                        <Text style={styles.confirmTxt}>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <Modal
              animationType='fade'
              transparent={true}
              visible={purchaseDoneVisible}
              onRequestClose={() => setPurchaseDoneVisible(false)}
            >
              <View style={styles.purchaseDoneModalBg}>
                <View style={styles.purchaseDoneModal}>
                  <Text style={styles.successful}>Purchase successful!</Text>
                  <Text style={styles.purchaseDetail}>Name: {userName}</Text>
                  <Text style={styles.purchaseDetail}>Event: {eventName}</Text>
                  <Text style={styles.purchaseDetail}>Ticket Type: {ticketType}</Text>
                  <Text style={styles.purchaseDetail}>Date of Purchase: {dateToday}</Text>
                  <Text style={styles.purchaseDetail}>Reference No: {referenceNum}</Text>
                  <TouchableOpacity
                    style={styles.okBtn}
                    onPress={() => {
                      setPurchaseDoneVisible(false);
                      navigation.navigate('User Dashboard');
                    }}
                  >
                    <Text style={styles.okTxt}>Ok</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.eventInfoContainer}>
            <Text style={styles.eventInfoLbl}>Event Information</Text>
            <Text style={styles.ticketUse}>TICKET USE:</Text>
            <Text style={styles.bulletTxt}>
                {'\u2022'} Tickets cannot be used for commercial purposes, including but not limited to prizes, competition, contests or sweepstakes.
            </Text>
            <Text style={styles.bulletTxt}>
                {'\u2022'} Tickets sold or used in breach of this condition may be nullified without a refund, where the Ticket Holder will be refused admission into the concert area with no exception.
            </Text>
            <Text style={styles.bulletTxt}>
                {'\u2022'} The Organiser is not responsible for the Ticket Buyer's negligence, resulting in the ticket falling into the hands of other parties, which can be used as an entry requirement, thereby eliminating the Ticket Buyer’s rights to enter the venue area.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  eventDetailContainer: {
    width: '100%',
    backgroundColor: '#f8f8ff',
    padding: 20,
    elevation: 5, //android
    shadowColor: '#000', //ios
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  eventName: {
    fontSize: 25,
    fontFamily: 'Poppins_400Regular',
    fontWeight: 'bold',
  },
  eventPoster: {
    width: '100%',
    height: 250,
  },
  arrangeDetailContainer: {
    flexDirection: 'row',
    columnGap: 20,
  },
  dateContainer: {
    backgroundColor: 'red',
    width: 90,
    padding: 10,
    bottom: 10,
    left: 10,
  },
  date: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  arrangeDetail: {
    width: 210,
    padding: 10,
  },
  artist: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
  },
  eventVenue: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: 'red',
  },
  city: {
    color: '#888',
  },
  ticketsLbl: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
  },
  hLine: {
    borderWidth: 0.5,
    width: '90%',
    marginBottom: 10,
  },
  ticketsContainer: {
    alignItems: 'center',
    width: '90%',
    padding: 5,
  },
  buyTicket: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8ff',
    width: '100%',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    elevation: 5, //android
    shadowColor: '#000', //ios
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  ticketTxt: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    width: 70,
    color: '#666',
  },
  ticketPrice: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    width: 90,
    color: '#666',
  },
  buyTicketBtn: {
    width: '30%',
    height: 45,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buyTicketTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  eventInfoContainer: {
    backgroundColor: '#f8f8ff',
    marginBottom: 15,
    borderRadius: 10,
    width: '100%',
    elevation: 5, //android
    shadowColor: '#000', //ios
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 10,
  },
  eventInfoLbl: {
    fontSize: 20,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
  },
  ticketUse: {
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
  },
  bulletTxt: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
  },
  buyModalBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buyModal: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  confirmationLbl: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    columnGap: 10,
  },
  cancelBtn: {
    width: '40%',
    height: 45,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  cancelTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  confirmBtn: {
    width: '40%',
    height: 45,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  confirmTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  purchaseDoneModalBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  purchaseDoneModal: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'flex-start',
    elevation: 5,
  },
  successful: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    marginBottom: 15,
    alignSelf: 'center',
  },
  purchaseDetail: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  okBtn: {
    width: '40%',
    height: 45,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  okTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  }
})

export default BuyTicket;