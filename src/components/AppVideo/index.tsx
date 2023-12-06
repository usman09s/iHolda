import React, { memo, useCallback, useEffect, useRef } from 'react';

import { Video } from 'expo-av';
import { VideoProps } from 'expo-av/src/Video.types';

/**
 * On iOS, the video does not always reliable load.
 * So we are setting a timer when the load starts, and then if the video is not ready after 300 ms, we are reloading it.
 * https://github.com/expo/expo/issues/20483
 */
function AppVideo(props: VideoProps) {
  const [shouldVideoReload, setShouldVideoReload] = React.useState(false);
  const isVideoReadyRef = useRef<boolean>(false);

  const potentiallyReloadVideo = useCallback(() => {
    setTimeout(() => {
      if (!isVideoReadyRef.current) {
        setShouldVideoReload(true);
      }
    }, 300);
  }, []);

  useEffect(() => {
    if (shouldVideoReload) {
      setShouldVideoReload(false);
    }
  }, [shouldVideoReload]);

  return (
    <>
      {!shouldVideoReload && (
        <Video
//           onPlaybackStatusUpdate={status => console.log('status-----------------',status)}
          {...props}
          onLoadStart={() => {
            potentiallyReloadVideo();
            if (props.onLoadStart) {
              props.onLoadStart();
            }
          }}
          onReadyForDisplay={event => {
            isVideoReadyRef.current = true;
            if (props.onReadyForDisplay) {
              props.onReadyForDisplay(event);
            }
          }}
        />
      )}
    </>
  );
}

export default memo(AppVideo);
