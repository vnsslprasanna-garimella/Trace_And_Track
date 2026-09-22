import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { User, LogOut, ChevronRight } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

export default function ProfileScreen({ navigation }: any) {
  const handleLogout = () => {
    navigation.getParent()?.replace('Login');
  };

  return (
    <View className="flex-1 bg-slate-900 px-6 pt-16">
      <View className="mb-6">
        <Text className="text-white text-3xl font-bold tracking-tight">Profile</Text>
      </View>
      
      <View className="bg-slate-800/80 rounded-3xl p-8 items-center mb-8 border border-slate-700/50 shadow-md">
        <View className="w-24 h-24 rounded-full bg-blue-600/20 border-2 border-blue-500/30 justify-center items-center mb-4">
          <User color="#60a5fa" size={40} />
        </View>
        <Text className="text-white text-2xl font-bold tracking-tight">John Doe</Text>
        <Text className="text-slate-400 text-base mt-1">Computer Science & Eng.</Text>
        <View className="bg-blue-500/10 px-4 py-2 rounded-full mt-4 border border-blue-500/20">
          <Text className="text-blue-400 font-semibold">ID: 2026CSE001</Text>
        </View>
      </View>

      <View className="bg-slate-800/80 rounded-3xl overflow-hidden border border-slate-700/50 mb-8 shadow-sm">
        <TouchableOpacity className="flex-row justify-between items-center p-5 border-b border-slate-700/50">
          <Text className="text-white text-base font-medium">Personal Details</Text>
          <ChevronRight color="#94a3b8" size={20} />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-between items-center p-5">
          <Text className="text-white text-base font-medium">Campus Zone History</Text>
          <ChevronRight color="#94a3b8" size={20} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        className="flex-row items-center justify-center bg-red-500/10 p-4 rounded-2xl border border-red-500/20 shadow-sm" 
        onPress={handleLogout}
      >
        <LogOut color="#ef4444" size={20} className="mr-2" />
        <Text className="text-red-500 text-base font-bold">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {};
