import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Map, Navigation } from 'lucide-react-native';

export default function LocationScreen() {
  return (
    <View className="flex-1 bg-slate-900 px-6 pt-16">
      <View className="mb-6">
        <Text className="text-white text-3xl font-bold tracking-tight">Location Details</Text>
      </View>
      
      {/* Mock Map Area */}
      <View className="flex-1 bg-slate-800/80 rounded-3xl justify-center items-center mb-6 border border-slate-700/50 shadow-md">
        <View className="w-24 h-24 rounded-full bg-blue-900/30 justify-center items-center mb-4">
          <Map color="#3b82f6" size={48} />
        </View>
        <Text className="text-white text-xl font-bold mb-2">Map Visualization</Text>
        <Text className="text-slate-400 text-sm text-center px-8">Leaflet Map will be integrated here to show boundaries and coordinates.</Text>
      </View>

      <View className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700/50 mb-8 shadow-sm">
        <View className="flex-row items-center border-b border-slate-700/50 pb-4 mb-4">
          <View className="w-10 h-10 rounded-full bg-emerald-500/20 justify-center items-center mr-4">
            <Navigation color="#10b981" size={20} />
          </View>
          <View>
            <Text className="text-white text-base font-medium">Latitude</Text>
            <Text className="text-slate-400 text-sm mt-1">12.9716° N</Text>
          </View>
        </View>
        
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-full bg-emerald-500/20 justify-center items-center mr-4">
            <Navigation color="#10b981" size={20} style={{ transform: [{ rotate: '90deg' }] }} />
          </View>
          <View>
            <Text className="text-white text-base font-medium">Longitude</Text>
            <Text className="text-slate-400 text-sm mt-1">77.5946° E</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = {};
