import { IKImageProps, Image as IKImage } from '@imagekit/next';

export default function Image(props: IKImageProps) {
    return (
        <IKImage
            {...props}
        />
    )
}