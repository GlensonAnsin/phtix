import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Image, TouchableOpacity, FlatList, Modal, TextInput, Alert } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';

const UserDashboard = ({ events, userName, setUserName, users, setUsers, curUserId, setCurEventId }) => {
  const navigation = useNavigation();

  const [oldPass, setOldPass] = useState('');
  const [changePass, setChangePass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [inputBalance, setInputBalance] = useState(0);
  const [addBalanceModalVisible, setAddBalanceModalVisible] = useState(false);
  const [editAccModalVisible, setEditAccModalVisible] = useState(false);

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

  const getBalance = users.find(user => user.id === curUserId);
  const balance = getBalance.eWallet;

  const handleAddBalance = () => {
    if (!inputBalance || inputBalance == 0) {
      Alert.alert('Error', 'Please input value.');
    } else if (inputBalance >= 1 && inputBalance < 200) {
      Alert.alert('Error', 'Cash in minimum is 200.');
    } else {
      const updatedAccountBalance = users.map((user) => {
        if (user.id === curUserId) {
          return {...user, eWallet: user.eWallet + Number(inputBalance)};
        }
        return user;
      });
      setUsers(updatedAccountBalance);
      setInputBalance(0);
      setAddBalanceModalVisible(false);
      Alert.alert('Message', 'Cash in successful.',
        [
          {
            text: 'Ok',
            style: 'cancel'
          }
        ],
        {cancelable: true}
      );
    }
  };

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

  const handleEditAcc = () => {
    if (!oldPass.trim() || !changePass.trim() || !confirmPass.trim()) {
      Alert.alert('Error', 'Please fill up all fields.');
    } else {
        const updatedAccountPass = users.map((user) => {
          if (user.id === curUserId) {
            if (oldPass !== user.password) {
              Alert.alert('Error', 'Old password is wrong.');
            } else {
              if (changePass !== confirmPass) {
                Alert.alert('Error', "Password don't match.");
              } else {
                setOldPass('');
                setChangePass('');
                setConfirmPass('');
                setEditAccModalVisible(false);
                Alert.alert('Message', 'Password changed.',
                  [
                    {
                      text: 'Ok',
                      style: 'cancel'
                    }
                  ],
                  {cancelable: true}
                );
                return {...user, password: changePass};
              }
            }
          }
          return user;
        });
        setUsers(updatedAccountPass);
      }
    };

  const handeLogout = () => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
      setUserName('Name: ');
    };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar style='light' backgroundColor='black' />
        <View style={styles.userContainer}>
          <Text style={styles.appNameLbl1}>PH<Text style={styles.appNameLbl2}>Tix</Text></Text>
          <Text style={styles.userTxt}>{userName}</Text>
          <View style={styles.eWalletContainer}>
            <Text style={styles.eWallet}>₱ {balance}</Text>
            <TouchableOpacity
              style={styles.addMoneyBtn}
              onPress={() => setAddBalanceModalVisible(true)}
            >
              <Image 
                source={require('../assets/plus.png')}
                style={styles.plusSign}
              />
            </TouchableOpacity>
            <Modal
              animationType='fade'
              transparent={true}
              visible={addBalanceModalVisible}
              onRequestClose={() => setAddBalanceModalVisible(false)}
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.addBalanceModalBg}>
                  <View style={styles.addBalanceModal}>
                    <Text style={styles.addBalanceLbl}>Add balance</Text>
                    <TextInput 
                      style={styles.inputBalance}
                      value={inputBalance}
                      onChangeText={setInputBalance}
                      keyboardType='numeric'
                      placeholder='0'
                    />
                    <View style={styles.addBalBtnContainer}>
                      <TouchableOpacity
                        style={styles.cancelAddBalBtn}
                        onPress={() => {
                          setInputBalance(0);
                          setAddBalanceModalVisible(false);
                        }}
                      >
                        <Text style={styles.cancelAddBalTxt}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.addBalBtn}
                        onPress={handleAddBalance}
                      >
                        <Text style={styles.addBalTxt}>Add balance</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.editAccountBtn}
              onPress={() => setEditAccModalVisible(true)}
            >
              <Text style={styles.editAccountTxt}>Edit account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.HistoryBtn}
              onPress={() => navigation.navigate('History')}
            >
              <Text style={styles.HistoryTxt}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={handeLogout}
            >
              <Text style={styles.logoutTxt}>Log out</Text>
            </TouchableOpacity>
            <Modal
              animationType='fade'
              transparent={true}
              visible={editAccModalVisible}
              onRequestClose={() => setEditAccModalVisible(false)}
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.editAccModalBg}>
                  <View style={styles.editAccModal}>
                    <Text style={styles.changePassLbl}>Change password</Text>
                    <TextInput 
                      style={styles.inputChange}
                      value={oldPass}
                      onChangeText={setOldPass}
                      placeholder='Enter old password'
                      secureTextEntry={true}
                    />
                    <TextInput 
                      style={styles.inputChange}
                      value={changePass}
                      onChangeText={setChangePass}
                      placeholder='Enter new password'
                      secureTextEntry={true}
                    />
                    <TextInput 
                      style={styles.inputChange}
                      value={confirmPass}
                      onChangeText={setConfirmPass}
                      placeholder='Confirm new password'
                      secureTextEntry={true}
                    />
                    <View style={styles.editAccBtnContainer}>
                      <TouchableOpacity
                        style={styles.cancelEditBtn}
                        onPress={() => {
                          setOldPass('');
                          setChangePass('');
                          setConfirmPass('');
                          setEditAccModalVisible(false);
                        }}
                      >
                        <Text style={styles.cancelEditTxt}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.saveBtn}
                        onPress={handleEditAcc}
                      >
                        <Text style={styles.saveTxt}>Save</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
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
              <TouchableOpacity
                style={styles.buyTicketBtn}
                onPress={() => {
                  setCurEventId(item.eventId);
                  navigation.navigate('Buy Ticket');
                }}
              >
                <Text style={styles.buyTicketTxt}>Buy ticket</Text>
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
  userContainer: {
    backgroundColor: '#f8f8ff',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    width: '100%',
    padding: 20,
    elevation: 5, //android
    shadowColor: '#000', //ios
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
  userTxt: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    marginBottom: 5,
    color: '#666',
  },
  eWalletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    alignSelf: 'flex-start',
    backgroundColor: '#007bff',
    paddingHorizontal: 3,
    borderRadius: 5,
    marginBottom: 50,
  },
  eWallet: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    color: 'white',
    marginTop: 4,
  },
  addMoneyBtn: {
    backgroundColor: '#f8f8ff',
    borderRadius: 5,
  },
  plusSign: {
    width: 18,
    height: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 10,
  },
  editAccountBtn: {
    width: '30%',
    height: 45,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  editAccountTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  HistoryBtn: {
    width: '30%',
    height: 45,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  HistoryTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  logoutBtn: {
    width: '30%',
    height: 45,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  logoutTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
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
  buyTicketBtn: {
    width: '100%',
    height: 45,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buyTicketTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  addBalanceModalBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  addBalanceModal: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  addBalanceLbl: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
  },
  inputBalance: {
    fontFamily: 'Poppins_400Regular',
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  addBalBtnContainer: {
    flexDirection: 'row',
    columnGap: 10,
  },
  cancelAddBalBtn: {
    width: '40%',
    height: 45,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  cancelAddBalTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  addBalBtn: {
    width: '40%',
    height: 45,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  addBalTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  editAccModalBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  editAccModal: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  changePassLbl: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    marginBottom: 20,
  },
  inputChange: {
    fontFamily: 'Poppins_400Regular',
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  editAccBtnContainer: {
    flexDirection: 'row',
    columnGap: 10,
  },
  cancelEditBtn: {
    width: '40%',
    height: 45,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  cancelEditTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  saveBtn: {
    width: '40%',
    height: 45,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  saveTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
})

export default UserDashboard;