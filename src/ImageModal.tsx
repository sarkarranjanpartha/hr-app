import { Typography } from "@mui/material";
import React from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export interface ImageModalProps {
  open: boolean;
  onClose: () => void;
  mediaUrl: string;
  mediaTitle: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  open,
  onClose,
  mediaUrl,
  mediaTitle,
}) => {
  const handleImageClick = () => {
    window.open(mediaUrl, "_blank");
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="image-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          {mediaTitle}
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "calc(100% - 40px)", // Adjust based on title height
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={mediaUrl}
            alt={mediaTitle}
            style={{
              maxWidth: "100%",
              maxHeight: "calc(90vh - 100px)",
              objectFit: "contain",
              cursor: "pointer",
            }}
            onClick={handleImageClick}
            tabIndex={0}
            onFocus={(e) => (e.currentTarget.style.cursor = "pointer")}
            onBlur={(e) => (e.currentTarget.style.cursor = "default")}
          />
        </Box>
      </Box>
    </Modal>
  );
};
export default ImageModal;
