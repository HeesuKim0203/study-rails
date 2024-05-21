import React from 'react'
import { Container, Title, User, UserMenu, Menu, UserName } from './HaederStyle'

import { IoIosMenu  } from 'react-icons/io'
import { FaUserCircle } from 'react-icons/fa'

import Log from '../../../../assets/images/header.svg?react'

const Header = () => {
    return (
        <Container>
            <Title>
                <Log />
            </Title>
            <UserMenu>
                <User>
                    <FaUserCircle /> 
                    <UserName>userName</UserName> 
                </User>
                <Menu>
                    <IoIosMenu  />
                </Menu>
            </UserMenu>
        </Container>
    )
}

export default Header