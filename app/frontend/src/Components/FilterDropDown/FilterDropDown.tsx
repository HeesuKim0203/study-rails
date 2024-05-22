import React, { useState, ChangeEvent, useEffect } from 'react'
import styled from 'styled-components'
import { IoSearch } from 'react-icons/io5'
import { IconContext } from 'react-icons'
import { FilterOptions } from '../../utils/type'
import { RiFilter3Fill } from 'react-icons/ri'

import {
    DropdownContainer,
    DropdownToggle,
    DropdownToggleText,
    DropdownMenu,
    DropdownInput,
    DropdownItem,
    Icon,
} from './FilterDropDownStyle'

interface DropdownProps {
  options: FilterOptions[]
  onOptionClick: (option: string) => void
}

const Dropdown = ({ 
    options, 
    onOptionClick
}: DropdownProps) => {

  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)

  useEffect(() => {
    options
  }, [inputValue])

  return (
    <DropdownContainer>
        <IconContext.Provider value={{ size: '1.4rem' }} >
            <DropdownToggle onClick={() => setIsOpen(!isOpen)}>
                <RiFilter3Fill /> 
                <DropdownToggleText>
                    フィルタ
                </DropdownToggleText>
            </DropdownToggle>
            {isOpen && (
                <DropdownMenu>
                    <Icon>
                        <IoSearch />
                    </Icon>
                    <DropdownInput
                        type='text'
                        value={inputValue}
                        onChange={handleInputChange}
                    ></DropdownInput>
                    {options.map((option, index) => (
                        <DropdownItem key={index} onClick={() => onOptionClick(option.text)}>
                            {option.text}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            )}
        </IconContext.Provider>
    </DropdownContainer>
  )
}

export default Dropdown