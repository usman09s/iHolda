import { Image, Text, View } from 'react-native';
import { text } from 'theme/text';
import { units, width } from 'utils/helpers';

const JobPhotosItem = ({ image }: { image: string }) => (
  <Image
    resizeMode="cover"
    className="rounded-lg mb-7"
    source={{ uri: image }}
    style={{ width: (width - 64) / 2, height: units.vh * 14 }}
  />
);

const JobPhotos = () => (
  <View className="mt-10  mx-2">
    <Text className={text({ type: 'b20', class: 'text-black-o-40 mb-6' })}>Photos of job done</Text>
    <View className="flex-wrap flex-row justify-between">
      <JobPhotosItem image="https://i.pravatar.cc/1024?img=32" />
      <JobPhotosItem image="https://i.pravatar.cc/1024?img=33" />
      <JobPhotosItem image="https://i.pravatar.cc/1024?img=34" />
      <JobPhotosItem image="https://i.pravatar.cc/1024?img=35" />
    </View>
  </View>
);

export default JobPhotos;
