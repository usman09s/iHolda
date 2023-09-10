/* eslint-disable indent */
import { useEffect, useState } from 'react';
import { Camera } from 'expo-camera';

type PermissionGrantedType = {
  camera: boolean | undefined;
  microphone: boolean | undefined;
};

export const useHardwarePermission = () => {
  const [permissionLoading, setPermissionLoading] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState<PermissionGrantedType>({
    camera: undefined,
    microphone: undefined,
  });
  const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = Camera.useMicrophonePermissions();

  const notGrantedPermissionText = () => {
    const permissions = [];

    if (!permissionsGranted.camera) {
      permissions.push('camera');
    }
    if (!permissionsGranted.microphone) {
      permissions.push('microphone');
    }

    if (permissions.length === 0) {
      return '';
    }

    return `You need give ${
      permissions.length > 1
        ? permissions.join(' and ')
        : permissions.length === 1
        ? permissions[0]
        : ''
    } permission for recording.`;
  };

  const requestPermissions = async () => {
    setPermissionLoading(true);
    await requestCameraPermission()
      .then(result => {
        if (result.granted) {
          setPermissionsGranted(values => ({
            ...values,
            camera: true,
          }));
        }
      })
      .catch(() => null);

    await requestMicrophonePermission()
      .then(result => {
        if (result.granted) {
          setPermissionsGranted(values => ({
            ...values,
            microphone: true,
          }));
        }
      })
      .catch(() => null);

    setPermissionLoading(false);
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  return {
    cameraPermission,
    permissionLoading,
    permissionsGranted,
    microphonePermission,
    notGrantedPermissionText,
  };
};
