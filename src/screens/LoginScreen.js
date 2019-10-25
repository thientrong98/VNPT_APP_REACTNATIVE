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

class LoginScreen extends React.Component {
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

  onPressLogin = () => {
    const { email, password } = this.state;
    if (email.length <= 0 || password.length <= 0) {
      alert("Vui lòng điền đầy đủ thông tin!.");
      return;
    }
    else{
      if(email=="thientrong" && password=="thientrong"){
        this.props.navigation.navigate("Homehome");

        // return WelcomeScreen;
      }
      else{
        alert("Tài khoản không đúng. Vui lòng điền lại thông tin");
      }
    }
    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then(response => {
    //     const { navigation } = this.props;
    //     user_uid = response.user._user.uid;
    //     firebase
    //       .firestore()
    //       .collection("users")
    //       .doc(user_uid)
    //       .get()
    //       .then(function(user) {
    //         if (user.exists) {
    //           AsyncStorage.setItem("@loggedInUserID:id", user_uid);
    //           AsyncStorage.setItem("@loggedInUserID:key", email);
    //           AsyncStorage.setItem("@loggedInUserID:password", password);
    //           navigation.dispatch({ type: "Login", user: user });
    //         } else {
    //           alert("User does not exist. Please try again.");
    //         }
    //       })
    //       .catch(function(error) {
    //         const { code, message } = error;
    //         alert(message);
    //       });
    //   })
    //   .catch(error => {
    //     const { code, message } = error;
    //     alert(message);
    //     // For details of error codes, see the docs
    //     // The message contains the default Firebase string
    //     // representation of the error
    //   });
  };

  onPressFacebook = () => {
    LoginManager.logInWithReadPermissions([
      "public_profile",
      "user_friends",
      "email"
    ]).then(
      result => {
        if (result.isCancelled) {
          alert("Whoops!", "You cancelled the sign in.");
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const credential = firebase.auth.FacebookAuthProvider.credential(
              data.accessToken
            );
            const accessToken = data.accessToken;
            firebase
              .auth()
              .signInWithCredential(credential)
              .then(result => {
                var user = result.user;
                AsyncStorage.setItem(
                  "@loggedInUserID:facebookCredentialAccessToken",
                  accessToken
                );
                AsyncStorage.setItem("@loggedInUserID:id", user.uid);
                var userDict = {
                  id: user.uid,
                  fullname: user.displayName,
                  email: user.email,
                  profileURL: user.photoURL
                };
                var data = {
                  ...userDict,
                  appIdentifier: "rn-android-universal-listings"
                };
                firebase
                  .firestore()
                  .collection("users")
                  .doc(user.uid)
                  .set(data);
                this.props.navigation.dispatch({
                  type: "Login",
                  user: userDict
                });
              })
              .catch(error => {
                alert("Please try again! " + error);
              });
          });
        }
      },
      error => {
        Alert.alert("Sign in error", error);
      }
    );
  };

  onPressGoogle = () => {
    this.setState({ loading: true });
    GoogleSignin.signIn()
      .then(data => {
        console.log("data", data);
        // Create a new Firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(
          data.idToken
        );
        // Login with the credential
        const accessToken = data.idToken;
        AsyncStorage.setItem(
          "@loggedInUserID:googleCredentialAccessToken",
          accessToken
        );
        return firebase.auth().signInWithCredential(credential);
      })
      .then(result => {
        this.setState({ loading: false });
        var user = result.user;
        AsyncStorage.setItem("@loggedInUserID:id", user.uid);
        var userDict = {
          id: user.uid,
          fullname: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        };
        var data = {
          ...userDict,
          appIdentifier: "rn-android-universal-listings"
        };
        console.log("data", data);
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .set(data);
        this.props.navigation.dispatch({
          type: "Login",
          user: userDict
        });
      })
      .catch(error => {
        const { code, message } = error;
        this.setState({ loading: false }, () => {
          alert(error);
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.leftTitle]}>Đăng nhập</Text>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Tên đăng nhập"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            secureTextEntry={true}
            placeholder="Mật khẩu"
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          onPress={() => this.onPressLogin()}
        >
          Đăng nhập
        </Button>
        <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20
        }}>
        
        <Button
          containerStyle={styles.facebookContainer}
          style={styles.facebookText}
          onPress={() => this.onPressFacebook()}
        >
         <Image
            //We are showing the Image from online
            source={{
              uri:
                'http://vuanhonline.com/wp-content/uploads/2019/04/fa1.png',
            }}
            //You can also show the image from you project directory like below
            //source={require('./Images/facebook.png')}

            //Image Style
            style={styles.ImageIconStyle}
          />
        </Button>
        <Button
          containerStyle={styles.googleContainer}
          style={styles.facebookText}
          onPress={this.onPressGoogle}
        >
         <Image
            //We are showing the Image from online
            source={{
              uri:
                'https://www.trainingtoyou.com/wp-content/uploads/2018/08/2000px-Google__G__Logo.svg_.png',
            }}
            //You can also show the image from you project directory like below
            //source={require('./Images/facebook.png')}

            //Image Style
            style={styles.ImageIconStyle}
          />
        </Button>
        {/* {this.state.loading ? (
          <ActivityIndicator
            style={{ marginTop: 30 }}
            size="large"
            animating={this.state.loading}
            color={AppStyles.color.tint}
          />
        ) : (
          <GoogleSigninButton
            style={styles.googleContainer}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={this.onPressGoogle}
          />
        )} */}

        <Button
          containerStyle={styles.googleContainer}
          // onPress={() => this.onPressFacebook()}
        >
         <Image
            //We are showing the Image from online
            source={{
              uri:
                'http://blogs.vmware.com/management/files/2019/04/25231.png',
            }}
            //You can also show the image from you project directory like below
            //source={require('./Images/facebook.png')}

            //Image Style
            style={styles.ImageIconStyle}
          />
        </Button>

        </View>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
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
    backgroundColor: "#d2eee8",
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
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
    backgroundColor: "#d2eee8",
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
    margin: 5,
    height: 30,
    width: 30,
    resizeMode: 'stretch',

  },
});

export default LoginScreen;
