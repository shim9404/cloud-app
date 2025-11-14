class ImageUploader {
  async upload(file) {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'cloudApp');//
    const result = await fetch( // 비동기 처리 지원(fetch가 표준) -> 하지만 axios를 많이 씀
      'https://api.cloudinary.com/v1_1/detzt05eu/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    return await result.json();
  }  
}
export default ImageUploader;