import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Bell, MapPin, Battery, ShieldAlert } from 'lucide-react-native';

export default function SettingsScreen() {
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [backgroundTracking, setBackgroundTracking] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [batteryOptimization, setBatteryOptimization] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[Typography.h1, { color: Colors.text }]}>Settings</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={[Typography.caption, styles.sectionTitle]}>PERMISSIONS & TRACKING</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingLabel}>
              <MapPin color={Colors.primary} size={20} style={styles.icon} />
              <Text style={[Typography.body, { color: Colors.text }]}>Location Services</Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: Colors.border, true: Colors.primary }}
            />
          </View>
          <View style={[styles.settingRow, styles.noBorder]}>
            <View style={styles.settingLabel}>
              <ShieldAlert color={Colors.accent} size={20} style={styles.icon} />
              <Text style={[Typography.body, { color: Colors.text }]}>Background Tracking</Text>
            </View>
            <Switch
              value={backgroundTracking}
              onValueChange={setBackgroundTracking}
              trackColor={{ false: Colors.border, true: Colors.primary }}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[Typography.caption, styles.sectionTitle]}>PREFERENCES</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingLabel}>
              <Bell color={Colors.warning} size={20} style={styles.icon} />
              <Text style={[Typography.body, { color: Colors.text }]}>Push Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: Colors.border, true: Colors.primary }}
            />
          </View>
          <View style={[styles.settingRow, styles.noBorder]}>
            <View style={styles.settingLabel}>
              <Battery color={Colors.success} size={20} style={styles.icon} />
              <Text style={[Typography.body, { color: Colors.text }]}>Battery Optimization</Text>
            </View>
            <Switch
              value={batteryOptimization}
              onValueChange={setBatteryOptimization}
              trackColor={{ false: Colors.border, true: Colors.primary }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 24,
    paddingTop: 64,
  },
  header: {
    marginBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: Colors.textMuted,
    marginBottom: 8,
    marginLeft: 8,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  settingLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
});
