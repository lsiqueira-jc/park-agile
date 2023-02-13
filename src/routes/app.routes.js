import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'native-base';
import { ConfirmReserv } from '../screens/ConfirmReserv';
import { Cupons } from '../screens/Cupons';
import { CuponsList } from '../screens/CuponsList';
import { Home } from '../screens/Home';
import { Maps } from '../screens/Maps';
import { Profile } from '../screens/Profile';
const HomeStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();
const HomeTabs = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();
const CuponsStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
export function AppRoutes() {
  const theme = useTheme();
  const HomeStackNavigator = () => (
    <HomeStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
      })}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Maps" component={Maps} />
      <HomeStack.Screen name="ConfirmReserv" component={ConfirmReserv} />
    </HomeStack.Navigator>
  );

  const ProfileStackNavigator = () => (
    <ProfileStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
  const CuponsStackNavigator = () => (
    <CuponsStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <CuponsStack.Screen name="CuponsList" component={CuponsList} />
      <CuponsStack.Screen name="Cupons" component={Cupons} />
    </CuponsStack.Navigator>
  );
  const HomeTabNavigator = () => (
    <HomeTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#262626',
          borderTopColor: 'transparent',
          borderRadius: 10,
          marginBottom: 15,
          marginHorizontal: 15,
          position: 'absolute',

          height: 60,

          paddingBottom: 10,
          paddingTopP: 15,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          textTransform: 'none',
        },
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary[700],

        scrollEnabled: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Início') {
            iconName = focused ? 'home-sharp' : 'home-sharp';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <HomeTabs.Screen name="Início" component={HomeStackNavigator} />
      <HomeTabs.Screen
        name="Cupons"
        options={({ route }) => ({
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="ticket-confirmation-outline"
              size={size}
              color={color}
            />
          ),
        })}
        component={CuponsStackNavigator}
      />
      <HomeTabs.Screen
        name="Carteira"
        options={({ route }) => ({
          tabBarIcon: ({ size, color }) => (
            <Entypo name="wallet" size={size} color={color} />
          ),
        })}
        component={ProfileStackNavigator}
      />
      <HomeTabs.Screen name="Perfil" component={ProfileStackNavigator} />
    </HomeTabs.Navigator>
  );
  return (
    <>
      <AppStack.Navigator
        initialRouteName={'HomeScreen'}
        screenOptions={({ route }) => ({
          headerShown: false,
        })}
        headerMode="none"
      >
        <AppStack.Screen name="HomeScreen" component={HomeTabNavigator} />
      </AppStack.Navigator>
    </>
  );
}
