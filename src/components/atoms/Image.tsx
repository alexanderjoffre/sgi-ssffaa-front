export interface IImageProps {
	src: string;
}

export const Image = (props: IImageProps) => (
	<img className="image" src={props.src} loading="lazy" />
);