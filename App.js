import { StatusBar } from 'expo-status-bar';
import { TextInput, StyleSheet, Text, View, Button } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {

  const [input, setInput] = useState('');
  const [groceryList, setGroceryList] = useState([]);

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
        style={styles.inputSection}
        />

        <Button
          title='Add item'
          onPress={addItem}
          style={styles.buttonSection}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      flex: 1,
    },
    listSection: {
      flex: 1, // takes most of the vertical space
      paddingTop: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    listItem: {
      marginVertical: 8, // space between each item
      fontSize: 18,
      backgroundColor: 'blue',
      color: 'white',
    },
    inputSection: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      padding: 10, 
      marginBottom: 10,
      backgroundColor:'white'
    },
    buttonSection: {
      color: 'white'
    },
});
