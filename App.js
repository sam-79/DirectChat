import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  Pressable,
  ToastAndroid,
  Linking,
  Share
} from "react-native";

import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import QRCode from "react-native-qrcode-svg";

const Stack = createNativeStackNavigator();

function showToast(msg) {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
}

function Home({ navigation }) {
  const [code, setCode] = useState(false);
  const [mob, setMob] = useState(false);
  const [msg, setMsg] = useState("");

  function openWhatsApp(value) {
    if (mob && code) {
      let url1 = "whatsapp://send?phone=" + code + mob + "&text=" + msg;
      let url2 = "https://wa.me/+" + code + mob + "?text=" + msg;

      if (value) {
        return url2;
      }

      Linking.canOpenURL(url1)
        .then((supported) => {
          if (supported) {
            return Linking.openURL(url1);
          } else {
            return Linking.openURL(url2);
          }
        })
        .catch((err) => showToast("An error occurred", err));
    } else {
      showToast("Please Enter Code & Mobile No.");
      return false;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.heading}>WhatsApp Direct Chat</Text>
      </View>

      <View>
        <View style={styles.fieldContainer}>
          <View style={{ width: "30%" }}>
            {/* Country Code here */}
            <Text style={styles.fieldLabel}>Code</Text>
            <TextInput
              style={styles.inputField}
              keyboardType="phone-pad"
              selectionColor="red"
              placeholder="91"
              onChangeText={setCode}
            />
          </View>
          <View style={{ width: "70%" }}>
            {/* Mobile No. here */}
            <Text style={styles.fieldLabel}>Mobile Number</Text>
            <TextInput
              style={styles.inputField}
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              selectionColor="red"
              placeholder="9892XXXXXX"
              onChangeText={setMob}
            />
          </View>
        </View>
        <TextInput
          style={styles.inputField}
          multiline={true}
          selectionColor="red"
          placeholder="Text Message (Optional)"
          onChangeText={setMsg}
        />
      </View>

      <View>
        <Pressable
          onPress={() => {
            var x = openWhatsApp(true);
            if (x) {
              navigation.navigate("Create Link", { link: x });
            }
          }}
          style={styles.homeBtn}
        >
          <Text
            style={{
              fontSize: 30,
            }}
          >
            Chat link or QR
          </Text>

          <Icon name="chevron-right" size={40} />
        </Pressable>

        <Pressable
          onPress={() => {
            openWhatsApp(false);
          }}
          style={styles.homeBtn}
        >
          <Text
            style={{
              fontSize: 30,
            }}
          >
            Start a Chat
          </Text>

          <Icon name="arrow-top-right" size={35} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function CreateChatLink({ route }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#59d1c3",
        paddingVertical: 20,
        borderWidth: 2,
        borderColor: "#125d22",
      }}
    >
      <View>
        <Text style={{textAlign:'center'}}>Select to copy</Text>
        <Pressable style={styles.inputField} >
          <Text style={{ textAlign: "center", fontSize: 25 }} selectable={true}>
            {route.params.link}
          </Text>
        </Pressable>
      </View>
      <View style={styles.qRContainer}>
        <QRCode value={route.params.link} size={250} />
      </View>
      
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Create Link" component={CreateChatLink} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#59d1c3",
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: "#125d22",
  },
  heading: {
    fontSize: 35,
    textAlign: "center",
    paddingTop: 20,
  },
  homeBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    margin: 10,
    padding: 5,
    borderRadius: 10,
  },
  fieldContainer: {
    display: "flex",
    flexDirection: "row",
  },

  fieldLabel: {
    fontSize: 25,
    marginTop: 5,
    marginHorizontal: 5,
    marginBottom: 2,
    padding: 2,
  },

  inputField: {
    borderColor: "#125d22",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#125d22",
    fontSize: 30,
    margin: 5,
    padding: 2,
    backgroundColor: "#dddddd",
  },
  chatBtn: {
    margin: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#125d22",
    flexDirection: "row",
    justifyContent: "center",
  },
  chatBtnText: {
    fontSize: 25,
    color: "#ffffff",
    textAlign: "center",
  },
  qRContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
