import { StyleSheet, Image, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import { View, FlatList, Text } from 'react-native';

type coun = {
  id: Int32;
  name: String;
}

export default function TabTwoScreen() {

  const [postList, setPostList] = useState<coun[]>([]);

  const fetchData = async () => {
    const response = await fetch('https://project-db-285e4-default-rtdb.asia-southeast1.firebasedatabase.app/.json');
    const json = await response.json()
    setPostList(json.testcoun)
  };

  useEffect(() => {
    fetchData();
  }, [])
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/plan.jpg')}
          resizeMode='cover'
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <FlatList
          data = {postList}
          renderItem={({ item }) => {
            return (
              <View>
                <Text>{item.id}: {item.name}</Text>
              </View>
            )
          }}
        />
        
      </ThemedView>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
