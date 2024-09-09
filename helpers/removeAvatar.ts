import cloudinary from '@/lib/cloudinary';

const removeImage = async (publicId: string) => {
    try {
        await cloudinary.uploader.destroy(publicId);
        console.log('image removed');
    } catch (error) {
        console.log(error);
    }
};

export default removeImage;
