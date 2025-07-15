import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    paddingTop: 50,
  },
  listSection: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 5,
    fontSize: 18,
    backgroundColor: '#333',
    textAlign: 'left',
    color: 'white',
    width: '100%',
  },
  input: {
    width: '80%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#222',
    color: 'white',
  },
  inputSection: {
    padding: 100,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#444',
    paddingVertical: 12,
    width: '80%',
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default styles;
