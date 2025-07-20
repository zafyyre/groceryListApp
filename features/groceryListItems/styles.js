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
    paddingVertical: 6.25,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 5,
    backgroundColor: "#333",
    width: "100%", // full-width
    flexDirection: "row", // <== add this
    justifyContent: "space-between", // space between text and checkmark
    alignItems: "center", // vertically center content
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
  checkContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    width: 40,
    height: 40,
    transform: [{ scale: 4 }],
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 12.5,
  },
  emptyCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#ccc",
    backgroundColor: "transparent",
  },
});

export default styles;
