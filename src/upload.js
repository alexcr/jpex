import { useDropzone } from 'react-dropzone';

export function useUpload(onUpload) {
  return useDropzone({
    accept: 'application/json',
    multiple: false,
    noClick: true,
    onDropAccepted: async ([file]) => {
      const reader = new FileReader();
      reader.onload = () => {
        let json = null;
        try {
          json = JSON.parse(reader.result);
        } catch(e) {
          // do nothing
        }
        onUpload(json);
      };
      reader.readAsText(file);
    },
  });
}
