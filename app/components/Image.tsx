//import Image from 'next/image'
import { Image } from '@imagekit/next';

export default function Page() {
    return (
        <Image
            src="/profile.png"
            width={500}
            height={500}
            alt="Picture of the author"
        />
    )
}
