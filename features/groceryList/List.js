import { ScrollView, TouchableOpacity, TextInput, Text, View, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

import styles from './styles';

import { collection, addDoc, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../src/firebase/firebase';


export default function List() {

  const [input, setInput] = useState('');
  const [groceryList, setGroceryList] = useState([]);


  const addItem = async () => {
    if (input.trim() !== '') {
      try {
        await addDoc(collection(db, 'groceryItems'), {
          groceryItem: input,
        });
        setInput('');
      } catch (error) {
        console.error('Error adding item:', error);
      }
    }
  };


  const handleDelete = (id) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'groceryItems', id));
            } catch (error) {
              console.error('Error deleting item:', error);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'groceryItems'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        groceryItem: doc.data().groceryItem,
      }));
      setGroceryList(items);
    });

    return () => unsubscribe();
  }, []);


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
                {groceryList.map(({ id, groceryItem }) => (
                  <Swipeable
                    key={id}
                    onSwipeableOpen={() => handleDelete(id)}
                    renderRightActions={() => <View style={{ width: 1 }} />}
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