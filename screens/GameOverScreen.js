import { View, Image, StyleSheet, Text } from 'react-native'

import PageTitle from '../components/ui/PageTitle'
import Colors from '../constants/colors'
import PrimaryButton from '../components/ui/PrimaryButton';

export default function GameOverScreen({ roundsNum, selectedNum, onStartNewGame }) {
  return (
    <>
      <View style={styles.rootContainer}>
        <PageTitle>GAME OVER!</PageTitle>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../assets/images/success.png')} />
        </View>
        <Text style={styles.summaryText}>
          You need <Text style={styles.highlightText}>{roundsNum}</Text> rounds to guess the number <Text style={styles.highlightText}>{selectedNum}</Text>.
        </Text>
        <PrimaryButton pressHandler={onStartNewGame}>
          Start New Game
        </PrimaryButton>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    width: 300,
    height: 300,
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  highlightText: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500,
  },
});