// app/index.js
import React, { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import ImageGrid from "../components/ImageGrid";
import { getRecentImages } from "../utils/api";
import { getData, storeData } from "../utils/cache";

export default function HomeScreen() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadImages = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    setLoading(true);

    const cached = await getData("recent_images");
    if (cached && !isRefresh) setImages(cached);

    try {
      const newImages = await getRecentImages(page);
      if (JSON.stringify(newImages) !== JSON.stringify(cached)) {
        setImages(newImages);
        await storeData("recent_images", newImages);
      }
    } catch {
      if (cached) setImages(cached);
    }
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    loadImages();
  }, [page]);

  return (
    <ImageGrid
      images={images}
      onEndReached={() => setPage((prev) => prev + 1)}
      loading={loading}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => loadImages(true)}
        />
      }
    />
  );
}
