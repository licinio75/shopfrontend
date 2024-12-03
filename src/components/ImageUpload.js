import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import '../App.css';

const ImageUpload = ({ onFilesChange, previews }) => {
  const onDrop = useCallback((acceptedFiles) => {
    onFilesChange(acceptedFiles);
  }, [onFilesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true, // Permitir múltiples archivos
  });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      <div className="previews">
        {previews.map((preview, index) => (
          <img key={index} src={preview} alt={`Preview ${index}`} className="preview" />
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
