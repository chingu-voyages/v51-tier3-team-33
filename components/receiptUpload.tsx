"use client"
import { useState } from "react";

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch('/api/s3-upload', {
        method: "POST",
        body: formData
      })

      const data = await response.json();
      console.log(data.status);
      setUploading(false);
      
    } catch(error) {
      console.log(error);
      setUploading(false);
    }
  }

  return (
    <>
      <h1>Upload Receipt</h1>

      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange}></input>
        <button type="submit" disabled={!file || uploading}>
          {uploading? "Uploading..." : "Upload"}
        </button>
      </form>
    </>
  )
}

export default UploadForm;