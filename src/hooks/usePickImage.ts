import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { getImageFormatFromUrl } from 'utils/helpers';

const usePickImage = () => {
  const [pickedImage, setPickedImage] = useState('');
  const [pickingLoading, setPickingLoading] = useState(false);

  const pickImage = async () => {
    setPickingLoading(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [1, 1],
      quality: 0.7,
    }).catch(() => null);

    if (!result?.canceled) {
      const imageFormat = getImageFormatFromUrl(result?.assets[0].uri);
      // setPickedImage(`data:image/${imageFormat};base64,${result?.assets[0].base64}`);
      setPickedImage(result?.assets[0].uri);
    }

    setPickingLoading(false);
  };

  return {
    pickImage,
    pickedImage,
    pickingLoading,
  };
};

export default usePickImage;
