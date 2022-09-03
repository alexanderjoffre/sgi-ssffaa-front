import fileDownload from 'js-file-download'
import { IFileBuffer } from '../typescript/interfaces/FileBuffer.interface';

export class FileDownloadHandler {

	private constructor() {}

	public static async download(fileGenerator: IFileBuffer, fileName: string ): Promise<void> {
		const buffer: ArrayBuffer = await fileGenerator.getArrayBuffer();
		fileDownload(buffer, fileName);
	}

}