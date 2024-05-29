import React, { useState, ChangeEvent, useEffect } from 'react'
import { IoSearch } from 'react-icons/io5'
import { IconContext } from 'react-icons'
import { FilterOptions } from '../../utils/type'
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

interface DropdownProps {
    option?: FilterOptions
    options?: FilterOptions[]
    onOptionClick: (option: string) => void
    onDelete?: () => void
}

const Dropdown = ({ 
    option,
    options, 
    onOptionClick,
    onDelete
}: DropdownProps) => {

    const [isOpen, setIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)
    const handleInputOption = () => {
        onOptionClick(inputValue)
        setIsOpen(!isOpen)
    }

    return (
        <DropdownContainer>
            <IconContext.Provider value={{ size: '1.4rem' }} >
                <DropdownToggle
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {options ? <RiFilter3Fill /> : <></>}
                    <DropdownToggleText>
                        { option ? `${option.text} : ${option.value}` : 'フィルタ追加'}
                    </DropdownToggleText>
                    {options ? <></> : 
                        <IconContext.Provider value={{ size: '1rem' }} >
                            <GoTriangleDown/>
                        </IconContext.Provider>
                    }
                </DropdownToggle>
                {isOpen && (
                    <DropdownMenu options={options ? 1 : 0}>
                        {
                            options && 
                                <Icon>
                                    <IoSearch />
                                </Icon>
                        }
                        <DropdownInput
                            options={options ? 1 : 0}
                            type='text'
                            value={inputValue}
                            onChange={handleInputChange}
                        ></DropdownInput>
                        {options ? options.map((option, index) => (
                            <DropdownItem key={index} onClick={(e) => {
                                    console.log('check')
                                    e.stopPropagation()
                                    onOptionClick(option.text)
                                    setIsOpen(!isOpen)
                                }}
                            >
                                {option.text}
                            </DropdownItem>
                        )) : 
                            <FilterOptionArea>
                                <FilterOptionControllerButton
                                    onClick={(e) => handleInputOption()}
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