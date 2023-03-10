import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, TextInput, Linking, View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [link, setLink] = React.useState('');

  const read = async () => {
    try {
      let value = await AsyncStorage.getItem('@deeplink')
      if (value) {
        value = decodeURIComponent(value);
        setLink(value);
      }
    } catch (e) { }
  };

  React.useEffect(() => { read(); }, [])

  const changeLink = async (val) => {
    try {
      val = val.replace(/(\r\n|\n|\r)/gm, "");
      val = val.replace(' ', '');
      await AsyncStorage.setItem('@deeplink', encodeURIComponent(val));
    } catch (e) { }
    setLink(val);
  };

  const onLinkPress = async () => {
    try {
      await Linking.openURL(link);
    } catch (e) { }
  };

  const onButtonPress = (str) => {
    let res = '';
    if (link.includes('www.')) {
      res = link.replace('www.', `${str}.`);
    }
    if (link.includes('omega.')) {
      res = link.replace('omega.', `${str}.`);
    }
    if (link.includes('beta.')) {
      res = link.replace('beta.', `${str}.`);
    }
    changeLink(res);
  };

  const getScopeStyle = (val) => {
    if (link.includes(`${val}.`)) {
      return { color: '#ffed7a', borderColor: '#ffed7a' };
    }
    return {};
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder='...'
          multiline={true}
          numberOfLines={10}
          onChangeText={(r) => changeLink(r)}
          value={link} />
        <View style={styles.buttons}>
          <Text style={[styles.button, getScopeStyle('beta')]} onPress={() => { onButtonPress('beta') }}>Beta</Text>
          <Text style={[styles.button, getScopeStyle('omega')]} onPress={() => { onButtonPress('omega') }}>Omega</Text>
          <Text style={[styles.button, getScopeStyle('www')]} onPress={() => { onButtonPress('www') }}>Prod</Text>
        </View>
        <Text style={styles.link} onPress={onLinkPress}>{link}</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 18,
  },
  content: {
    height: '100%',
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#2a2828',
  },
  input: {
    width: '100%',
    color: 'white',
    padding: 6,
    fontSize: 18,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
  },
  link: {
    paddingTop: 40,
    color: '#51D1F6',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    padding: 10,
  },
  button: {
    borderColor: 'white',
    padding: 6,
    borderWidth: 1,
    borderRadius: 20,
    color: 'white',
  }
});
