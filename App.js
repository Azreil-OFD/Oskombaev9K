import React from 'react';
import { Text, View } from 'react-native';
import ProductsScreen from './screens/ProductsScreen';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ProductsScreen />
    </View>
  );
}