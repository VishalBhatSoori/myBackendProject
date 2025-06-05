import {v2 as cloudinary} from 'cloudinary';
import fs from'fs';

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:CLOUDINARY_API_SECRET
});

const uploadFileOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type:"auto"
            }
        )
        console.log("File has been succesfully uploaded",response.url);
        return response;
    } catch (error) {
        fs.unlink(localFilePath)
        console.log("Error: The file upload has failed and hence the file path has been unlinked")
        return null
    }
};

export {uploadFileOnCloudinary};