import { memo } from 'react';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomNavigationFilledIcons, BottomNavigationIcons } from 'components/Icons';
import colors from 'theme/colors';
import { units } from 'utils/helpers';

import BottomNavigationItem from './BottomNavigationItem';

const BottomNavigation = ({ navigation: { navigate }, state }: BottomTabBarProps) => {
  // console.log("🚀 ~ file: index.tsx:12 ~ BottomNavigation ~ state:", )
  // console.log("🚀 ~ file: index.tsx:12 ~ BottomNavigation ~ navigate:", navigate)
  const routes = state?.routes[0]?.state?.routes;
  const activeRoute = routes ? routes[routes.length - 1].name : 'Another';
  const onPressNavigate = (screen: string) => () => navigate(screen);
  const { bottom } = useSafeAreaInsets();

  if (activeRoute === 'Plastic' || activeRoute === 'PlasticDeliveredDetails') return null;

  return (
    <View className="border-t-b1 border-t-gray-200 bg-white" style={{ height: units.vh * 8 }}>
      <View
        className="pt-4 px-4 flex-row justify-between"
        style={{
          paddingBottom: Platform.select({
            android: bottom + 16,
            ios: bottom === 0 ? bottom + 16 : bottom,
          }),
        }}>
        {state?.routeNames.map((route, index) => {
          const isActive = state.index === index;
          const isRouteScreen = state.routes[state.index].state?.index === 0;
          const Icon = isActive ? BottomNavigationFilledIcons[route] : BottomNavigationIcons[route];

          // return null;

          return (
            <BottomNavigationItem
              key={route}
              onPress={() => {
                if (route === 'MomentsStack') {
                  return onPressNavigate('MomentsStackNav')();
                }

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
