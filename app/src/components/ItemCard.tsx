import React from "react";
import { Card, CardContent, Box, Typography, IconButton } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { SpotifyItem } from "../interfaces/SpotifyItem";
import { useAppContext } from "../context/context";

interface ItemCardProps {
  category: string;
  key: string;
  item: SpotifyItem;
  onPlay: () => void;
  onDetails: () => void;
  onFavorite: (item: SpotifyItem, category: string) => void;
  isFavorite: boolean;
}

const getImage = (item: SpotifyItem, category: string) => {
  switch (category) {
    case 'albums':
      return item.images[0]?.url
    case 'artists':
      return item.images[0]?.url
    case 'playlists':
      return item.images[0]?.url
    case 'tracks':
      return item.album.images[0].url;
    case 'shows':
      return item.images[0]?.url
  }
}

export const ItemCard: React.FC<ItemCardProps> = ({ category, item, onPlay, onDetails, onFavorite, isFavorite }) => {
  const { userData } = useAppContext();

  return (
    <Card sx={{ display: 'flex', maxWidth: '550px', m: '5px' }}>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <CardContent sx={{ width: '100%', flex: '1 0 auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <a href={item.external_urls.spotify}>
              <img src={getImage(item, category)} alt={item.name} width={100} height={100} />
            </a>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
              {userData && userData.premium && category === 'tracks'
                ? 
                  (
                  <IconButton aria-label="play/pause" disabled={userData.premium ?? true} onClick={onPlay}>
                    <PlayArrowIcon/>
                  </IconButton>
                  ) 
                :
                  (
                    item.preview_url && (
                      <audio controls >
                        <source src={item.preview_url} type="audio/mpeg" />
                      </audio>
                    )
                  )
              }
              <IconButton aria-label="details" onClick={onDetails}>
                <InfoIcon />
              </IconButton>
              <IconButton aria-label="like" onClick={() => onFavorite(item, category)}>
                <FavoriteIcon sx={{ color: item.isFavorite ? 'red' : 'inherit' }} />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <Typography component="div" variant="h5" textAlign='center'>{item.name}</Typography>
              {item.artists && (
                <Typography variant="subtitle1" color="text.secondary" textAlign='center'>
                  {item.artists[0]?.name}
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};
