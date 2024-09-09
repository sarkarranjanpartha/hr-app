import { Dialog } from "@mui/material";
import React from "react";

export interface ImageModalProps {
  mediaUrl: string;
  mediaTitle: string;
  openImageModal: boolean;
  setOpenImageModal: (pram: boolean) => void;
}

const ImageModal = (props: ImageModalProps) => {
  console.log(props);
  const { mediaUrl, mediaTitle, openImageModal } = props;
  const handleCloseImageModal = () => props.setOpenImageModal(false);

  return (
    <div>
      <React.Fragment>
        <Dialog
          fullWidth={false}
          maxWidth={"lg"}
          open={openImageModal}
          onClose={handleCloseImageModal}
        >
          <img
            src={mediaUrl}
            alt={mediaTitle}
            loading="lazy"
            width="300px"
            height="300px"
          />
        </Dialog>
      </React.Fragment>
    </div>
  );
};
export default ImageModal;
