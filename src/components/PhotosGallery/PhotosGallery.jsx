import { Grid, PhotosGalleryItem } from "..";

export const PhotosGallery = ({images, openModal}) => {
  return <Grid> 
    {images.map(({alt, avg_color, src, id}) => 
    <PhotosGalleryItem openModal={openModal} avg_color={avg_color} src={src} alt={alt} key={id}/>)}
    
  </Grid>
};
