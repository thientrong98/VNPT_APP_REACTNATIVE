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

class Profile extends React.Component {
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
      <View style={styles.container}>
        <Text style={[styles.title, styles.leftTitle]}>Thông tin tài khoản</Text>
        <Text style={marginLeft= 0}>Họ và tên: </Text>
        <View style={styles.InputContainer}>
       
          <TextInput
            style={styles.body}
            placeholder="Họ và tên"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <Text style={marginLeft= 0}>Tên đăng nhập:</Text>
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
        <Text style={marginLeft= 0}>Mật khẩu: </Text>
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
        <Text style={marginLeft= 0}>Số điện thoại: </Text>
        <View style={styles.InputContainer}>
       
          <TextInput
            style={styles.body}
            secureTextEntry={true}
            placeholder="Số điện thoại"
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
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

export default Profile;
