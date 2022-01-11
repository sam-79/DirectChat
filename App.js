import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  ToastAndroid,
  Linking,
} from "react-native";

import { useState } from "react";

function showToast(msg) {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
}

function App(props) {
  const [code, setCode] = useState(false);
  const [mob, setMob] = useState(false);
  const [msg, setMsg] = useState("");

  function openWhatsApp() {
    if (mob && code) {
      let url1 = "whatsapp://send?phone=" + code + mob + "&text=" + msg;
      let url2 = "https://wa.me/+" + code + mob + "?text=" + msg;

      Linking.canOpenURL(url1)
        .then((supported) => {
          if (!supported) {
            return Linking.openURL(url2);
          } else {
            return Linking.openURL(url1);
          }
        })
        .catch((err) => showToast("An error occurred", err));
    } else {
      showToast("Please Enter Code & Mobile No.");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>WhatsApp Direct Chat</Text>

      <View style={{ flexDirection: "row", fontSize: 25 }}>
        <Text style={{ fontSize: 25, flex: 1, margin: 5, padding: 5 }}>
          Code
        </Text>
        <Text style={{ fontSize: 25, flex: 2, margin: 5, padding: 5 }}>
          Enter Mobile No.
        </Text>
      </View>

      <View style={{ flexDirection: "row", fontSize: 25 }}>
        <TextInput
          style={{
            fontSize: 25,
            flex: 1,
            borderWidth: 2,
            borderRadius: 5,
            borderColor: "#125d22",
            margin: 5,
            padding: 5,
            backgroundColor: "#78d4c9",
          }}
          keyboardType="phone-pad"
          selectionColor="red"
          placeholder="91"
          onChangeText={(text) => {
            setCode(text);
          }}
        />
        <TextInput
          style={{
            fontSize: 25,
            flex: 2,
            borderWidth: 2,
            borderRadius: 5,
            borderColor: "#125d22",
            margin: 5,
            padding: 5,
            backgroundColor: "#78d4c9",
          }}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          selectionColor="red"
          placeholder="9892XXXXXX"
          onChangeText={(text) => {
            setMob(text);
          }}
        />
      </View>

      <View>
        <TextInput
          style={{
            fontSize: 25,
            borderWidth: 2,
            borderRadius: 5,
            borderColor: "#125d22",
            margin: 5,
            padding: 5,
            backgroundColor: "#78d4c9",
          }}
          multiline={true}
          selectionColor="red"
          placeholder="Text Message (Optional)"
          onChangeText={(text) => {
            setMsg(text);
          }}
        />
      </View>

      <Pressable
        style={{ backgroundColor: "#125d22", margin: 5, borderRadius: 5 }}
        onPress={() => {
          openWhatsApp();
        }}
      >
        <Text
          style={{
            fontSize: 30,
            color: "#ffffff",
            textAlign: "center",
            padding: 5,
          }}
        >
          Click to Chat
        </Text>
      </Pressable>

      <Pressable
        style={{
          backgroundColor: "#a6e23c",
          position: "absolute",
          bottom: 0,
          width: "100%",
          borderTopLeftRadius: 10,
          borderTopRightRadius:10,
        }}
        onPress={()=>{Linking.openURL('https://in.linkedin.com/in/sameer-borkar-aa893b121')}}
      >
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          About Developer
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(18,140,126,1)",
  },
  heading: {
    color: "#121212",
    textAlign: "center",
    fontSize: 45,
    position: "relative",
    bottom: 10,
  },
  inputLabel: {},
});

export default App;
