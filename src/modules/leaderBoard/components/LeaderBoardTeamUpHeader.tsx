import { Image, Text, View } from 'react-native';
import Button from 'components/Button';
import { text } from 'theme/text';
import { units } from 'utils/helpers';
import { RankItemType } from 'types/LeaderBoardTypes';
import { getImageLink } from 'modules/moments/helpers/imageHelpers';

type Props = {
  winners: { first: RankItemType; second: RankItemType; third: RankItemType };
};

const LeaderBoardTeamUpHeader = ({ winners }: Props) => (
  <View className="bg-black">
    <View>
      <Button
        title="Price"
        type="solid"
        customContainer="bg-saffron self-center px-7 rounded-md py-3 mt-5 mb-4"
      />
      <Text className={text({ type: 'r13', class: 'text-white-o-80 text-center px-4 mb-3' })}>
        Ranking is done based on the number of people you meet physically and shared a moment with.
      </Text>
    </View>
    <View>
      <View className="items-center">
        <View>
          <View className="flex-row">
            <View className="border-4 border-saffron rounded-full self-center absolute right-6">
              <View className="border-2 border-white rounded-full self-center">
                <Image
                  source={{ uri: getImageLink(winners?.first?.avatar) }}
                  className="h-16 w-16 rounded-full"
                />
              </View>
            </View>
            <View className="border-4 border-green-500 rounded-full self-center left-6">
              <View className="border-2 border-white rounded-full self-center">
                <Image
                  source={{ uri: getImageLink(winners?.first?.avatar2) }}
                  className="h-16 w-16 rounded-full"
                />
              </View>
            </View>
          </View>
          <View className="absolute -bottom-3 self-center z-20 w-6 h-6 rounded-full bg-black justify-center items-center border-2 border-saffron">
            <Text className={text({ type: 'b12', class: 'text-white' })}>1</Text>
          </View>
        </View>
        <Text className={text({ type: 'm12', class: 'text-white mt-3' })}>{winners?.first.username} & {winners?.first.username2}</Text>
        <View className="bg-extraLightBlue px-5 py-0.5 rounded-md justify-center items-center mt-1.5">
          <Text className={text({ type: 'm12', class: 'text-black' })}>{winners.first.point}x</Text>
        </View>
      </View>
      <View
        className="flex-row justify-between bottom-6"
        style={{ marginHorizontal: units.vw * 2 }}>
        <View>
          <View>
            <View className="flex-row justify-center">
              <View className="border-[3px] border-saffron rounded-full left-2">
                <View className="border-[2px] border-white rounded-full self-center">
                  <Image
                    source={{ uri: getImageLink(winners?.second?.avatar) }}
                    className="h-10 w-10 rounded-full"
                  />
                </View>
              </View>
              <View className="border-[3px] border-green-500 rounded-full right-2">
                <View className="border-[2px] border-white rounded-full self-center">
                  <Image
                    source={{ uri: getImageLink(winners?.second?.avatar2) }}
                    className="h-10 w-10 rounded-full"
                  />
                </View>
              </View>
            </View>
            <View className="self-center z-20 w-6 h-6 rounded-full bg-black justify-center items-center border-2 border-white bottom-2 ">
              <Text className={text({ type: 'b12', class: 'text-white' })}>2</Text>
            </View>
          </View>
          <View className="items-center justify-center">
            <Text className={text({ type: 'm12', class: 'text-white' })}>{winners?.second.username} & {winners?.second.username2}</Text>
            <View className="bg-extraLightBlue px-3 py-0.5 rounded-md justify-center items-center mt-1.5">
              <Text className={text({ type: 'm12', class: 'text-black' })}>{winners.second.point}x</Text>
            </View>
          </View>
        </View>

        <View>
          <View className="justify-center items-center">
            <View className="flex-row">
              <View className="border-[3px] border-saffron rounded-full left-2">
                <View className="border-[2px] border-white rounded-full self-center">
                  <Image
                    source={{ uri: getImageLink(winners?.third?.avatar) }}
                    className="h-10 w-10 rounded-full"
                  />
                </View>
              </View>
              <View className="border-[3px] border-green-500 rounded-full right-2">
                <View className="border-[2px] border-white rounded-full self-center">
                  <Image
                    source={{ uri: getImageLink(winners?.third?.avatar2) }}
                    className="h-10 w-10 rounded-full"
                  />
                </View>
              </View>
            </View>
            <View className="self-center z-20 w-6 h-6 rounded-full bg-black justify-center items-center border-2 border-white bottom-2 ">
              <Text className={text({ type: 'b12', class: 'text-white' })}>3</Text>
            </View>
          </View>
          <View className="items-center justify-center">
            <Text className={text({ type: 'm12', class: 'text-white' })}>{winners?.third.username} & {winners?.third.username2}</Text>
            <View className="bg-extraLightBlue px-3 py-0.5 rounded-md justify-center items-center mt-1.5">
              <Text className={text({ type: 'm12', class: 'text-black' })}>{winners?.third.point}x</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default LeaderBoardTeamUpHeader;
