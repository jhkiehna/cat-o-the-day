import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';

const iOSFont = 'AvenirNext-Bold, Avenir Next, sans-serif-medium, sans-serif';

export const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    fontFamily: Platform.OS === 'ios' ? iOSFont : 'sans-serif',
    fontWeight: 'bold',
    fontSize: 40,
    margin: 20,
  },
  input: {
    paddingHorizontal: 10,
    marginBottom: 10,
    minWidth: '50%',
    borderWidth: 1,
    borderColor: 'lightblue',
    borderStyle: 'solid',
    borderRadius: 3,
  },
  catimg: {
    marginTop: 30,
    width: '80%',
    height: 200,
  },
});
