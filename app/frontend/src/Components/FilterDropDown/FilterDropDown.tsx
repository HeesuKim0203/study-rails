import React, { useState, ChangeEvent, useEffect, SetStateAction, ReactNode } from 'react'
import { IoSearch } from 'react-icons/io5'
import { IconContext } from 'react-icons'
import { AdditionalDataType, FilterOptions } from '../../utils/type'
import { RiFilter3Fill } from 'react-icons/ri'
import { GoTriangleDown } from 'react-icons/go'

import {
    DropdownContainer,
    DropdownToggle,
    DropdownToggleText,
    DropdownMenu,
    DropdownInput,
    DropdownItem,
    Icon,
    FilterOptionArea,
    FilterOptionControllerButton
} from './FilterDropDownStyle'
import { ICON_SIZE } from '../../utils/constants'
import { styledComponentBoolToNumber } from '../../utils/util'

interface DropdownProps {
    option?: FilterOptions
    options?: FilterOptions[]
    onOptionClick: (option: FilterOptions) => void
    onDelete?: () => void
}

const Dropdown = ({ 
    option,
    options, 
    onOptionClick,
    onDelete
}: DropdownProps) => {

    let additionalData: AdditionalDataType
    let additionalNode: ReactNode

    if(option?.content) {
        const { value, node, query } = option.content()
        additionalData = value
        additionalNode = node
    }

    const [isOpen, setIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)
    const handleInputOption = (option: FilterOptions) => {
        if(additionalData) {
            onOptionClick({...option, additionalData, value:inputValue})
        }else {
            onOptionClick({...option, value:inputValue})
        }
        setIsOpen(!isOpen)
    }

    return (
        <DropdownContainer>
            <IconContext.Provider value={{ size: ICON_SIZE.NORMAL }} >
                <DropdownToggle
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {options && <RiFilter3Fill />}
                    <DropdownToggleText>
                        { option ? `${option.text} ${option.value ? ' : ' + option.value : ''} ${option.additionalData ? ' : ' + option.additionalData : ''}` : 'フィルタ追加'}
                    </DropdownToggleText>
                    {options && 
                        <IconContext.Provider value={{ size: ICON_SIZE.SMALL }} >
                            <GoTriangleDown/>
                        </IconContext.Provider>
                    }
                </DropdownToggle>
                {isOpen && (
                    <DropdownMenu options={styledComponentBoolToNumber(options)}>
                        {
                            options && 
                                <Icon>
                                    <IoSearch />
                                </Icon>
                        }
                        { additionalNode || '' }
                        {option?.deleteInput || 
                            <DropdownInput
                                options={styledComponentBoolToNumber(options)}
                                type='text'
                                value={inputValue}
                                onChange={handleInputChange}
                            ></DropdownInput>
                        }
                        {options ? options.filter((value) => 
                            value.text.includes(inputValue)
                        ).map((option, index) => (
                            <DropdownItem key={index} onClick={(e) => {
                                    e.stopPropagation()
                                    onOptionClick(option)
                                    setIsOpen(!isOpen)
                                    setInputValue('')
                                }}
                            >
                                {option.text}
                            </DropdownItem>
                        )) : 
                            <FilterOptionArea>
                                <FilterOptionControllerButton
                                    onClick={(e) => {option && handleInputOption(option)}}
                                >適用</FilterOptionControllerButton> 
                                <FilterOptionControllerButton
                                    onClick={(e) => {
                                        setIsOpen(!isOpen)
                                        return onDelete && onDelete()
                                    }}
                                >削除</FilterOptionControllerButton>        
                            </FilterOptionArea>
                        }
                    </DropdownMenu>
                )}
            </IconContext.Provider>
        </DropdownContainer>
    )
}

export default Dropdown