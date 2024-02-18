import { View, Text, Pressable, StyleSheet } from 'react-native';

import Colors from '../../constants/colors'

export default function PrimaryButton({ children, pressHandler, btnTextStyle }) {
  return (
    <View style={styles.buttonOuter}>
      <Pressable 
        style={({pressed}) => 
          pressed 
            ? [styles.buttonInner, styles.pressed] 
            : styles.buttonInner
        }
        onPress={pressHandler} 
        android_ripple={{color: Colors.primary600}}
      >
        {/* <Text style={styles.buttonText}>{children}</Text> */}
        <Text style={[styles.buttonText, btnTextStyle]}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuter: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
    // flex: 1,
  },
  buttonInner: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2, // Android only
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center'
  },
  pressed: {
    opacity: 0.75,
  }
})