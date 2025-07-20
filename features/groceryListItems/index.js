import { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import stringSimilarity from "string-similarity";

import styles from "./styles";
import {
  addItem,
  listenToItems,
  updateItem,
  deleteItem,
} from "../../services/firestore/items";

export default function GroceryListItems() {
  // State to manage input, grocery list items, and currently editing item ID
  const inputRef = useRef(null);

  const [input, setInput] = useState("");
  const [groceryList, setGroceryList] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);

  // Listen to grocery items from Firestore constantly
  // and update the state when items change
  useEffect(() => {
    const unsubscribe = listenToItems(setGroceryList);
    return unsubscribe;
  }, []);

  const handleSubmit = async () => {
    const trimmedInput = input.trim();
    if (trimmedInput === "") return;

    const SIMILARITY_THRESHOLD = 0.6;

    const exactMatch = groceryList.some(
      (item) => item.groceryItem.toLowerCase() === trimmedInput.toLowerCase()
    );

    // Check for fuzzy matches using string similarity`
    // This will find items that are similar but not exact
    // based on a threshold
    // what is the threshold for similarity?
    // Adjust the threshold as needed
    // to control how similar items need to be to trigger a warning
    const fuzzyMatch = groceryList.find(
      (item) =>
        stringSimilarity.compareTwoStrings(
          item.groceryItem.toLowerCase(),
          trimmedInput.toLowerCase()
        ) > SIMILARITY_THRESHOLD
    );

    // Ask before adding if a similar or exact item is found
    if (!editingItemId && (exactMatch || fuzzyMatch)) {
      const matchedItem = fuzzyMatch?.groceryItem || trimmedInput;
      Alert.alert(
        "Duplicate or Similar Item",
        `"${trimmedInput}" looks similar to "${matchedItem}". Add it anyway?`,
        [
          { text: "No", style: "cancel" },
          {
            text: "Yes",
            onPress: async () => {
              try {
                await addItem(trimmedInput);
                setInput("");
              } catch (e) {
                console.error("Error adding item:", e);
              }
            },
          },
        ]
      );
      return;
    }

    // If no duplicates, proceed with adding or updating the item
    // If editing, update the item; otherwise, add a new item
    // Reset the input field after submission
    // and clear the editing state
    try {
      if (editingItemId) {
        await updateItem(editingItemId, trimmedInput);
        setEditingItemId(null);
      } else {
        await addItem(trimmedInput);
      }
      setInput("");
    } catch (e) {
      console.error("Error submitting item:", e);
    }
  };

  const handleDelete = (id, name) => {
    Alert.alert("Delete Item", `Are you sure you want to delete "${name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteItem(id);
          } catch (e) {
            console.error("Error deleting item:", e);
          }
        },
      },
    ]);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.listSection}>
              {groceryList.map(({ id, groceryItem }) => (
                <Swipeable
                  key={id}
                  onSwipeableOpen={() => handleDelete(id, groceryItem)}
                  renderRightActions={() => <View style={{ width: 1 }} />}
                >
                  <View style={styles.listItem}>
                    <TouchableOpacity
                      onPress={() => {
                        setInput(groceryItem);
                        setEditingItemId(id);
                        inputRef.current.focus();
                      }}
                    >
                      <Text style={styles.listItemText}>{groceryItem}</Text>
                    </TouchableOpacity>
                  </View>
                </Swipeable>
              ))}
            </View>
          </ScrollView>

          <View style={styles.inputSection}>
            <TextInput
              ref={inputRef}
              value={input}
              onChangeText={setInput}
              placeholder="Type a grocery item"
              placeholderTextColor="#aaa"
              style={styles.input}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>
                {editingItemId ? "Update Item" : "Add Item"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}
