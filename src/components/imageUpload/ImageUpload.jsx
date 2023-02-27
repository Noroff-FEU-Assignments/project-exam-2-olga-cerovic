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
        left: props.banner ? "85%" : "55%",
        top: props.banner ? "85%" : "112%",
        transform: "translate(-50%, -50%)",
        // opacity: "0.5",
        border: "none",
        "&:hover": {
          opacity: "1",
        },
        "@media screen and (max-width: 400px)": {
          backgroundColor: "red",
        },
      }}
    >
      Upload
      <input onChange={handleCapture} hidden accept="image/*" type="file" />
    </Button>
  );
}

export default ImageUpload;
