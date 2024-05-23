import { Box, Chip, Grid, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadFileIcon from "@mui/icons-material/UploadFile";

type Props = {
  disabled?: boolean;
  onChange: (files: File[]) => void;
  fileType?: string;
};
const DragAndDropFile = ({ disabled, onChange }: Props) => {
  const [uploadedFiles, setUploadedFiles] = React.useState<Array<any>>([]);
  const [files, setFiles] = useState<Array<any>>([]);
  const [error, setError] = useState('');
  
  const onDrop = useCallback((acceptedFiles: any) => {
    if (files.length + acceptedFiles.length > 6) {
      setError('You can only upload up to 6 files');
      return;
    }
    setUploadedFiles(acceptedFiles);
    onChange(acceptedFiles);
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    setError('');
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [],
    },
    disabled: disabled,
    onDrop,
    // onDrop: (acceptedFiles) => {
    //   setUploadedFiles(acceptedFiles);
    //   onChange(acceptedFiles);
    //   setFiles(
    //     acceptedFiles.map((file) =>
    //       Object.assign(file, {
    //         preview: URL.createObjectURL(file),
    //       })
    //     )
    //   );
    //   // Call your backend API endpoint to upload files
    // },
  });

  const fileList = files.map((file, index) => {
    if (file?.type?.includes("application/pdf")) {
      return (
        <Grid key={index} item xs="auto">
          <Chip
            label={file.name}
            variant="outlined"
            onClick={()=>{}}
            onDelete={()=>{}}
            color="success" 
          />
        </Grid>
      );
    }
  });

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: "sans-serif",
      }}
      className="container"
    >
      <Box
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px",
          borderWidth: "1px",
          borderRadius: "4px",
          borderColor: "lightgray",
          borderStyle: " dashed",
          backgroundColor: "#fafafa",
          color: "#bdbdbd",
          outline: "none",
          transition: "border 0.24s ease-in-out",
        }}
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} />
        <UploadFileIcon fontSize="large" />
        <Typography sx={{ mt: 1 }}>
          <u>Click to upload</u> or drag and drop Bank Statements
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {fileList}
        </Grid>
      </Box>
    </Box>
  );
};

export default DragAndDropFile;
