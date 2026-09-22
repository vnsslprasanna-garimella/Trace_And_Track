import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { MapPin, Battery, Clock, ShieldCheck } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-slate-900" contentContainerStyle={{ padding: 24, paddingTop: 64 }}>
      <View className="flex-row justify-between items-center mb-8">
        <View>
          <Text className="text-slate-400 text-base">Good Morning,</Text>
          <Text className="text-white text-3xl font-bold tracking-tight">John Doe</Text>
        </View>
        <View className="w-12 h-12 rounded-full bg-slate-800 justify-center items-center border border-slate-700 shadow-sm">
          <Text className="text-white font-bold text-lg">JD</Text>
        </View>
      </View>

      <View className="bg-emerald-900/20 rounded-3xl p-6 mb-6 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
        <View className="flex-row items-center mb-2">
          <ShieldCheck color="#10b981" size={28} />
          <Text className="text-emerald-400 text-2xl font-bold ml-3 tracking-tight">Inside Campus</Text>
        </View>
        <Text className="text-emerald-200/70 text-base">Your tracking is currently active.</Text>
      </View>

      <View className="flex-row flex-wrap gap-4">
        <View className="flex-1 min-w-[45%] bg-slate-800/80 p-5 rounded-3xl border border-slate-700/50 shadow-sm">
          <MapPin color="#3b82f6" size={24} />
          <Text className="text-slate-400 text-sm mt-3 mb-1">Current Zone</Text>
          <Text className="text-white text-xl font-bold">CSE Block</Text>
        </View>
        
        <View className="flex-1 min-w-[45%] bg-slate-800/80 p-5 rounded-3xl border border-slate-700/50 shadow-sm">
          <Battery color="#f59e0b" size={24} />
          <Text className="text-slate-400 text-sm mt-3 mb-1">Battery</Text>
          <Text className="text-white text-xl font-bold">85%</Text>
        </View>

        <View className="w-full bg-slate-800/80 p-5 rounded-3xl border border-slate-700/50 shadow-sm">
          <Clock color="#94a3b8" size={24} />
          <Text className="text-slate-400 text-sm mt-3 mb-1">Last Updated</Text>
          <Text className="text-white text-xl font-bold">2 mins ago</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = {};
