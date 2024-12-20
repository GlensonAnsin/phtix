import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity,KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useState, useCallback } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';

const AddEvent = ({ events, setEvents, eventId, setEventId }) => {
  const navigation = useNavigation();

  const [eventName, setEventName] = useState('');
  const [artist, setArtist] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [regular, setRegular] = useState(0);
  const [vip, setVip] = useState(0);
  const [poster, setPoster] = useState('');

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

  const regex = /^(\d{0,4})(\-?)(\d{0,2})(\-?)(\d{0,2})$/;

  const handleChange = (text) => {
    const formattedText = text.replace(/[^0-9/]/g, '');
    const match = formattedText.match(regex);

    if (match) {
        const year = match[1];
        const month = match[3];
        const day = match[5];

        let newDate = '';
        if (year) newDate += year;
        if (month) newDate += '-' + month;
        if (day) newDate += '-' + day;

        setDate(newDate);
    }
  };

  const handleAdd = () => {
    let addEvent = events;

    if (!eventName.trim() || !artist.trim() || !eventVenue.trim() || !city.trim() || !date.trim() || !regular.trim() || !vip.trim() || !poster.trim()) {
        Alert.alert('Error', 'Please fill up all fields.');
    } else {
        addEvent.push({
            'eventId' : eventId,
            'eventName' : eventName,
            'artist' : artist,
            'eventVenue' : eventVenue,
            'city' : city,
            'date' : date,
            'regular' : regular,
            'vip' : vip,
            'eventPoster' : poster,
        });
        setEvents(addEvent);
        setEventName('');
        setArtist('');
        setEventVenue('');
        setCity('');
        setDate('');
        setRegular('');
        setVip('');
        setPoster('');
        setEventId(eventId + 1);
        Alert.alert('Message', 'Event successfully created.',
          [
            {
              text: 'Ok',
              style: 'cancel'
            }
          ],
          {cancelable: true}
        );
        navigation.navigate('Admin Dashboard');
    }
  };

  return (
    <SafeAreaProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <StatusBar style='light' backgroundColor='black' />
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.container}>
                <Text style={styles.addEventLbl}>Add Event</Text>
                <View style={styles.addEventContainer}>
                    <TextInput
                    style={styles.addEventInput}
                    value={eventName}
                    onChangeText={setEventName}
                    placeholder='Event name'
                    />
                    <TextInput
                    style={styles.addEventInput}
                    value={artist}
                    onChangeText={setArtist}
                    placeholder='Artist'
                    />
                    <TextInput
                    style={styles.addEventInput}
                    value={eventVenue}
                    onChangeText={setEventVenue}
                    placeholder='Event venue'
                    />
                    <TextInput
                    style={styles.addEventInput}
                    value={city}
                    onChangeText={setCity}
                    placeholder='City'
                    />
                    <TextInput
                    style={styles.addEventInput}
                    value={date}
                    onChangeText={handleChange}
                    placeholder='YYYY-MM-DD'
                    keyboardType='number-pad'
                    />
                    <TextInput
                    style={styles.addEventInput}
                    value={regular}
                    onChangeText={setRegular}
                    placeholder='Regular ticket price'
                    keyboardType='number-pad'
                    />
                    <TextInput
                    style={styles.addEventInput}
                    value={vip}
                    onChangeText={setVip}
                    placeholder='VIP ticket price'
                    keyboardType='number-pad'
                    />
                    <TextInput
                    style={styles.addEventInput}
                    value={poster}
                    onChangeText={setPoster}
                    placeholder='Event poster (link only)'
                    />
                    <TouchableOpacity
                    style={styles.addEventBtn}
                    onPress={handleAdd}
                    >
                    <Text style={styles.addEventTxt}>Add</Text>
                    </TouchableOpacity>
                </View>
          </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  addEventContainer: {
    backgroundColor: '#f8f8ff',
    width: '80%',
    borderRadius: 10,
    padding: 15,
    elevation: 5, //android
    shadowColor: '#000', //ios
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addEventLbl: {
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
  addEventInput: {
    fontFamily: 'Poppins_400Regular',
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  addEventBtn: {
    width: '100%',
    height: 45,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  addEventTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
})

export default AddEvent;