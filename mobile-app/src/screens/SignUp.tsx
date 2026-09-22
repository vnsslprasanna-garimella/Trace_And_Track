import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator,
} from 'react-native';
import { Mail, Lock, User, Hash, ChevronDown, CheckCircle, Eye, EyeOff } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
};

const ALLOWED_DOMAINS = ['@acet.ac.in', '@aec.edu.in', '@acoe.edu.in', '@adityauniversity.in'];

const BRANCHES = [
  'CSE', 'CSE (AI & ML)', 'CSE (Data Science)', 'CSE (Cyber Security)',
  'ECE', 'EEE', 'Mechanical', 'Civil', 'Chemical', 'IT',
  'Biotechnology', 'MBA', 'MCA', 'Other',
];

const COLLEGE_TYPES = ['Autonomous', 'University'];

function isValidCollegeEmail(email: string): boolean {
  return ALLOWED_DOMAINS.some(domain => email.toLowerCase().endsWith(domain));
}

function isValidPassword(password: string): { valid: boolean; message: string } {
  if (password.length < 8) return { valid: false, message: 'At least 8 characters required' };
  if (!/[A-Z]/.test(password)) return { valid: false, message: 'At least one uppercase letter required' };
  if (!/[a-z]/.test(password)) return { valid: false, message: 'At least one lowercase letter required' };
  if (!/[0-9]/.test(password)) return { valid: false, message: 'At least one number required' };
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { valid: false, message: 'At least one special character required' };
  }
  return { valid: true, message: '' };
}

