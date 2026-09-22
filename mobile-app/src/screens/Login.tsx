import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { Lock, Mail, Hash, Eye, EyeOff } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
  route: RouteProp<RootStackParamList, 'Login'>;
};

function detectInputType(value: string): 'email' | 'pin' | 'unknown' {
  if (/^\d+$/.test(value)) return 'pin';
  if (value.includes('@') || /[a-zA-Z]/.test(value)) return 'email';
  return 'unknown';
}

export default function LoginScreen({ navigation, route }: Props) {
  const [identifier, setIdentifier] = useState(''); // email OR pin
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{type: 'error' | 'success', text: string} | null>(
    route.params?.successMessage ? { type: 'success', text: route.params.successMessage } : null
  );

  const inputType = detectInputType(identifier);

  const handleLogin = () => {
    setMessage(null);
    if (!identifier.trim()) {
      setMessage({ type: 'error', text: 'Please enter your email or PIN number.' });
      return;
    }
    if (inputType === 'email' && !password) {
      setMessage({ type: 'error', text: 'Please enter your password.' });
      return;
    }
    navigation.replace('MainTabs');
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-slate-900"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 px-6 pt-20 pb-10 justify-center">

          {/* Header */}
          <View className="mb-10">
            <Text className="text-slate-400 text-base font-medium">Campus Safety & Monitoring</Text>
            <Text className="text-white text-4xl font-bold tracking-tight mt-1">
              Welcome to{'\n'}Trace & Track
            </Text>
            <Text className="text-slate-400 text-base mt-3">
              Sign in with your college email or PIN number
            </Text>
          </View>

          {/* Form */}
          <View style={{ gap: 14 }}>
            {message && (
              <View className={`p-3 rounded-xl border ${message.type === 'error' ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
                <Text className={`${message.type === 'error' ? 'text-red-400' : 'text-emerald-400'} text-sm text-center font-medium`}>
                  {message.text}
                </Text>
              </View>
            )}

            {/* Smart Email / PIN field */}
            <View>
              <View className={`flex-row items-center bg-slate-800/80 rounded-2xl border px-4 h-14 ${
                identifier.length > 0
                  ? inputType === 'pin'
                    ? 'border-blue-500/60'
                    : 'border-slate-600'
                  : 'border-slate-700'
              }`}>
                {inputType === 'pin'
                  ? <Hash color="#60a5fa" size={20} />
                  : <Mail color="#94a3b8" size={20} />
                }
                <TextInput
                  className="flex-1 text-white text-base ml-3"
                  placeholder="Email or PIN number"
                  placeholderTextColor="#64748b"
                  value={identifier}
                  onChangeText={setIdentifier}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
              {/* Smart hint label */}
              {identifier.length > 0 && (
                <Text className={`text-xs mt-1 ml-1 ${inputType === 'pin' ? 'text-blue-400' : 'text-slate-500'}`}>
                  {inputType === 'pin' ? '🔢 Logging in with PIN' : '📧 Logging in with email'}
                </Text>
              )}
            </View>

            {/* Password — only shown when using email */}
            {inputType !== 'pin' && (
              <View className="flex-row items-center bg-slate-800/80 rounded-2xl border border-slate-700 px-4 h-14">
                <Lock color="#94a3b8" size={20} />
                <TextInput
                  className="flex-1 text-white text-base ml-3"
                  placeholder="Password"
                  placeholderTextColor="#64748b"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-2 -mr-2">
                  {showPassword ? <EyeOff color="#94a3b8" size={20} /> : <Eye color="#94a3b8" size={20} />}
                </TouchableOpacity>
              </View>
            )}

            {/* Forgot Password — only when using email */}
            {inputType === 'email' && (
              <TouchableOpacity
                className="self-end"
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text className="text-blue-400 font-semibold text-sm">Forgot Password?</Text>
              </TouchableOpacity>
            )}

            {/* Sign In Button */}
            <TouchableOpacity
              className="bg-blue-600 h-14 rounded-2xl justify-center items-center mt-2 shadow-lg shadow-blue-500/30"
              onPress={handleLogin}
            >
              <Text className="text-white text-lg font-bold">Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View className="flex-row items-center my-8">
            <View className="flex-1 h-px bg-slate-700" />
            <Text className="text-slate-500 mx-4 text-sm">New to Trace & Track?</Text>
            <View className="flex-1 h-px bg-slate-700" />
          </View>

          {/* Sign Up Link */}
          <TouchableOpacity
            className="h-14 rounded-2xl justify-center items-center border border-blue-500/40 bg-blue-500/10"
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text className="text-blue-400 text-lg font-bold">Create an Account</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
