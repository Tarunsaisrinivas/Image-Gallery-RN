// app/search.js
import React, { useState } from "react";
import { View, TextInput, Keyboard, Alert } from "react-native";
import { Snackbar } from "react-native-paper";
import ImageGrid from "../components/ImageGrid";
import Loader from "../components/Loader";
import { searchImages } from "../utils/api";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const handleSearch = async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      Alert.alert("Enter a keyword", "Try searching for 'cat' or 'dog'.");
      return;
    }

    Keyboard.dismiss();
    setLoading(true);
    setErrorVisible(false);

    try {
      const results = await searchImages(trimmedQuery);
      setImages(results);
    } catch (error) {
      console.error("Search Error:", error);
      setErrorVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        placeholder="Search images..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        style={{
          borderWidth: 1,
          padding: 8,
          marginBottom: 10,
          borderRadius: 6,
          borderColor: "#ccc",
        }}
      />
      {loading ? <Loader /> : <ImageGrid images={images} />}
      <Snackbar
        visible={errorVisible}
        onDismiss={() => setErrorVisible(false)}
        action={{ label: "Retry", onPress: handleSearch }}
      >
        Network error. Try again.
      </Snackbar>
    </View>
  );
}
