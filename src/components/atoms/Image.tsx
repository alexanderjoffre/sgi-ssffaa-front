import NextImage from 'next/image';

export interface IImage {
	src: string;
	alt?: string;
}

export const Image = (props: IImage) => (
	<NextImage {...props}	layout='responsive' />
);