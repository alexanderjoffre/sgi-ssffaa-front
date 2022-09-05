import fileDownload from 'js-file-download';
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
		const fileSizeKb: number =file.size / 1000;
		return fileSizeKb <= maxFileSizeKb;
	}

	public static getBase64 = (file: File): Promise<string> => new Promise<string>( 
		(resolve, reject) => {
			const reader: FileReader = new FileReader();
			reader.readAsDataURL(file);

			reader.onloadend = () => resolve(`${reader.result}`);
			reader.onerror = (error) => reject(error);
		}
	);

}