import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { MapPin } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

export default function SplashScreen({ navigation }: Props) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <View className="flex-1 bg-slate-900 justify-center items-center">
      <Animated.View 
        className="items-center"
        style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
      >
        <View className="w-24 h-24 rounded-full bg-blue-500 justify-center items-center mb-6 shadow-lg shadow-blue-500/50">
          <MapPin color="#ffffff" size={48} />
        </View>
        <Text className="text-4xl font-bold text-white mb-2">Trace & Track</Text>
        <Text className="text-base text-slate-400 font-medium">Campus Safety & Monitoring</Text>
      </Animated.View>
    </View>
  );
}

const styles = {};
