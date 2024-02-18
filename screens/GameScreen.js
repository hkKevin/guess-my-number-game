import {  useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, FlatList, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import PageTitle from '../components/ui/PageTitle'
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import InstructionText from '../components/ui/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem'

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({ onGuessRounds, userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [guessRounds, setGuessRounds] = useState([initialGuess])

  useEffect(() => {
    console.log('currentGuess', currentGuess)
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length)
      minBoundary = 1;
      maxBoundary = 100;
    }
  }, [currentGuess, userNumber, onGameOver])

  function nextGuessHandler(direction) {
    if ((direction === 'lower' && currentGuess < userNumber) || 
       (direction === 'greater' && currentGuess > userNumber)) {
        console.log('Dont LIE!!')
        Alert.alert("Don't Lie!", 'You know this is wrong.')
        return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRndNumber);
    setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds])
  }

  const guessRoundsListLength = guessRounds.length

  return (
    <View style={styles.screen}>
      <PageTitle>Opponent's Guess</PageTitle>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View style={styles.inputContainer}>
        <InstructionText extraStyle={styles.text}>Higher or lower?</InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.btnContainer}>
            <PrimaryButton 
              pressHandler={() => nextGuessHandler('greater')}
            ><Ionicons name='md-add' size={30} color='white' /></PrimaryButton>
          </View>
          <View style={styles.btnContainer}>
            <PrimaryButton 
              pressHandler={() => nextGuessHandler('lower')}
            ><Ionicons name='md-remove' size={30} color='white' /></PrimaryButton>
          </View>
        </View>
      </View>
      <View style={styles.guessContainer}>
        <FlatList 
          data={guessRounds}
          renderItem={item => (
            <GuessLogItem 
              roundNum={guessRoundsListLength - item.index} 
              guess={item.item} />
          )}
          keyExtractor={item => item} />
        {/* {guessRounds.map(guess => <Text key={guess}>{guess}</Text>)} */}
        <Text>You've guessed {guessRounds.length} {guessRounds.length > 1 ? 'rounds' : 'round'}.</Text>
      </View>
    </View>
  )
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
    marginVertical: 20,
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
  buttonsContainer: {
    flexDirection: 'row'
  },
  btnContainer: {
    flex: 1,
  },
  text: {
    marginBottom: 20
  },
  guessContainer: {
    marginHorizontal: 24,
    flex: 1,
  }
})
