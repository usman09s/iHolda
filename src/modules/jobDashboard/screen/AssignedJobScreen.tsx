import { FlatList, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import colors from 'theme/colors';

import AssignedJobHeader from '../components/AssignedJobHeader';
import MessageInputField from '../components/chat/RenderInputToolbar';
import UserBubble from '../components/chat/UserBubble';
import DoneSection from '../components/DoneSection';
import JobTabs from '../components/JobTabs';
import ToDoSection from '../components/ToDoSection';
import { useAssignedJobActions } from '../hooks/useAssignedJobActions';

const AssignedJobScreen = () => {
  const {
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
  } = useAssignedJobActions();

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.select({ android: undefined, ios: 'padding' })}>
        <AssignedJobHeader scrollY={scrollY} />
        <JobTabs
          activeIndex={tabIndex}
          tabs={['Chat', 'Tasks']}
          onPressTabItem={onPressTabItem}
          activeColor={colors.saffron}
        />
        <PagerView
          className="flex-1"
          initialPage={tabIndex}
          onPageScroll={onPageScroll}
          ref={pagerViewRef}>
          <FlatList
            inverted
            data={messages}
            ref={flatListRef}
            onScroll={onScroll}
            className="bg-white"
            scrollEventThrottle={1}
            windowSize={Platform.select({
              ios: 8,
              android: 2,
            })}
            initialNumToRender={Platform.select({
              ios: 4,
              android: 2,
            })}
            maxToRenderPerBatch={Platform.select({
              ios: 4,
              android: 2,
            })}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
            renderItem={({ item, index }) => (
              <UserBubble
                index={index}
                message={`${index} - ${item}`}
                isCurrentUser={index % 2 === 0}
              />
            )}
          />
          <View>
            <ScrollView
              horizontal
              pagingEnabled
              className="h-full"
              showsHorizontalScrollIndicator={false}>
              <ToDoSection
                activeTaskItem={activeTaskItem}
                onHandleOpenTaskDetail={onHandleOpenTaskDetail}
              />
              <DoneSection
                activeTaskItem={activeTaskItem}
                onHandleOpenTaskDetail={onHandleOpenTaskDetail}
              />
            </ScrollView>
          </View>
        </PagerView>
        <MessageInputField
          ref={inputRef}
          bottom={bottom}
          onSendMessage={onSendMessage}
          onBlurMessageInput={onBlurMessageInput}
          onFocusMessageInput={onFocusMessageInput}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default AssignedJobScreen;
