import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, Alert, ActivityIndicator,
} from 'react-native';
import { Mail, ArrowLeft } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;
};

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendReset = () => {
    if (!email) {
      Alert.alert('Missing Email', 'Please enter your registered college email.');
      return;
    }

    setLoading(true);
    // Simulate sending reset email
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-slate-900"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex-1 px-6 pt-16 pb-10">

        {/* Back Button */}
        <TouchableOpacity
          className="flex-row items-center mb-10 self-start"
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color="#60a5fa" size={20} />
          <Text className="text-blue-400 text-base font-medium ml-2">Back to Sign In</Text>
        </TouchableOpacity>

        {sent ? (
          // Success State
          <View className="flex-1 justify-center items-center">
            <View className="w-24 h-24 rounded-full bg-emerald-500/20 border border-emerald-500/30 justify-center items-center mb-6">
              <Mail color="#10b981" size={44} />
            </View>
            <Text className="text-white text-2xl font-bold text-center mb-3">Check Your Email</Text>
            <Text className="text-slate-400 text-base text-center px-4">
              We've sent a password reset link to{'\n'}
              <Text className="text-blue-400 font-semibold">{email}</Text>
            </Text>
            <Text className="text-slate-500 text-sm text-center mt-4 px-6">
              Didn't receive the email? Check your spam folder, or tap below to resend.
            </Text>
            <TouchableOpacity
              className="mt-8 border border-blue-500/40 bg-blue-500/10 rounded-2xl px-8 py-4"
              onPress={() => setSent(false)}
            >
              <Text className="text-blue-400 font-semibold">Resend Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-4"
              onPress={() => navigation.replace('Login')}
            >
              <Text className="text-slate-400 text-sm">Back to Sign In</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Input State
          <View className="flex-1 justify-center">
            <View className="mb-8">
              <View className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 justify-center items-center mb-6">
                <Mail color="#60a5fa" size={32} />
              </View>
              <Text className="text-white text-3xl font-bold tracking-tight mb-2">Forgot Password?</Text>
              <Text className="text-slate-400 text-base leading-6">
                No worries! Enter your registered college email and we'll send you a link to reset your password.
              </Text>
            </View>

            <View style={{ gap: 16 }}>
              <View>
                <Text className="text-slate-400 text-xs font-semibold mb-2 ml-1 uppercase tracking-wider">College Email</Text>
                <View className="flex-row items-center bg-slate-800/80 rounded-2xl border border-slate-700 px-4 h-14">
                  <Mail color="#94a3b8" size={20} />
                  <TextInput
                    className="flex-1 text-white text-base ml-3"
                    placeholder="you@acet.ac.in"
                    placeholderTextColor="#64748b"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>
              </View>

              <TouchableOpacity
                className="bg-blue-600 h-14 rounded-2xl justify-center items-center mt-2 shadow-lg shadow-blue-500/30"
                onPress={handleSendReset}
                disabled={loading}
              >
                {loading
                  ? <ActivityIndicator color="#fff" />
                  : <Text className="text-white text-lg font-bold">Send Reset Link</Text>
                }
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
