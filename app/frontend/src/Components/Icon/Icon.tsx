import React from 'react'
import { IconContext, IconType } from 'react-icons'
import { IconSize } from '../../utils/type'

interface IconProps {
    size: IconSize,
    IconComponent: IconType
}

const Icon = ({ 
    size,
    IconComponent
}: IconProps) => {
    return (
        <IconContext.Provider value={{ size }}>
            <IconComponent />
        </IconContext.Provider>
    )
}

export default Icon