import React, { useState, ChangeEvent, useEffect } from 'react'
import styled from 'styled-components'
import { IoSearch } from 'react-icons/io5'
import { IconContext } from 'react-icons'
import { FilterOptions } from '../../utils/type'
import { RiFilter3Fill } from 'react-icons/ri'

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
        <IconContext.Provider value={{ size: '1.2rem' }} >
            <DropdownToggle onClick={() => setIsOpen(!isOpen)}>
                <RiFilter3Fill /> フィルタ
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

const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
`

const DropdownToggle = styled.button`
    display: flex;

    -webkit-box-align: center;
    align-items: center;

    padding: 0.6rem 1rem;
    cursor: pointer;
    height: 2.2rem ;
    background-color: #ffffff;
    border: 1px solid rgb(233, 231, 231);
    border-radius: 0.5rem ;

    font-size: 1rem;
    font-weight: 500;

    &:hover {
        color: #1e46aa;
        background-color: #dce8ff;
        border-color: #1e46aa;
    }
`

const DropdownMenu = styled.div`
    position: absolute;
    background-color: white;
    border: 1px solid rgb(233, 231, 231);
    width: 15rem;
    z-index: 1;
    display: flex;
    flex-direction: column;

    box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.2);
    
    padding: 1.2rem 0.8rem;
    
    background-color: white;
    border-radius: 1rem;

    height: 40rem;
    overflow-x: auto;
`

const DropdownInput = styled.input`
    padding: 0.6rem 0.6rem 0.6rem 2.1rem;
    border: 1px solid rgb(233, 231, 231);
    width: 100%;
    box-sizing: border-box;
    border-radius: 0.5rem;

    font-size: 1rem;
    margin-bottom: 0.5rem;
`

const DropdownItem = styled.div`
    padding: 0.4rem 0.4rem;
    cursor: pointer;

    font-size: 0.9rem;

    &:hover {
        background-color: #f1f1f1;
    }
`

const Icon = styled.span`
    display: inline-block;
    position: absolute;
    left: 1.5rem;
    top: 2.6rem;
    transform: translateY(-50%);
    pointer-events: none;
    color: #ccc;
`;