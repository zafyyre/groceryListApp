import { ScrollView, TouchableOpacity, TextInput, Text, View, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import styles from './styles';

export default function List() {

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
      setGroceryList([...groceryList, input]); // ... says keep everything already in the list
                                               // and just add this new item in the end.
      setInput('');
    }
  };

  const handleDelete = (itemToDelete) => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${itemToDelete}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setGroceryList((groceryList) =>
              groceryList.filter((item) => item !== itemToDelete)
            );
          },
        },
      ]
    );
  };

  useEffect(() => {
    console.log('Grocery list:', groceryList);
  }, [groceryList]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
        <View style={styles.container}> 
          {/* List Section */}
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
              <View style={styles.listSection}>
                {groceryList.map((groceryItem, index) => (
                <Swipeable
                  key={index}
                  renderRightActions={() => <View style={{ width: 1 }} />} // dummy view just to enable swipe
                  onSwipeableOpen={() => handleDelete(groceryItem)} // triggers alert
                >
                  <View style={styles.listItem}>
                    <Text style={styles.listItemText}>{groceryItem}</Text>
                  </View>
                </Swipeable>


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
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}