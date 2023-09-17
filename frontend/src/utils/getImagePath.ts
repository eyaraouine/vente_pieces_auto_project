export const getImagePath = (image: string) => {
    return image.startsWith("https")? image : `/${image}`;
}