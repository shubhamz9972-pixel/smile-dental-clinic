'use client'

import { useState } from 'react'

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackName?: string
}

export default function SafeImage({ src, alt, fallbackName, ...props }: SafeImageProps) {
    const [imgSrc, setImgSrc] = useState(src)

    const handleError = () => {
        if (fallbackName) {
            setImgSrc(`https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackName)}&background=137fec&color=fff`)
        }
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            {...props}
            src={imgSrc}
            alt={alt}
            onError={handleError}
        />
    )
}
