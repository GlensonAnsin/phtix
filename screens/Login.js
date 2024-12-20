import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Poppins_700Bold_Italic, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';

SplashScreen.preventAutoHideAsync();

const Login = ({ users, setAdminName, setUserName, setCurUserId }) => {
  const navigation = useNavigation();

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

  const loginUser = () => {
    const findUsername = users.find((user) => user.username === username);

    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Username and password are required.');
    } else {
      if (!findUsername) {
        Alert.alert('Error', 'No account found.');
      } else if (findUsername.password === password) {
        if (findUsername.id === 'a-1') {
          navigation.navigate('Admin Dashboard');
          setUsername('');
          setPassword('');
          setAdminName(`Admin: ${findUsername.firstname} ${findUsername.lastname}`);
        } else {
          navigation.navigate('User Dashboard');
          setUsername('');
          setPassword('');
          setUserName(`Name: ${findUsername.firstname} ${findUsername.lastname}`);
          setCurUserId(findUsername.id);
        }
      } else {
        Alert.alert('Error', 'Wrong password.');
      }
    }
  };

  return (
    <SafeAreaProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <StatusBar style="light" backgroundColor="transparent" />
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
              <Text style={styles.appNameLbl1}>
                PH<Text style={styles.appNameLbl2}>Tix</Text>
              </Text>
              <View style={styles.loginForm}>
                <Text style={styles.loginLbl}>Log in</Text>
                <TextInput
                  style={styles.loginInput}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Username"
                />
                <TextInput
                  style={styles.loginInput}
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
                    source={
                      isPasswordVisible
                        ? require('../assets/checked.png')
                        : require('../assets/unchecked.png')
                    }
                    style={styles.checkBox}
                  />
                  <Text style={styles.toggleTxt}>Show password</Text>
                </TouchableOpacity>
                <View style={styles.signupContainer}>
                  <Text style={styles.toSignupLbl}>Don't have an account?{' '}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Signup');
                      setUsername('');
                      setPassword('');
                    }}
                  >
                    <Text style={styles.signupLbl}>Sign up</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={loginUser}>
                  <Text style={styles.loginBtnTxt}>Log in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
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
  loginForm: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginLbl: {
    fontSize: 24,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 20,
  },
  loginInput: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontFamily: 'Poppins_400Regular',
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
    marginLeft: 5,
    color: '#555',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  toSignupLbl: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    fontFamily: 'Poppins_400Regular',
  },
  signupLbl: {
    color: '#007bff',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    marginTop: 5,
  },
  loginBtn: {
    width: '100%',
    height: 45,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  loginBtnTxt: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
});

export default Login;