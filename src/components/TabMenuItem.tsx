import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface TabMenuItemProps {
  icon: React.ComponentType<any>;
  label: string;
  delay: number;
  isActive: boolean;
}

const TabMenuItem: React.FC<TabMenuItemProps> = ({
  icon: Icon,
  label,
  delay,
  isActive,
}) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(100)}
      key={isActive ? `active-${label}` : `inactive-${label}`}
      style={[styles.container, label === 'Home' && styles.activeBackground]}
    >
      <Icon />
      <Text>{label}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
  },
  activeBackground: {
    backgroundColor: '#eee',
  },
});

export default TabMenuItem;
