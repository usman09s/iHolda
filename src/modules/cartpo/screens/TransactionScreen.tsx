import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, RefreshControl, Image } from 'react-native';
import { HamburgerIcon } from '../../../../assets/referralGift';
import TransactionInOut from 'modules/profile/components/TransactionInOut';
import Icons from 'components/Icons';
import { useIsFocused } from '@react-navigation/native';
import { useCartpoActions } from '../hooks/useCartpoActions';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserTransactions, selectUserTransactions } from 'store/cartpo/calculateSlice';
import { CustomTransaction } from '../components/CustomTransaction';
import { getImageLink } from '../../moments/helpers/imageHelpers';

const Header = () => {
  return (
    <View
      className="flex-row justify-between items-center pt-6 pb-3 px-6"
      style={{ borderBottomWidth: 1, borderColor: '#dcdcdc' }}>
      <View className="w-1/3" />
      <Text className="w-1/3 text-base font-bold text-center text-gray-500">Transactions</Text>
      <View className="w-1/3 items-end">
        <View className="border border-gray-400 justify-center items-center p-0.5 rounded-lg">
          <HamburgerIcon />
        </View>
      </View>
    </View>
  );
};

export const TransactionScreen = () => {
  const { handleGetTransactions } = useCartpoActions();
  const userTransactions = useSelector(selectUserTransactions);
  console.log(userTransactions[0]);
  const isFocused = useIsFocused();
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const handleRefresh = async () => {
    setRefresh(true);
    dispatch(clearUserTransactions());
    setPage(1);
    await handleGetTransactions(page);
    setRefresh(false);
  };

  useEffect(() => {
    if (isFocused) {
      handleGetTransactions(page);
    }
  }, [isFocused, page]);

  const keyExtractor = (item, index) => index.toString();

  const renderTransactionItem = ({ item }) => {
    const transactionType = item.type.toLowerCase();

    if (item.title === 'Discount Sale' && item.to) {
      const renderUserAvatar = userIndex => {
        const user = item.met?.users?.[userIndex];
        const userPhoto = user?.photo?.mediaId ? getImageLink(user.photo.mediaId) : null;

        return (
          <View
            className={`rounded-full border-[3px] ${
              userIndex === 1 ? 'right-4 border-green-500' : 'border-saffron'
            }  bg-gray-400 justify-center items-center`}>
            <View className="rounded-full border-[2px] border-white justify-center items-center">
              <Image
                source={{
                  uri: userPhoto ?? 'https://i.pravatar.cc/150?img=36',
                }}
                className="w-10 h-10 rounded-full"
              />
            </View>
          </View>
        );
      };

      if (item.met?.users?.length === 2) {
        return (
          <CustomTransaction
            key={item.createdAt}
            avatarComponent={
              <View className="flex-row">
                {renderUserAvatar(0)}
                {renderUserAvatar(1)}
              </View>
            }
            topText={item.title}
            bottomText={`to ${item.to.userName ? item.to.userName : 'Anonymous'}`}
            amount={`-${item.amount}`}
            type="positive"
            time={new Date(item.createdAt).toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          />
        );
      }

      return (
        <CustomTransaction
          key={item.createdAt}
          avatarComponent={
            <View className="rounded-full border-[3px] border-green-500 bg-gray-400 justify-center items-center mr-2">
              <View className="rounded-full border-[2px] border-white justify-center items-center">
                <Image
                  source={{
                    uri:
                      item.to.photo && item.to.photo.mediaId
                        ? getImageLink(item.to.photo.mediaId)
                        : 'https://i.pravatar.cc/150?img=36',
                  }}
                  className="w-10 h-10 rounded-full"
                />
              </View>
            </View>
          }
          topText={item.title}
          bottomText={`to ${item.to.userName ? item.to.userName : 'Anonymous'}`}
          amount={`-${item.amount}`}
          type="positive"
          time={new Date(item.createdAt).toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })}
        />
      );
    }

    return (
      <TransactionInOut
        key={item.createdAt}
        type={transactionType === 'topup' || item.title === 'Discount Sale' ? 'IN' : 'OUT'}
        title={item.title}
        value={`${transactionType === 'topup' || item.title === 'Discount Sale' ? '+' : '-'} ${
          item.amount
        } CFA`}
        subTitle={
          transactionType === 'topup' || transactionType === 'withdraw'
            ? 'via mobile money'
            : 'Anonymous'
        }
        date={new Date(item.createdAt).toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })}
        customContainerClass="bg-[#ededed] rounded-xl mb-0 my-1"
        symbol={
          transactionType === 'topup' || item.title === 'Discount Sale' ? (
            <Icons.CashInIcon />
          ) : (
            <Icons.CashOutIcon />
          )
        }
      />
    );
  };

  const renderTransactionList = () => {
    const transactionGroups = {};

    userTransactions.forEach(transaction => {
      const transactionDate = new Date(transaction.createdAt);
      const today = new Date();
      let formattedDate;
      if (
        transactionDate.getDate() === today.getDate() &&
        transactionDate.getMonth() === today.getMonth() &&
        transactionDate.getFullYear() === today.getFullYear()
      ) {
        formattedDate = 'Today';
      } else {
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        if (
          transactionDate.getDate() === yesterday.getDate() &&
          transactionDate.getMonth() === yesterday.getMonth() &&
          transactionDate.getFullYear() === yesterday.getFullYear()
        ) {
          formattedDate = 'Yesterday';
        } else {
          formattedDate = transactionDate.toLocaleDateString();
        }
      }

      if (!transactionGroups[formattedDate]) {
        transactionGroups[formattedDate] = [];
      }

      transactionGroups[formattedDate].push(transaction);
    });

    const onEndReached = () => {
      setPage(page + 1);
    };

    return (
      <>
        {Object.keys(transactionGroups).map(date => (
          <View key={date}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>{date}</Text>
            <FlatList
              data={transactionGroups[date]}
              keyExtractor={keyExtractor}
              renderItem={renderTransactionItem}
              showsVerticalScrollIndicator={false}
              onEndReached={onEndReached}
              onEndReachedThreshold={0.1}
            />
          </View>
        ))}
      </>
    );
  };

  return (
    <View className="mt-6">
      <Header />
      <ScrollView
        className="px-6 pb-8"
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={handleRefresh} />}>
        {userTransactions.length > 0 ? (
          renderTransactionList()
        ) : (
          <Text>No Transactions Currently</Text>
        )}
      </ScrollView>
    </View>
  );
};
