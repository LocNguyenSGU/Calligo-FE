import { useState } from 'react';
import axios from 'axios';

function FileUploader() {
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      progress: 0,
    }));
    setPreviews(newPreviews);
  };

  const handleUpload = async () => {
    const updatedPreviews = [...previews];

    for (let i = 0; i < previews.length; i++) {
      const formData = new FormData();
      formData.append('file', previews[i].file);

      try {
        await axios.post('/your-upload-endpoint', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (event) => {
            const progress = Math.round((event.loaded * 100) / event.total);
            updatedPreviews[i].progress = progress;
            setPreviews([...updatedPreviews]);
          },
        });
      } catch (error) {
        console.error(`Upload failed for file ${i}`, error);
      }
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {previews.map((item, index) => (
          <div key={index}>
            {item.file.type.startsWith('image') ? (
              <img
                src={item.url}
                alt="preview"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            ) : item.file.type.startsWith('video') ? (
              <video
                src={item.url}
                controls
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            ) : (
              <p>{item.file.name}</p>
            )}
            <p>{item.progress}%</p>
          </div>
        ))}
      </div>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUploader;