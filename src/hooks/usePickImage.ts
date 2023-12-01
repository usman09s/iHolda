import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { getImageFormatFromUrl } from 'utils/helpers';

const usePickImage = () => {
  // TODO: make type
  const [pickedImage, setPickedImage] = useState<any>('');
  const [pickingLoading, setPickingLoading] = useState(false);

  const pickImage = async (
    type: ImagePicker.MediaTypeOptions = ImagePicker.MediaTypeOptions.Images,
    allowsEditing = true
  ) => {
    setPickingLoading(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: type,
      allowsEditing,
      base64: true,
      aspect: [1, 1],
      quality: 0.7,
    }).catch(() => null);

    if (!result?.canceled) {
      const imageFormat = getImageFormatFromUrl(result?.assets[0].uri);
      setPickedImage({
        base64: `data:image/${imageFormat};base64,${result?.assets[0].base64}`,
        uri: result?.assets[0].uri,
        format: imageFormat,
        type: result?.assets[0].type,
      });
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
