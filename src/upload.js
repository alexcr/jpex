import { useDropzone } from 'react-dropzone';

export function useUpload(onUpload) {
  return useDropzone({
    accept: 'application/json',
    multiple: false,
    noClick: true,
    onDropAccepted: async ([file]) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          onUpload(JSON.parse(reader.result));
        } catch(e) {
          onUpload(null);
        }
      };
      reader.readAsText(file);
    },
  });
}
