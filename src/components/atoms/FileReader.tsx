import { ChangeEvent, useRef } from "react";
import { FileHandler } from "../../handlers/File.handler";

export interface IFileReaderResult {
	status: 'success' | 'error';
	statusMessage: string;
	data: File | undefined;
}

export interface IFileReaderProps {
	children: JSX.Element;
	allowedExtensions?: string[];
	maxFileSizeKb?: number;
	onChange(reader: IFileReaderResult): void
}

export const FileReader = (props: IFileReaderProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const changeSelectedFile = (event: ChangeEvent<HTMLInputElement>) => {
		if ( 
			event.target.files?.length
		) {
			const selectedFile = event.target.files[0];
			const checkExtensions = ( 
				props.allowedExtensions 
				? FileHandler.checkExtension(selectedFile, props.allowedExtensions)
				: true
			)
			const checkMaxFileSize = ( 
				props.maxFileSizeKb 
				? FileHandler.checkFileSize(selectedFile, props.maxFileSizeKb)
				: true
			)			

			if (checkExtensions && checkMaxFileSize) {
				props.onChange({
					status: 'success',
					statusMessage: 'File read successfully',
					data: selectedFile
				});
			} else {
				props.onChange({
					status: 'error',
					statusMessage: 'File cannot be read, check allowed extension and max size',
					data: undefined
				});
			}
		}


	}

	const triggerSelectFile = () => {
		inputRef.current?.click();
	}

	return (
		<div className="file-reader">
			<div className="file-reader__button" onClick={triggerSelectFile}>
				{props.children}
			</div>
			<input type="file" className="file-reader__input"
				ref={inputRef}
				onChange={changeSelectedFile}
				accept={ 
					props.allowedExtensions?.map(e => `.${e}`).join(',') 
					?? '*' 
				}
			/>
		</div>
	);
}