import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useState } from 'react';
import {
  LiquidGlassView,
  LiquidGlassContainerView,
} from '@callstack/liquid-glass';
import {
  BellDot,
  FileStack,
  Home,
  Inbox,
  Menu,
  PlusIcon,
  Settings,
} from 'lucide-react-native';

import SegmentedControl from '@react-native-segmented-control/segmented-control';
import TabMenuItem from './src/components/TabMenuItem';

const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();
  const [isActive, setIsActive] = useState(false);
  const mainTabScale = useSharedValue(1);
  const plusIconRotate = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    height: isActive
      ? withTiming(310, { duration: 150 })
      : withTiming(0, { duration: 150 }),
    opacity: isActive
      ? withSpring(1, { duration: 150 })
      : withTiming(0, { duration: 150 }),
    padding: isActive ? 16 : withTiming(0, { duration: 150 }),
  }));

  const mainTabStyle = useAnimatedStyle(() => ({
    transform: [{ scale: mainTabScale.value }],
  }));

  const plusIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: plusIconRotate.value + 'deg' }],
  }));

  const onPlusButtonPress = () => {
    if (!isActive) {
      mainTabScale.value = withSequence(
        withTiming(0.5, { duration: 150 }),
        withSpring(1, {
          stiffness: 900,
          damping: 60,
          mass: 8,
        }),
      );
      plusIconRotate.value = withTiming(45, { duration: 200 });
    } else {
      mainTabScale.value = withSequence(
        withTiming(1.1, { duration: 150 }),
        withTiming(0.9, { duration: 150 }),
        withSpring(1, {
          stiffness: 600,
          damping: 130,
          mass: 9,
        }),
      );
      plusIconRotate.value = withTiming(0, { duration: 150 });
    }
    setTimeout(() => {
      setIsActive(prev => !prev);
    }, 200);
  };

  return (
    <LiquidGlassContainerView style={[styles.container, { bottom }]}>
      <Animated.View style={mainTabStyle}>
        <LiquidGlassView style={styles.liquidGlassView}>
          <Animated.View style={[styles.menuContainer, animatedStyle]}>
            <TabMenuItem
              icon={Home}
              label="Home"
              delay={0}
              isActive={isActive}
            />
            <TabMenuItem
              icon={Inbox}
              label="Inbox"
              delay={100}
              isActive={isActive}
            />
            <TabMenuItem
              icon={BellDot}
              label="Notifications"
              delay={200}
              isActive={isActive}
            />
            <TabMenuItem
              icon={FileStack}
              label="Views"
              delay={300}
              isActive={isActive}
            />
            <TabMenuItem
              icon={Settings}
              label="Settings"
              delay={400}
              isActive={isActive}
            />
            <TabMenuItem
              icon={Menu}
              label="Customize"
              delay={500}
              isActive={isActive}
            />
          </Animated.View>
          <SegmentedControl
            tintColor="rgba(255,255,255,0.5)"
            values={[
              { systemImage: 'house' },
              { systemImage: 'tray' },
              { systemImage: 'bell.badge' },
              { systemImage: 'square.stack.3d.up' },
            ]}
            activeFontStyle={styles.segmentedControlActiveFont}
            style={[
              styles.segmentedControl,
              isActive && styles.segmentedControlHidden,
            ]}
            selectedIndex={0}
            onChange={event => {
              navigation.navigate(
                state.routeNames[event.nativeEvent.selectedSegmentIndex],
              );
            }}
          />
        </LiquidGlassView>
      </Animated.View>
      <Pressable onPress={onPlusButtonPress} style={styles.plusButtonContainer}>
        <LiquidGlassView interactive style={styles.plusButtonGlass}>
          <Animated.View style={plusIconStyle}>
            <PlusIcon />
          </Animated.View>
        </LiquidGlassView>
      </Pressable>
    </LiquidGlassContainerView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'flex-end',
    position: 'absolute',
    marginHorizontal: 16,
  },
  liquidGlassView: {
    borderRadius: 30,
    backgroundColor: 'transparent',
  },
  menuContainer: {
    padding: 16,
    gap: 12,
  },
  segmentedControlActiveFont: {
    color: 'orange',
    fontWeight: '800',
    fontSize: 40,
  },
  segmentedControl: {
    height: 60,
    width: 280,
  },
  segmentedControlHidden: {
    opacity: 0,
  },
  plusButtonContainer: {
    marginRight: 12,
  },
  plusButtonGlass: {
    width: 60,
    height: 60,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomTabBar;
