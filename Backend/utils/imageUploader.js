import {v2 as cloudinary} from 'cloudinary'


//File uploader function
export const uploadImageToCloudinary = async(file,folder,height,quality)=>{
  try{
    const options = {
      folder,
    }
    if(height){
      options.height=height;
    }
    if(quality){
      options.quality=quality;
    }
    options.resource_type='auto'

  
    return await cloudinary.uploader.upload(file.tempFilePath,options);

  }catch(error){
    console.log('Error uploading to Cloudinary:', error.message);
  }

  }

// upload multiple images

export const uploadMultipleImages = async(files,folder,quality,height)=>{
  try{
   let options = {
    folder
   }
   if(quality){
    options.quality = quality
   }
   if(height){
    options.height=height;
   }
   if(!Array.isArray(files)) files = [files];

   const uploadPromiss = files.map(file=> cloudinary.uploader.upload(file.tempFilePath,options));
  console.log('uploadPromiss',uploadPromiss)
   const results = await Promise.all(uploadPromiss);

   const secureUrls = results
   .filter(result => result !== null)
   .map(result => result.secure_url);

 return secureUrls;

  }catch(eroro){
    console.log('Error to upload multiple files');
    return [];
  }
}






