import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, TextInput } from 'react-native';

export default function App() {
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    let value = localStorage.getItem('deeplink');
    if (value) {
      value = decodeURIComponent(value);
      setLink(value);
    }
  }, [])

  const changeLink = (r) => {
    setLink(r);
    localStorage.setItem('deeplink', encodeURIComponent(r))
  }

  return (
    <SafeAreaView style={styles.container}>
      <div style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder='...'
          multiline={true}
          numberOfLines={10}
          onChangeText={(r) => changeLink(r)}
          value={link} />

        <a style={styles.link} href={link}>{link}</a>
      </div>
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
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#2a2828',
  },
  input: {
    width: '100%',
    borderColor: 'grey',
    borderWidth: '1px',
    color: 'white',
    padding: 6,
  },
  link: {
    paddingTop: '40px',
    overflowWrap: 'break-word',
    color: '#51D1F6',
  }
});
