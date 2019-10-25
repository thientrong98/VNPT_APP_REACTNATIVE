import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ActivityIndicator,Image
} from "react-native";
import Button from "react-native-button";
import { AppStyles } from "../AppStyles";
import firebase from "react-native-firebase";
import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin";
import { AsyncStorage } from "react-native";
const FBSDK = require("react-native-fbsdk");
const { LoginManager, AccessToken } = FBSDK;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      password: ""
    };
    GoogleSignin.configure({
      webClientId:
        "706061484183-l0l58dds4kg329fh1trbiha1ci5rqm5n.apps.googleusercontent.com"
    });
  }

  render() {
    return (
    
        <View style={{position: 'absolute', backgroundColor: "#F1FEE9", height: 30, bottom: 0}}>
        
          <Button
          containerStyle={styles.facebookContainer}
          style={styles.facebookText}
          onPress={() =>  this.props.navigation.navigate("profile")}
        >
         <Image
            //We are showing the Image from online
            source={{
              uri:
                'https://bizweb.dktcdn.net/100/125/230/themes/698647/assets/index-cate-icon-1.png?1567645645919',
            }}
            //You can also show the image from you project directory like below
            //source={require('./Images/facebook.png')}

            //Image Style
            style={styles.ImageIconStyle}
          />
        </Button>
        </View>
        
    
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center"
   
  },
  or: {
    fontFamily: AppStyles.fontName.main,
    color: "black",
    marginTop: 40,
    marginBottom: 10
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20
  },
  leftTitle: {
    alignSelf: "stretch",
    textAlign: "left",
    marginLeft: 20
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "center",
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  loginText: {
    color: AppStyles.color.white
  },
  placeholder: {
    fontFamily: AppStyles.fontName.text,
    color: "red"
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  facebookContainer: {
    width: 80,
    height: 40,
    backgroundColor: "#ffffff",
    // borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    right: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookText: {
    color: AppStyles.color.white
  },
  googleContainer: {
    width: 80,
    height: 40,
    marginTop: 30,
    padding: 10,
    marginLeft: 10,
    backgroundColor: "#ffffff",
    borderRadius: AppStyles.borderRadius.main,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  googleText: {
    color: AppStyles.color.white,
  },
  ImageIconStyle: {
    padding: 10,
    marginRight: 5,
    height: 30,
    width: 30,
    resizeMode: 'stretch',

  },
  img: {
    width: 30,
    height: 30,
    position: 'absolute',
    marginTop: 0,
    // bottom: 0,
    // left: 0,
    right: 0,
    justifyContent: 'flex-end',
  },
});

export default Home;
