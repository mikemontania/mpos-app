import React, { useState, useEffect } from 'react';
import { View, Image, ActivityIndicator, Text } from 'react-native';
import apiAxios from '../api/axios';
import { THEME_COLOR } from '../theme/theme';

interface ImageLoaderProps {
  imageUrl: string;
}

export const ImageLoader: React.FC<ImageLoaderProps> = ({ imageUrl }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const { data } = await apiAxios.get(imageUrl, { responseType: 'blob' });
 
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64data = reader.result?.toString() || '';
          setBase64Image(base64data);
          setLoading(false);
        };

        reader.readAsDataURL(data);
      } catch (error: any) {
        console.error('Error loading image:', error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    loadImage();
  }, [imageUrl]);

  if (loading) {
    return <ActivityIndicator size="large" color={'white'} />;
  }

  if (error) {
    return <Text>Error al cargar la imagen: {error}</Text>;
  }

  return (
    <View>
      {base64Image ? (
        <Image source={{ uri: base64Image }} style={{ width: 100, height: 100 }} />
      ) : (
        <Text>La imagen no está disponible</Text>
      )}
    </View>
  );
};
