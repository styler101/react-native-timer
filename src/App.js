import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import crono from './assets/crono.png';

let timer = null;

export default function App() {
  const [number, setNumber] = useState(0);
  const [isStarting, setIsStarting] = useState('Iniciar');
  const [isLast, setIsLast] = useState(null);

  let seconds = 0;
  let minutes = 0;
  let hours = 0;

  function startTimer() {
    console.log(timer);
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
      setIsStarting('Iniciar');
    } else {
      timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
          seconds = 0;
          minutes++;
        }

        if (minutes === 60) {
          minutes = 0;
          hours++;
        }
        let format =
          (hours < 10 ? '0' + hours : hours) +
          ':' +
          (minutes < 10 ? '0' + minutes : minutes) +
          ':' +
          (seconds < 10 ? '0' + seconds : seconds);
        setNumber(format);
      }, 1000);
      setIsStarting('Parar');
    }
  }

  function clearUp() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
    setIsLast(number);
    setNumber(0);
    setIsStarting('Iniciar');
    seconds = 0;
    minutes = 0;
    hours = 0;
  }
  return (
    <View style={styles.container}>
      <Image source={crono} style={styles.image} />
      <View style={styles.timerWrapper}>
        <Text style={styles.timerText}> Timer </Text>
        <Text style={styles.timer}> {number} </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.btn} onPress={startTimer}>
          <Text> {isStarting} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={clearUp}>
          <Text> Parar </Text>
        </TouchableOpacity>
      </View>
      {isLast !== null && (
        <View style={styles.record}>
          <Text style={styles.recordText}> Ultimo tempo {isLast}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef',
  },

  image: {
    position: 'relative',
  },

  timerWrapper: {
    position: 'absolute',
    alignItems: 'center',
  },

  timerText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 8,
    fontWeight: 'bold',
  },

  timer: {
    fontSize: 23,
    color: '#fff',
    marginTop: 8,
    fontWeight: 'bold',
  },

  buttonContainer: {
    width: '100%',
    paddingHorizontal: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  btn: {
    width: 110,
    height: 42,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    borderRadius: 50,
  },

  record: {
    marginTop: 32,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  recordText: {
    color: '#fff',
    fontSize: 18,
  },
});
