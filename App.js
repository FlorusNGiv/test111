import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    TextInput,
    Alert,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
    Image,
} from 'react-native';
import {SafeAreaView, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import {Font, Constants} from 'expo';
import {Input, Button} from 'react-native-elements'
import LoginScreen from './src/login/LoginScreen'
import HomeScreen from './src/pages/Home'
import ProfileScreen from './src/pages/ProfileScreen'
import Signup from './src/login/Signup'
import AppWithNavigationState from './src/navigators/AppNavigator';
import MenuScreen from "./src/pages/MenuScreen";
import CollectionScreen from "./src/pages/CollectionScreen";
import AppointmentScreen from "./src/pages/AppointmentScreen";
import AppointmentConfirmScreen from "./src/pages/AppointmentConfirmScreen";


// const SCREEN_WIDTH = Dimensions.get('window').width;
// const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('./src/assets/images/bg_screen1.jpg');


const AppStack = createStackNavigator({Home: HomeScreen, Profile: ProfileScreen,
    MenuScreen: MenuScreen,
    Collection: CollectionScreen,
    Appointment: AppointmentScreen,
    AppointmentConfirm: AppointmentConfirmScreen});
const AuthStack = createStackNavigator({
    Signup: Signup,
    Login: LoginScreen,
});

class App extends Component {

    static navigationOptions =
        {
            title: 'Sign Up',
            headerStyle: {
                backgroundColor: '#FFC107'
            },

            headerTintColor: '#fff',
        };

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <AppWithNavigationState/>
            </Provider>
        );
    }
}

class LoadingScreen extends React.Component<any, any> {
    componentDidMount() {
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('authToken');
        let initialRouteName = userToken ? 'App' : 'Auth';
        console.log('app auth token', userToken);
        this.props.navigation.navigate(initialRouteName);
    };

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#f9f9f9',
    }
});

export default createSwitchNavigator({
    Loading: LoadingScreen,
    App: AppStack,
    Auth: AuthStack,
});


