import { ScrollView, TouchableOpacity, TextInput, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles';

export default function App() {

  const [input, setInput] = useState('');
  const [groceryList, setGroceryList] = useState([
    'Apples', 'Bananas', 'Watermelons', 'Grapes',
    'Oranges', 'Strawberries', 'Blueberries', 'Mangoes',
    'Pineapples', 'Cherries', 'Peaches', 'Plums',
    'Tomatoes', 'Lettuce', 'Carrots', 'Broccoli',
    'Cucumbers', 'Spinach', 'Potatoes', 'Onions'
  ]);

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
        <ScrollView contentContainerStyle={styles.scrollContainer}>

          <View style={styles.listSection}>
            {groceryList.map((groceryItem, index) => (
              <Text key={index} style={styles.listItem}>{groceryItem}</Text>
            ))}
          </View>
        </ScrollView>


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