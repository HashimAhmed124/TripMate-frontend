import React, { memo, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { Hotel } from '../models/hotel';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Props {
  hotel: Hotel;
}

function HotelCardComponent({ hotel }: Props) {
  const images = hotel.images || [];
  const [loadedIdx, setLoadedIdx] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const onImageLoad = (idx: number) => {
    setLoadedIdx((prev) => [...prev, idx]);
  };

  const openModal = (idx: number) => {
    setActiveIndex(idx);
    setModalVisible(true);
    setTimeout(() => {
      scrollRef.current?.scrollTo({ x: idx * SCREEN_WIDTH, animated: false });
    }, 0);
  };

  return (
    <>
      <View style={styles.card}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
        >
          {images.map((uri, idx) => (
            <Pressable key={idx} onPress={() => openModal(idx)}>
              <View style={styles.imageWrapper}>
                <Image
                  source={uri}
                  style={styles.image}
                  contentFit="cover"
                  onLoad={() => onImageLoad(idx)}
                />
                {!loadedIdx.includes(idx) && (
                  <View style={styles.loader}>
                    <ActivityIndicator size="small" color="#888" />
                  </View>
                )}
              </View>
            </Pressable>
          ))}
        </ScrollView>
        {/* Hotel info */}
        <Text style={styles.name}>{hotel.name}</Text>
        <Text style={styles.tier}>{hotel.tier} • PKR {hotel.pricePerNight}/night</Text>
        <Text style={styles.rating}>Rating: {hotel.rating}/5</Text>
        <Text style={styles.amenities}>{hotel.amenities.join(', ')}</Text>
      </View>

      {/* Full-Screen Modal + Carousel */}
      <Modal visible={modalVisible} transparent>
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.fullscreenCarousel}
          >
            {images.map((uri, idx) => (
              <View key={idx} style={styles.fullscreenImageWrapper}>
                <Image
                  source={uri}
                  style={styles.fullscreenImage}
                  contentFit="contain"
                />
              </View>
            ))}
          </ScrollView>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 14, elevation: 3 },
  carousel: { marginBottom: 10 },
  imageWrapper: { width: SCREEN_WIDTH - 32, height: 165, borderRadius: 8, overflow: 'hidden', marginRight: 8 },
  image: { flex: 1 },
  loader: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fafafa' },
  name: { fontSize: 18, fontWeight: 'bold' },
  tier: { marginTop: 4, color: '#444' },
  rating: { marginTop: 4, color: '#444' },
  amenities: { marginTop: 4, color: '#666', fontStyle: 'italic' },

  // Modal styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)' },
  fullscreenCarousel: { flex: 1 },
  fullscreenImageWrapper: { width: SCREEN_WIDTH, height: SCREEN_HEIGHT },
  fullscreenImage: { flex: 1 },
});

export default memo(HotelCardComponent);
