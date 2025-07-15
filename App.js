import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, TextInput, StyleSheet, Text, View, Button } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {

  const [input, setInput] = useState('');
  const [groceryList, setGroceryList] = useState(['Apples', 'Bananas', 'Watermelons', 'Grapes']);

  const addItem = () => {
    if (input.trim() !== '') {
      setGroceryList([...groceryList, input]);
      setInput('');
    }
  };

  useEffect(() => {
    console.log('Grocery list:', groceryList);
  }, [groceryList]);

  return (
    <View style={styles.container}> 

      {/* List Section */}
      <View style={styles.listSection}>
        {groceryList.map((groceryItem, index) => (
          <Text key={index} style={styles.listItem}>{groceryItem}</Text>
        ))}
      </View>


      {/* Input Section */}
      <View style={styles.inputSection}>

        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a grocery item"
          placeholderTextColor="#aaa"
          style={styles.input}
        />

        <TouchableOpacity onPress={addItem} style={styles.button}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

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
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 12,
      marginVertical: 5,
      fontSize: 18,
      backgroundColor: '#333',
      textAlign: 'center',
      color: 'white',
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
