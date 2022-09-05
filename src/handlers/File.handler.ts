import fileDownload from 'js-file-download'
import { IFileBuffer } from '../typescript/interfaces/FileBuffer.interface';

export class FileHandler {

	private constructor() {}

	public static async download(fileGenerator: IFileBuffer, fileName: string ): Promise<void> {
		const buffer: ArrayBuffer = await fileGenerator.getArrayBuffer();
		fileDownload(buffer, fileName);
	}

	public static checkExtension(file: File, allowedExtensions: string[]): boolean {
		const fileExtension: string = file.name.split('.').at(-1) ?? '';
		return allowedExtensions.includes(fileExtension);
	}

	public static checkFileSize(file: File, maxFileSizeKb: number): boolean {
		const fileSize: number = Math.round(file.size / 1000);
		return fileSize <= maxFileSizeKb;
	}

}