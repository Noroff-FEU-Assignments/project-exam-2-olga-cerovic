import React from "react";
import { Button } from "@mui/material";

function ImageUpload(props) {
  const { setSelectedFile } = props;

  const handleCapture = ({ target }) => {
    setSelectedFile(target.files[0]);
  };
  return (
    <Button
      variant="contained"
      component="label"
      sx={{
        position: "absolute",
        left: props.banner ? "15%" : "50%",
        transform: "translate(-50%, -50%)",
        opacity: "0.5",
        border: "none",
        "&:hover": {
          opacity: "1",
        },
      }}
    >
      Upload
      <input onChange={handleCapture} hidden accept="image/*" type="file" />
    </Button>
  );
}

export default ImageUpload;
