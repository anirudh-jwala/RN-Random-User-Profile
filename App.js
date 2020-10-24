import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {Button, Spinner} from 'native-base';
import Snackbar from 'react-native-snackbar';

import User from './components/User';

import Axios from 'axios';

const App = () => {
  const [details, setDetails] = useState(null);

  const fetchDetails = async () => {
    try {
      const {data} = await Axios.get('https://randomuser.me/api');
      const details = data.results[0];
      setDetails(details);
    } catch (error) {
      Snackbar.show({
        text: 'Something went wrong, please try after sometime',
        duration: Snackbar.LENGTH_LONG,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  if (!details) {
    return (
      <View style={[styles.container, {flexDirection: 'row'}]}>
        <Spinner color="#fff" />
        <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
          Loading...
        </Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View>
          <User details={details} />
          <Button rounded style={styles.button} onPress={() => fetchDetails()}>
            <Text>Get new user</Text>
          </Button>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222831',
  },
  button: {
    marginTop: 30,
    paddingHorizontal: 30,
  },
});

export default App;
