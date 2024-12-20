import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image, Alert } from 'react-native'
import React, { useState, useCallback } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Poppins_700Bold_Italic, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';

const Signup = ({ users, setUsers, userId, setUserId }) => {
    const navigation = useNavigation();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_700Bold,
      Poppins_700Bold_Italic,
    });
    
    const onLayoutRootView = useCallback(async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }, [fontsLoaded]);
  
    if (!fontsLoaded) {
      return null;
    }

    const signupUser = () => {
      let addUser = users;

      if (!firstname.trim() || !lastname.trim() || !username.trim() || !password.trim()) {
        Alert.alert('Error', 'Please fill up all fields.');
      } else {
        addUser.push({
          'id' : userId,
          'firstname' : firstname,
          'lastname' : lastname,
          'role' : 'User',
          'username' : username,
          'password' : password,
          'eWallet' : 0,
        });
  
        setUsers(addUser);
        setFirstname('');
        setLastname('');
        setUsername('');
        setPassword('');
        setUserId(userId + 1);
        navigation.navigate('Login');
      }
    };

  return (
    <SafeAreaProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <StatusBar style='light' backgroundColor='transparent'/>
          <ImageBackground
            source={require('../assets/phtix-bg.jpg')}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
          />
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.container}>
              <Text style={styles.appNameLbl1}>PH<Text style={styles.appNameLbl2}>Tix</Text></Text>
              <View style={styles.signupForm}>
                <Text style={styles.signupLbl}>Sign up</Text>
                <TextInput
                  style={styles.signupInput}
                  value={firstname}
                  onChangeText={setFirstname}
                  placeholder="First name"
                />
                <TextInput
                  style={styles.signupInput}
                  value={lastname}
                  onChangeText={setLastname}
                  placeholder="Last name"
                />
                <TextInput
                  style={styles.signupInput}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Username"
                />
                <TextInput
                  style={styles.signupInput}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!isPasswordVisible)}
                  style={styles.toggleBtn}
                >
                  <Image 
                    source={isPasswordVisible ? require('../assets/checked.png') : require('../assets/unchecked.png')}
                    style={styles.checkBox}
                  />
                  <Text style={styles.toggleTxt}>
                    Show password
                  </Text>
                </TouchableOpacity>
                <View style={styles.loginContainer}>
                  <Text style={styles.toLoginLbl}>
                    Have an account?{' '}
                  </Text>
                  <TouchableOpacity onPress={() => {
                    navigation.navigate('Login');
                    setFirstname('');
                    setLastname('');
                    setUsername('');
                    setPassword('');
                  }}>
                    <Text style={styles.loginLbl}>Log in</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity 
                  style={styles.signupBtn}
                  onPress={signupUser}
                >
                  <Text style={styles.signupBtnTxt}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appNameLbl1: {
    fontSize: 50,
    fontFamily: 'Poppins_700Bold',
    color: '#007bff',
    marginBottom: 20,
  },
  appNameLbl2: {
    fontFamily: 'Poppins_700Bold_Italic',
    color: 'red',
  },
  signupForm: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  signupLbl: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Poppins_400Regular',
  },
  signupInput: {
    fontFamily: 'Poppins_400Regular',
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  toggleBtn: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    columnGap: 1,
  },
  checkBox: {
    width: 16,
    height: 16,
  },
  toggleTxt: {
    fontSize: 11,
    color: '#555',
    fontFamily: 'Poppins_400Regular',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toLoginLbl: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    fontFamily: 'Poppins_400Regular',
  },
  loginLbl: {
    color: '#007bff',
    fontSize: 14,
    marginTop: 5,
    fontFamily: 'Poppins_400Regular',
  },
  signupBtn: {
    width: '100%',
    height: 45,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  signupBtnTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
});

export default Signup;