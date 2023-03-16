import _axios from 'frontend/api/axios';
// import { AWS_S3_CONFIG } from 'frontend/config';

// const s3Config = {
//   bucketName: AWS_S3_CONFIG.bucketName,
//   region: AWS_S3_CONFIG.region,
//   accessKeyId: AWS_S3_CONFIG.accessKeyId,
//   secretAccessKey: AWS_S3_CONFIG.secretAccessKey
// };

export const uploadMedia = async (file: any, folderName: string, subscription?: boolean, mediaType?: string) => {
  const formData = new FormData();
  formData.append('media', file);
  (subscription === true || subscription === false) && formData.append('subscription', subscription.toString());
  mediaType?.length && formData.append('media_type', mediaType);

  if (file.type.includes('video')) {
    formData.append('folder', 'videos');
  } else {
    formData.append('folder', folderName);
  }

  try {
    const res = await _axios.post('api/upload/media/', formData);
    return {
      success: true,
      data: res
    };
  } catch (e: any) {
    return {
      success: false,
      message: e.message
    };
  }
};
