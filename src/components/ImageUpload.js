// src/components/ImageUpload.js
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUpload = ({ onFileChange, preview }) => {
  const onDrop = useCallback((acceptedFiles) => {
    onFileChange(acceptedFiles[0]);
  }, [onFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      {preview && <img src={preview} alt="Preview" className="preview" />}
    </div>
  );
};

export default ImageUpload;