export default function SignUpScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [branch, setBranch] = useState('');
  const [showBranchPicker, setShowBranchPicker] = useState(false);
  const [college, setCollege] = useState('');
  const [showCollegePicker, setShowCollegePicker] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState<{type: 'error' | 'success' | 'info', text: string} | null>(null);

  const handleSendOtp = () => {
    setMessage(null);
    if (!isValidCollegeEmail(email)) {
      setMessage({ type: 'error', text: 'Only college emails are allowed:\n• @acet.ac.in\n• @aec.edu.in\n• @acoe.edu.in\n• @adityauniversity.in' });
      return;
    }
    setSendingOtp(true);
    // Simulate OTP send
    setTimeout(() => {
      setSendingOtp(false);
      setOtpSent(true);
      setMessage({ type: 'info', text: `A 6-digit OTP has been sent to ${email}` });
    }, 1500);
  };

  const handleVerifyOtp = () => {
    setMessage(null);
    if (otp.length !== 6) {
      setMessage({ type: 'error', text: 'Please enter the 6-digit OTP sent to your email.' });
      return;
    }
    // Simulate OTP verification (mock: 123456)
    if (otp === '123456') {
      setEmailVerified(true);
      setMessage({ type: 'success', text: 'Your college email has been verified successfully!' });
    } else {
      setMessage({ type: 'error', text: 'The OTP you entered is incorrect. Please try again.' });
    }
  };

  const handleSignUp = () => {
    setMessage(null);
    if (!name.trim()) { setMessage({ type: 'error', text: 'Please enter your full name.' }); return; }
    if (!pin || pin.length < 4) { setMessage({ type: 'error', text: 'PIN must be at least 4 characters.' }); return; }
    if (!emailVerified) { setMessage({ type: 'error', text: 'Please verify your college email before proceeding.' }); return; }
    if (!branch) { setMessage({ type: 'error', text: 'Please select your branch.' }); return; }
    if (!college) { setMessage({ type: 'error', text: 'Please select your college type.' }); return; }
    const pwdCheck = isValidPassword(password);
    if (!pwdCheck.valid) { setMessage({ type: 'error', text: pwdCheck.message }); return; }
    if (password !== confirmPassword) { setMessage({ type: 'error', text: 'Passwords do not match.' }); return; }

    // TODO: Call signup API
    navigation.replace('Login', { successMessage: 'Account created successfully! Please sign in.' });
  };

  const pwdCheck = isValidPassword(password);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-slate-900"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="px-6 pt-16 pb-10">

          {/* Header */}
          <TouchableOpacity className="flex-row items-center mb-8" onPress={() => navigation.goBack()}>
            <Text className="text-blue-400 text-base font-medium">← Back to Sign In</Text>
          </TouchableOpacity>

          <Text className="text-white text-3xl font-bold tracking-tight mb-1">Create Account</Text>
          <Text className="text-slate-400 text-base mb-6">Join Trace & Track with your college email</Text>

          <View style={{ gap: 14 }}>
            {message && (
              <View className={`p-3 rounded-xl border ${message.type === 'error' ? 'bg-red-500/10 border-red-500/30' : message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-blue-500/10 border-blue-500/30'}`}>
                <Text className={`${message.type === 'error' ? 'text-red-400' : message.type === 'success' ? 'text-emerald-400' : 'text-blue-400'} text-sm text-center font-medium`}>
                  {message.text}
                </Text>
              </View>
            )}

            {/* Full Name */}
            <View>
              <Text className="text-slate-400 text-xs font-semibold mb-2 ml-1 uppercase tracking-wider">Full Name</Text>
              <View className="flex-row items-center bg-slate-800/80 rounded-2xl border border-slate-700 px-4 h-14">
                <User color="#94a3b8" size={18} />
                <TextInput
                  className="flex-1 text-white text-base ml-3"
                  placeholder="Your full name"
                  placeholderTextColor="#64748b"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            {/* PIN Number */}
            <View>
              <Text className="text-slate-400 text-xs font-semibold mb-2 ml-1 uppercase tracking-wider">PIN Number</Text>
                <View className="flex-row items-center bg-slate-800/80 rounded-2xl border border-slate-700 px-4 h-14">
                <Hash color="#94a3b8" size={18} />
                <TextInput
                  className="flex-1 text-white text-base ml-3"
                  placeholder="4–10 character PIN"
                  placeholderTextColor="#64748b"
                  value={pin}
                  onChangeText={setPin}
                  keyboardType="default"
                  maxLength={10}
                />
              </View>
            </View>

            {/* College Email + OTP */}
            <View>
              <Text className="text-slate-400 text-xs font-semibold mb-2 ml-1 uppercase tracking-wider">College Email</Text>
              <View className="flex-row items-center gap-2">
                <View className={`flex-1 flex-row items-center bg-slate-800/80 rounded-2xl border px-4 h-14 ${emailVerified ? 'border-emerald-500/60' : 'border-slate-700'}`}>
                  <Mail color={emailVerified ? "#10b981" : "#94a3b8"} size={18} />
                  <TextInput
                    className="flex-1 text-white text-base ml-3"
                    placeholder="you@acet.ac.in"
                    placeholderTextColor="#64748b"
                    value={email}
                    onChangeText={text => { setEmail(text); setOtpSent(false); setEmailVerified(false); }}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    editable={!emailVerified}
                  />
                  {emailVerified && <CheckCircle color="#10b981" size={20} />}
                </View>
                {!emailVerified && (
                  <TouchableOpacity
                    className="bg-blue-600 rounded-2xl px-4 h-14 justify-center items-center"
                    onPress={handleSendOtp}
                    disabled={sendingOtp}
                  >
                    {sendingOtp
                      ? <ActivityIndicator color="#fff" size="small" />
                      : <Text className="text-white font-bold text-sm">{otpSent ? 'Resend' : 'Verify'}</Text>
                    }
                  </TouchableOpacity>
                )}
              </View>
              <Text className="text-slate-500 text-xs mt-1 ml-1">
                Allowed: @acet.ac.in · @aec.edu.in · @acoe.edu.in · @adityauniversity.in
              </Text>

              {/* OTP Entry */}
              {otpSent && !emailVerified && (
                <View className="mt-3 flex-row items-center gap-2">
                  <View className="flex-1 flex-row items-center bg-slate-800/80 rounded-2xl border border-slate-700 px-4 h-14">
                    <TextInput
                      className="flex-1 text-white text-base tracking-widest"
                      placeholder="Enter 6-digit OTP"
                      placeholderTextColor="#64748b"
                      value={otp}
                      onChangeText={setOtp}
                      keyboardType="numeric"
                      maxLength={6}
                    />
                  </View>
                  <TouchableOpacity
                    className="bg-emerald-600 rounded-2xl px-4 h-14 justify-center items-center"
                    onPress={handleVerifyOtp}
                  >
                    <Text className="text-white font-bold text-sm">Confirm</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Branch Picker */}
            <View>
              <Text className="text-slate-400 text-xs font-semibold mb-2 ml-1 uppercase tracking-wider">Branch</Text>
              <TouchableOpacity
                className="flex-row items-center justify-between bg-slate-800/80 rounded-2xl border border-slate-700 px-4 h-14"
                onPress={() => { setShowBranchPicker(!showBranchPicker); setShowCollegePicker(false); }}
              >
                <Text className={branch ? 'text-white text-base' : 'text-slate-500 text-base'}>
                  {branch || 'Select your branch'}
                </Text>
                <ChevronDown color="#94a3b8" size={18} />
              </TouchableOpacity>
              {showBranchPicker && (
                <View className="bg-slate-800 rounded-2xl border border-slate-700 mt-2 overflow-hidden">
                  {BRANCHES.map(b => (
                    <TouchableOpacity
                      key={b}
                      className={`px-4 py-3 border-b border-slate-700/50 ${branch === b ? 'bg-blue-600/20' : ''}`}
                      onPress={() => { setBranch(b); setShowBranchPicker(false); }}
                    >
                      <Text className={`text-base ${branch === b ? 'text-blue-400 font-semibold' : 'text-white'}`}>{b}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* College Type Picker */}
            <View>
              <Text className="text-slate-400 text-xs font-semibold mb-2 ml-1 uppercase tracking-wider">College Type</Text>
              <TouchableOpacity
                className="flex-row items-center justify-between bg-slate-800/80 rounded-2xl border border-slate-700 px-4 h-14"
                onPress={() => { setShowCollegePicker(!showCollegePicker); setShowBranchPicker(false); }}
              >
                <Text className={college ? 'text-white text-base' : 'text-slate-500 text-base'}>
                  {college || 'University or Autonomous'}
                </Text>
                <ChevronDown color="#94a3b8" size={18} />
              </TouchableOpacity>
              {showCollegePicker && (
                <View className="bg-slate-800 rounded-2xl border border-slate-700 mt-2 overflow-hidden">
                  {COLLEGE_TYPES.map(c => (
                    <TouchableOpacity
                      key={c}
                      className={`px-4 py-3 border-b border-slate-700/50 ${college === c ? 'bg-blue-600/20' : ''}`}
                      onPress={() => { setCollege(c); setShowCollegePicker(false); }}
                    >
                      <Text className={`text-base ${college === c ? 'text-blue-400 font-semibold' : 'text-white'}`}>{c}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Password */}
            <View>
              <Text className="text-slate-400 text-xs font-semibold mb-2 ml-1 uppercase tracking-wider">Password</Text>
              <View className="flex-row items-center bg-slate-800/80 rounded-2xl border border-slate-700 px-4 h-14">
                <Lock color="#94a3b8" size={18} />
                <TextInput
                  className="flex-1 text-white text-base ml-3"
                  placeholder="Min 8 chars, uppercase, number, special"
                  placeholderTextColor="#64748b"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-2 -mr-2">
                  {showPassword ? <EyeOff color="#94a3b8" size={20} /> : <Eye color="#94a3b8" size={20} />}
                </TouchableOpacity>
              </View>
              {password.length > 0 && !pwdCheck.valid && (
                <Text className="text-red-400 text-xs mt-1 ml-1">⚠ {pwdCheck.message}</Text>
              )}
              {password.length > 0 && pwdCheck.valid && (
                <Text className="text-emerald-400 text-xs mt-1 ml-1">✓ Strong password</Text>
              )}
            </View>

            {/* Confirm Password */}
            <View>
              <Text className="text-slate-400 text-xs font-semibold mb-2 ml-1 uppercase tracking-wider">Confirm Password</Text>
              <View className="flex-row items-center bg-slate-800/80 rounded-2xl border border-slate-700 px-4 h-14">
                <Lock color="#94a3b8" size={18} />
                <TextInput
                  className="flex-1 text-white text-base ml-3"
                  placeholder="Re-enter password"
                  placeholderTextColor="#64748b"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} className="p-2 -mr-2">
                  {showConfirmPassword ? <EyeOff color="#94a3b8" size={20} /> : <Eye color="#94a3b8" size={20} />}
                </TouchableOpacity>
              </View>
              {confirmPassword.length > 0 && confirmPassword !== password && (
                <Text className="text-red-400 text-xs mt-1 ml-1">⚠ Passwords do not match</Text>
              )}
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              className="bg-blue-600 h-14 rounded-2xl justify-center items-center mt-4 shadow-lg shadow-blue-500/30"
              onPress={handleSignUp}
            >
              <Text className="text-white text-lg font-bold">Create Account</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
