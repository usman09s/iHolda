import { useEffect, useRef, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { addMoment, deleteMoment, setCaption, setSelectedMoment } from 'store/moments/momentsSlice';
import { MomentType } from 'types/MomentsTypes';
import { sH, wH } from 'utils/helpers';

import { useHardwarePermission } from './useHardwarePermission';

export const useSelfieActions = () => {
  const timerRef = useRef(0);
  const dispatch = useAppDispatch();
  const [videoDuration] = useState(10);
  const cameraRef = useRef<Camera>(null);
  const recordedVideoDurationRef = useRef(5);
  const { bottom, top } = useSafeAreaInsets();
  const [isRecording, setIsRecording] = useState(false);
  const [, setRecordTimeCounter] = useState(5);
  const [mediaType, setMediaType] = useState<'VIDEO' | 'PHOTO' | 'QUIZ'>('PHOTO');
  const { permissionsGranted, permissionLoading } = useHardwarePermission();

  const ratio = Platform.select({
    ios: '4:3',
    android: '16:9',
  });

  const takeShot = async () => {
    const result = await cameraRef.current?.takePictureAsync({ base64: true, quality: 0.7 });

    dispatch(
      addMoment({
        type: 'PHOTO',
        localUri: result?.uri || '',
        base64: `data:image/png;base64,${result?.base64}` || '',
      }),
    );
  };

  const startRecording = async () => {
    setIsRecording(true);
    setTimeout(async () => {
      const data = await cameraRef.current?.recordAsync({
        mirror: false,
        maxDuration: videoDuration,
      });

      if (data?.uri) {
        dispatch(
          addMoment({
            base64: '',
            type: 'VIDEO',
            localUri: data?.uri || '',
          }),
        );
      }
    }, 200);
  };

  const onPressRecordButton = () => {
    if (mediaType === 'PHOTO') {
      return takeShot();
    }
    if (!isRecording) {
      return recordVideo();
    }

    setIsRecording(false);
    cameraRef.current?.stopRecording();
  };

  const recordVideo = async () => {
    if (!permissionsGranted.microphone) {
      Alert.alert('Informing', 'Microphone permission is not accepted.', [
        {
          text: 'Start Recording',
          onPress: startRecording,
        },
        {
          text: 'Go to Settings',
          onPress: Linking.openSettings,
        },
      ]);

      return;
    }

    startRecording();
  };

  const stopVideo = async () => {
    setIsRecording(false);
    setRecordTimeCounter(5);
    cameraRef.current?.stopRecording();
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    timerRef.current = 0;

    if (isRecording && videoDuration) {
      interval = setInterval(() => {
        timerRef.current += 1;
        recordedVideoDurationRef.current += 1;
        if (timerRef.current >= videoDuration) {
          stopVideo();
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRecording, videoDuration]);

  const showCamera =
    !permissionLoading && permissionsGranted.camera && permissionsGranted.microphone;

  const onDeleteMoment = (value: MomentType) => {
    dispatch(deleteMoment(value.id));

    FileSystem.deleteAsync(value.localUri);
  };

  const onSelectedMoment = (value?: MomentType | undefined) => dispatch(setSelectedMoment(value));

  const onChangeCaption = (value: string) => dispatch(setCaption(value));

  useEffect(
    () => () => {
      onSelectedMoment();
    },
    [],
  );

  const height = Platform.select({ android: wH, ios: sH }) || 0;
  const cameraHeight = (height - top - bottom) * 0.9;
  const cameraBottomComponentHeight = (height - top - bottom) * 0.08;

  return {
    ratio,
    takeShot,
    mediaType,
    cameraRef,
    stopVideo,
    showCamera,
    isRecording,
    recordVideo,
    setMediaType,
    videoDuration,
    onDeleteMoment,
    onChangeCaption,
    onSelectedMoment,
    permissionLoading,
    permissionsGranted,
    onPressRecordButton,
    cameraType: CameraType.front,
    sizes: {
      top,
      bottom,
      height,
      cameraHeight,
      cameraBottomComponentHeight,
    },
    recordTimeCounter: videoDuration - timerRef.current,
  };
};
