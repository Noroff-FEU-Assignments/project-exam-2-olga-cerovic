import React from "react";
import { Button, IconButton, Stack } from "@mui/material";

function ImageUpload(props) {
  const { setSelectedFile } = props;

  const handleCapture = ({ target }) => {
    setSelectedFile(target.files[0]);
  };
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button variant="contained" component="label">
        Upload
        <input onChange={handleCapture} hidden accept="image/*" type="file" />
      </Button>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="label"
      ></IconButton>
    </Stack>
  );
}

export default ImageUpload;
