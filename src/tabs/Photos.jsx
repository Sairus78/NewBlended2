import { getPhotos } from 'apiService/photos';
import { Button, Form, Loader, PhotosGallery, Text } from 'components';
import { useEffect, useState } from 'react';

export const Photos = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const {photos, per_page, total_results} = await getPhotos(query, page);
        if (photos.length === 0) {
return setIsEmpty(true);
        }
        setImages((prevImages) => [...prevImages, ...photos]) 
        setIsVisible(page < Math.ceil(total_results/per_page))
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [page, query]);
  const handlSubmit = value => {
    setQuery(value);
    setImages([])
    setPage(1)
    setError(null)
    setIsEmpty(false)
    setIsVisible(false)
  };
  const handleLoad = () => {
    setPage((prevPage) => prevPage + 1)
  } 
  return (
    <>
      <Form onSubmit={handlSubmit} />
      {images.length > 0 && <PhotosGallery images={images}/>}
      {isVisible && !isLoading && images.length > 0 && <Button onClick={handleLoad} disabled={isLoading}>{isLoading ? 'Loading':'LoadMore'} </Button>}
      {!images.length && !isEmpty && <Text textAlign="center">Let`s begin search 🔎</Text>}
      {isLoading && <Loader />}
      {error && <Text textAlign="center">❌ Something went wrong - {error}</Text>}
      {isEmpty && <Text textAlign="center"> Sorry.There are no images ... 😭</Text>}
    </>
  );
};
