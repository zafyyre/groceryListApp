import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    paddingTop: 50,
  },
  listSection: {
    paddingTop: 40,
  },
  listItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 5,
    backgroundColor: "#333",
    width: "100%", // full-width
  },
  listItemText: {
    color: "white",
    fontSize: 18,
  },
  input: {
    width: "80%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#222",
    color: "white",
  },
  inputSection: {
    padding: 50,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#444",
    paddingVertical: 12,
    width: "80%",
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 10,
    height: 47.5,
    marginVertical: 5,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default styles;
