import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Lock, Mail } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Navigate to MainTabs immediately with dummy flow
    navigation.replace('MainTabs');
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-slate-900"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex-1 p-6 justify-center">
        <View className="mb-12">
          <Text className="text-4xl font-bold text-white mb-2 tracking-tight">Welcome Back</Text>
          <Text className="text-slate-400 text-base">Sign in to continue to Trace & Track</Text>
        </View>

        <View className="gap-4">
          <View className="flex-row items-center bg-slate-800/80 rounded-2xl border border-slate-700 px-4 h-14">
            <Mail color="#94a3b8" size={20} className="mr-3" />
            <TextInput
              className="flex-1 text-white text-base"
              placeholder="Student Email"
              placeholderTextColor="#94a3b8"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View className="flex-row items-center bg-slate-800/80 rounded-2xl border border-slate-700 px-4 h-14">
            <Lock color="#94a3b8" size={20} className="mr-3" />
            <TextInput
              className="flex-1 text-white text-base"
              placeholder="Password"
              placeholderTextColor="#94a3b8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity className="self-end mt-[-8px]">
            <Text className="text-blue-500 font-semibold text-sm">Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-blue-600 h-14 rounded-2xl justify-center items-center mt-4 shadow-lg shadow-blue-500/30" 
            onPress={handleLogin}
          >
            <Text className="text-white text-lg font-bold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = {};
