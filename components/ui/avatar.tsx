'use client'

import Image from "next/image"

interface AvatarProps{
    userImage?: string
}

export const Avatar = ({userImage} :AvatarProps) => {
    return (
        <div className="flex gap-3 items-center">
            <div 
                className="
                    relative
                    flex
                    items-center
                    w-10
                    h-10
                    cursor-pointer
                    rounded-full
                    overflow-hidden
                    md:w-11
                    md:h-11
                "
            >
                
                <Image
                    src={userImage || '/placeholder_profile.png'}
                    alt="Profile Image"
                    fill
                    sizes="40"
                />
                
            </div>
        </div>
        
    )
}
