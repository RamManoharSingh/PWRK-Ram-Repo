import { Box, Modal, Typography } from "@mui/material";
import React from "react";

export default function CustomModal({ open, handleClose, children }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box onClick={handleClose} sx={{ textAlign: "right" }}>
          X
        </Box>
        {children}
      </Box>
    </Modal>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  overflow: "auto",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: "10px 20px 20px 20px",
  borderRadius: "10px",
};
