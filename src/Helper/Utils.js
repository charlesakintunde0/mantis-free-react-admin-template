import { v4 as uuidv4 } from 'uuid';
import { useGetImageFileQuery } from "api/helperApi";
import axios from 'axios';


export const getImage = async (imageUrl, imgId) => {
    try {
        const afterSlash = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
        const imageName = afterSlash.substring(0, afterSlash.lastIndexOf('.'));
        const urlObject = new URL(imageUrl);
        const ext = urlObject.pathname.split('.').pop();
        const format = ext === 'png' ? 'png' : ext === 'jpg' || ext === 'jpeg' ? 'jpeg' : 'jfif';

        const response = await axios.get('https://localhost:44361/api/helper/getImageFile?url=' + imageUrl, { responseType: 'arraybuffer' });
        // const response = useGetImageFileQuery(imageUrl);
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const fileUid = uuidv4();
        const file = new File([blob], `${imageName}.${ext}`, { type: `image/${format}` });
        const thumbUrl = URL.createObjectURL(file);
        console.log(imageName)
        return {
            uid: fileUid,
            originFileObj: file,
            thumbUrl,
            name: imageName,
            imgId: imgId,
            imageUrl: imageUrl
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};