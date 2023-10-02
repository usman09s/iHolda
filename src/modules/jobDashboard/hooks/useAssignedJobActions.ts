import { useCallback, useRef, useState } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, TextInput } from 'react-native';
import PagerView, { PagerViewOnPageScrollEvent } from 'react-native-pager-view';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { units } from 'utils/helpers';

import { JobDashboardStackParamList } from '../JobDashboardStackNavigator';

export const useAssignedJobActions = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [activeTaskItem, setActiveTaskItem] = useState(-1);
  const pagerViewRef = useRef<PagerView>(null);
  const onPressTabItem = (value: number) => () => {
    setTabIndex(value);
    pagerViewRef.current?.setPage(value);
  };
  const { bottom } = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const inputValueRef = useRef('');
  const scrollYRef = useRef(0);
  const flatListRef = useRef<FlatList>(null);
  const {} = useNavigation<NavigationProp<JobDashboardStackParamList>>();
  const [messages, setMessages] = useState(
    new Array(1).fill('').map((_, messageItemIndex) => `${messageItemIndex}- Hello!`),
  );
  const scrollY = useSharedValue(0);

  const onPageScroll = (e: PagerViewOnPageScrollEvent) => {
    setTabIndex(e.nativeEvent.position);
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (tabIndex === 1) {
      return;
    }
    scrollYRef.current = event.nativeEvent.contentOffset.y;

    if (inputRef.current?.isFocused()) {
      return;
    }

    scrollY.value = event.nativeEvent.contentOffset.y;
  };

  const onSendMessage = useCallback((newMessage: string) => {
    if (!newMessage) {
      return;
    }

    setMessages(values => [newMessage, ...values]);

    if (tabIndex === 0) {
      flatListRef.current?.scrollToIndex({ index: 0 });
    }

    inputRef.current?.clear();
    inputValueRef.current = '';
  }, []);

  const onFocusMessageInput = () => {
    scrollY.value = withTiming(units.vh * 40);
  };

  const onBlurMessageInput = () => {
    scrollY.value = withTiming(units.vh * 0);
  };

  const onHandleOpenTaskDetail = (id: number) => () => {
    if (activeTaskItem === id) {
      scrollY.value = withTiming(units.vh * 0);
    } else {
      scrollY.value = withTiming(units.vh * 40);
    }

    setActiveTaskItem(prevValue => (prevValue === id ? -1 : id));
  };

  return {
    bottom,
    scrollY,
    tabIndex,
    onScroll,
    messages,
    inputRef,
    flatListRef,
    onPageScroll,
    pagerViewRef,
    onSendMessage,
    activeTaskItem,
    onPressTabItem,
    onBlurMessageInput,
    onFocusMessageInput,
    onHandleOpenTaskDetail,
  };
};
