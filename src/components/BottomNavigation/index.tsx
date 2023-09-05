import { memo } from 'react';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomNavigationFilledIcons, BottomNavigationIcons } from 'components/Icons';
import colors from 'theme/colors';

import BottomNavigationItem from './BottomNavigationItem';

const BottomNavigation = ({ navigation: { navigate }, state }: BottomTabBarProps) => {
  const onPressNavigate = (screen: string) => () => navigate(screen);
  const { bottom } = useSafeAreaInsets();

  return (
    <View className="border-t-b1 border-t-gray-200 bg-white">
      <View
        className="pt-4 px-4 flex-row justify-between"
        style={{
          paddingBottom: Platform.select({
            ios: bottom,
            android: bottom + 16,
          }),
        }}>
        {state?.routeNames.map((route, index) => {
          const isActive = state.index === index;
          const isRouteScreen = state.routes[state.index].state?.index === 0;
          const Icon = isActive ? BottomNavigationFilledIcons[route] : BottomNavigationIcons[route];

          return (
            <BottomNavigationItem
              key={route}
              onPress={() => {
                onPressNavigate(route)();
                const subState = state.routes[state.index].state;

                if (isActive && subState && !isRouteScreen && subState?.routeNames?.[0]) {
                  navigate(subState?.routeNames?.[0]);
                }
              }}
              icon={<Icon color={isActive ? colors.altoGray : colors.black} />}
            />
          );
        })}
      </View>
    </View>
  );
};

export default memo(BottomNavigation);
