import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React, { useCallback } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';;
import * as SplashScreen from 'expo-splash-screen';

const History = ({ curUserId, bookings }) => {
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

  const getUserEventHistory = bookings.filter(booking => booking.userId === curUserId);

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

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar style='light' backgroundColor='black' />
        <Text style={styles.historyLbl}>History</Text>
        <FlatList 
            style={styles.eventContainer}
            data={getUserEventHistory}
            keyExtractor={(item) => item.bookingId.toString()}
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
                    <Text style={styles.purchaseDate}>Purchase Date: {item.purchaseDate}</Text>
                    <Text style={styles.ticketType}>Ticket Type: {item.ticketType}</Text>
                    <Text style={styles.refNum}>Reference No: {item.refNum}</Text>
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
  historyLbl: {
    fontSize: 25,
    padding: 20,
    backgroundColor: '#007bff',
    textAlign: 'center',
    width: '100%',
    color: 'white',
    elevation: 5, //android
    shadowColor: '#000', //ios
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
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
  purchaseDate: {
    fontSize: 14,
    color: 'red',
    fontFamily: 'Poppins_400Regular',
  },
  ticketType: {
    fontSize: 14,
    color: 'red',
    fontFamily: 'Poppins_400Regular',
  },
  refNum: {
    fontSize: 14,
    color: 'red',
    fontFamily: 'Poppins_400Regular',
  }
})

export default History;