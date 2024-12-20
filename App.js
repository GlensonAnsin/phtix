import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Signup from './screens/Signup';
import AdminDashboard from './screens/AdminDashboard';
import UserDashboard from './screens/UserDashboard';
import AddEvent from './screens/AddEvent';
import BuyTicket from './screens/BuyTicket';
import History from './screens/History';

const Stack = createNativeStackNavigator();

export default function App() {
  // USESTATE FOR USERS
  const [users, setUsers] = useState([
    {id: 'a-1', firstname: 'Glenson', lastname: 'Ansin', role: 'Admin', username: 'admin@glenson', password: 'admin@glenson', eWallet: 0},
    {id: 1, firstname: 'Jerico', lastname: 'Cacho', role: 'User', username: 'jericocacho', password: 'cachojerico', eWallet: 0}
  ]);
  const [userId, setUserId] = useState(2);
  const [adminName, setAdminName] = useState('Admin: ');
  const [userName, setUserName] = useState('Name: ');
  const [curUserId, setCurUserId] = useState(0);

  // USESTATE FOR EVENTS
  const [events, setEvents] = useState([
    {eventId: 1001, eventName: 'Maroon 5 Asia 2025', artist: 'Maroon 5', eventVenue: 'SM Mall of Asia Arena', city: 'Pasay City', date: '2025-01-29', regular: 15850, vip: 21350, eventPoster: 'https://dynamicmedia.livenationinternational.com/j/n/s/13e28f8b-e370-4bb4-bafe-f6002014aaf7.png?auto=webp&width=700'},
    {eventId: 1002, eventName: 'keshi: REQUIEM TOUR', artist: 'Keshi', eventVenue: 'SM Mall of Asia Arena', city: 'Pasay City', date: '2025-03-04', regular: 5300, vip: 13200, eventPoster: 'https://dynamicmedia.livenationinternational.com/s/p/d/976b0f94-9365-4fae-bf18-48cef1b62cfc.jpeg?auto=webp&width=700'},
    {eventId: 1003, eventName: 'NIKI: Buzz World Tour', artist: 'Niki', eventVenue: 'Smart Araneta Coliseum', city: 'Quezon City', date: '2025-03-01', regular: 5500, vip: 12700, eventPoster: 'https://dynamicmedia.livenationinternational.com/p/q/e/2d38fa91-d874-47f7-87b0-3df9cbc50879.png?auto=webp&width=1507.2'},
    {eventId: 1004, eventName: 'Kylie Minogue: Tension Tour 2025', artist: 'Kylie Minogue', eventVenue: 'SM Mall of Asia Arena', city: 'Pasay City', date: '2025-03-17', regular: 9750, vip:  17500, eventPoster: 'https://dynamicmedia.livenationinternational.com/g/w/b/0983cc3a-93cc-407b-b147-7eb5577fd5ef.jpg'}
  ]);
  const [eventId, setEventId] = useState(1005);
  const [curEventId, setCurEventId] = useState(0);
  
  // USESTATE FOR BOOKINGS
  const [bookings, setBookings] = useState([]);
  const [bookingId, setBookingId] = useState(101);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='Login'
          options={{ headerShown: false, animation: 'ios_from_right' }}
        >
          {({ navigation }) => (
            <Login 
              navigation={navigation}
              users={users}
              setAdminName={setAdminName}
              setUserName={setUserName}
              setCurUserId={setCurUserId}
            />
          )}
        </Stack.Screen>
        <Stack.Screen 
          name='Signup'
          options={{ headerShown: false, animation: 'ios_from_right' }}
        >
          {({ navigation }) => (
            <Signup 
              navigation={navigation}
              users={users}
              setUsers={setUsers}
              userId={userId}
              setUserId={setUserId}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name='Admin Dashboard'
          options={{ headerShown: false, animation: 'ios_from_right' }}
        >
          {({ navigation }) => (
            <AdminDashboard 
              navigation={navigation}
              events={events}
              setEvents={setEvents}
              adminName={adminName}
              setAdminName={setAdminName}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name='User Dashboard'
          options={{ headerShown: false, animation: 'ios_from_right' }}
        >
          {({ navigation }) => (
            <UserDashboard 
              navigation={navigation}
              events={events}
              userName={userName}
              setUserName={setUserName}
              users={users}
              setUsers={setUsers}
              curUserId={curUserId}
              setCurEventId={setCurEventId}
              curEventId={curEventId}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name='Add Event'
          options={{ headerShown: false, animation: 'ios_from_right' }}
        >
          {({ navigation }) => (
            <AddEvent 
              navigation={navigation}
              events={events}
              setEvents={setEvents}
              eventId={eventId}
              setEventId={setEventId}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name='Buy Ticket'
          options={{ headerShown: false, animation: 'ios_from_right' }}
        >
          {({ navigation }) => (
            <BuyTicket 
              navigation={navigation}
              curEventId={curEventId}
              events={events}
              users={users}
              setUsers={setUsers}
              curUserId={curUserId}
              bookings={bookings}
              setBookings={setBookings}
              bookingId={bookingId}
              setBookingId={setBookingId}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name='History'
          options={{ headerShown: false, animation: 'ios_from_right' }}
        >
          {({ navigation }) => (
            <History 
              navigation={navigation}
              curUserId={curUserId}
              bookings={bookings}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}