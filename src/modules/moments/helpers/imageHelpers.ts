export const getImageLink = (id?: string) =>
  !id ? 'https://i.ibb.co/TRtHRG3/Untitled.png' : `https://imagedelivery.net/IhG0c0Nf6gp3rZmGe6l46A/${id}/public`;

export const getVideoLink = (id?: string) =>
  !id ? '' : `https://customer-rjkpc1fdl6d2d3bw.cloudflarestream.com/${id}/manifest/video.mpd`;

  export const getAudioLink = (id?: string) =>
  !id ? '' : `https://pub-e8b8891469724f80a6b2479c2fff3161.r2.dev/${id}`;
