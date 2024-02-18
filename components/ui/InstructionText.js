import { Text, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

export default function InstructionText({ children, extraStyle }) {
  return <Text style={[styles.instructionText, extraStyle]}>{children}</Text>
}

const styles = StyleSheet.create({
  instructionText: {
    fontSize: 18,
    color: Colors.accent500,
    textAlign: 'center',
    padding: 12,
    fontFamily: 'open-sans',
  }
});