"use client"
import { useState } from "react";
import { Button } from "./ui/button";

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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
      setUploading(false);
      setImageUrl(data.storedReceiptUrl);
      
    } catch(error) {
      console.log(error);
      setUploading(false);
    }
  }

  return (
    <>
      <h1>Upload Receipt</h1>

      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} capture="environment"></input>
        <Button type="submit" disabled={!file || uploading}>
          {uploading? "Uploading..." : "Upload"}
        </Button>
      </form>

      {imageUrl ? <img id="receipt-image" src={imageUrl} alt="Uploaded receipt" style={{ height: "300px", width: "450px" }}/> : null}
    </>
  )
}

export default UploadForm;