import Axios from 'axios';
import Config from '@/config';
import FileUploadResponseDto from '@/entities/dto/response/file-upload-response-dto';

const FILE_CONTROLLER_PATH = 'files';

export default class FileService {
  static upload(file: any) {
    const data = new FormData();
    data.append('file', file);
    return Axios.post<FileUploadResponseDto>(`${Config.BASE_API_URL}/${FILE_CONTROLLER_PATH}/upload`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
