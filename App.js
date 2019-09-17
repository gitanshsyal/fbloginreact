/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,Image,Alert
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { LoginButton, AccessToken,GraphRequest,
  GraphRequestManager, } from 'react-native-fbsdk';

export default class App extends React.Component {
  constructor() {
    super();
    //Setting the state for the data after login
    this.state = {
      user_name: '',
      token: '',
      profile_pic: '',
    };
  }
  componentDidMount(){
    this.get_Response_Info
  }
  get_Response_Info = (error, result) => {
    if (error) {
      //Alert for the Error
      Alert.alert('Error fetching data: ' + error.toString());
    } else {
      //response alert
      alert(JSON.stringify(result));
      this.setState({ user_name: 'Welcome' + ' ' + result.name });
      this.setState({ token: 'User Token: ' + ' ' + result.id });
      this.setState({ profile_pic: result.picture.data.url });
      console.log("result",result)
    }
  };
  logout = () => {
    //Clear the state after logout
    this.setState({ user_name: null, token: null, profile_pic: null });
  };
  render(){
  return (
   <View
   style={{flex:1}}
   >
      <View
     style={{flex:0.2,justifyContent:'center',alignItems:'center'}}
     >
       <Image
       style={{height:50,width:50,borderRadius:25}}
       source={{uri:this.state.profile_pic}}
       ></Image>
     </View>
     <View
     style={{flex:0.1,justifyContent:'center',alignItems:'center'}}
     >
       <Text
       style={{textAlign:'center'}}
       >{this.state.user_name}</Text>
     </View>
     <View
     style={{flex:0.1,justifyContent:'center',alignItems:'center'}}
     >
       <Text
       style={{textAlign:'center'}}
       >{this.state.token}</Text>
     </View>
<LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                    const processRequest = new GraphRequest(
                      '/me?fields=email,name,picture.type(large),birthday,friends',
                      null,
                    //  console.log("details",processRequest)
                  this.get_Response_Info
                    );
                    // Start the graph request.
                    new GraphRequestManager().addRequest(processRequest).start();
                   
                  
                  }
                )
              }
            }
          }
          onLogoutFinished={() => this.logout}/>

   </View>
  );
};
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});


