// components/ImageGrid.js
import React from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 20;

export default function ImageGrid({
  images,
  onEndReached,
  loading,
  refreshControl,
}) {
  const handlePress = (item) => {
    const url = item.url || item.url_s;
    if (url) Linking.openURL(url);
  };

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image
            source={{ uri: item.thumbnailUrl || item.url_s }}
            style={styles.image}
          />
          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={2}>
              {item.title || "Untitled"}
            </Text>
            <TouchableOpacity
              onPress={() => handlePress(item)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      onEndReached={onEndReached || null}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading ? (
          <View style={{ padding: 16 }}>
            <ActivityIndicator size="large" />
          </View>
        ) : null
      }
      refreshControl={refreshControl || null}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  card: {
    width: cardWidth,
    backgroundColor: "#fff",
    margin: 8,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  image: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#5AA4B7",
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
});
