import css from "./PhotosGalleryItem.module.css"
import { GridItem } from "..";

export const PhotosGalleryItem = ({alt, avg_color, src, openModal}) => {
  return <GridItem>
    <div className={css.thumb} style={{backgroundColor: avg_color, borderColor: avg_color}}>
      <img src={src.large} alt={alt} onClick={() => openModal(src.large, alt)}/>
    </div>
  </GridItem>
};
