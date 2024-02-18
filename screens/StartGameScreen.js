import { useState } from 'react';
import { TextInput, View, StyleSheet, Alert, Text } from 'react-native';

import PrimaryButton from '../components/ui/PrimaryButton';
import Colors from '../constants/colors'
import PageTitle from '../components/ui/PageTitle'
import InstructionText from '../components/ui/InstructionText';

export default function StartGameScreen ({onPickNumber}) {
  const [enteredNumber, setEnteredNumber] = useState('');

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }
  
  function resetInputHandler() {
    // console.log('Reset btn pressed')
    setEnteredNumber('');
  }
  
  function confirmInputHandler() {
    // console.log('Confirm btn pressed')
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      // show alert
      Alert.alert(
        'Invalid number!', 
        'Number has to be between 1 and 99',
        [{text: 'Okay', style: 'default', onPress: resetInputHandler}]
      )
      return;
    }
    // console.log('Valid number')
    onPickNumber(chosenNumber);
  }

  return (
    <View style={styles.screen}>
      <PageTitle>Guess My Number</PageTitle>
      <View style={styles.inputContainer}>
        <InstructionText>Enter a Number</InstructionText>
        <TextInput 
          style={styles.numberInput} 
          maxLength={2} 
          keyboardType='number-pad'
          autoCapitalize='none'
          autoCorrect={false}
          value={enteredNumber}
          onChangeText={numberInputHandler}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.btnContainer}>
            <PrimaryButton pressHandler={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.btnContainer}>
            <PrimaryButton pressHandler={confirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 50,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
    marginHorizontal: 24,
    borderRadius: 8,
    padding: 16,
    backgroundColor: Colors.primary800,
    elevation: 4, // Android only
    // iOS only:
    shadowColor: 'black', 
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  numberInput: {
    height: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    width: 50,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  btnContainer: {
    flex: 1,
  }
});