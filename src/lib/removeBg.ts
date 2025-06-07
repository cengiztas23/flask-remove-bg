export const removeBackground = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('https://flask-rembg.onrender.com/remove-bg', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Arka plan silme işlemi başarısız.');
  }

  const blob = await response.blob();
  return URL.createObjectURL(blob);
};
