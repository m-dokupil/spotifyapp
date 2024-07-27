import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import { SpotifyItem } from "../interfaces/SpotifyItem";

interface ItemModalProps {
  open: boolean;
  onClose: () => void;
  item: SpotifyItem;
}

export const ItemModal: React.FC<ItemModalProps> = ({ open, onClose, item }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box sx={{ backgroundColor: '#fff', p: 4, maxWidth: 400, borderRadius: 3 }}>
        <Typography id="modal-title" variant="h6" component="h2">
          {item.name}
        </Typography>
        {item.album && (
          <>
            <Typography>Album: {item.album.name}</Typography>
            <Typography>Release Date: {item.album.release_date}</Typography>
          </>
        )}
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {item.description}
        </Typography>
      </Box>
    </Modal>
  );
};
