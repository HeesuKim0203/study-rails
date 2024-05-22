import React from 'react'
import { Container, Title, User, UserMenu, Menu, UserName } from './HaederStyle'

import { IoIosMenu  } from 'react-icons/io'
import { FaUserCircle } from 'react-icons/fa'

import Log from '../../../../assets/images/header.svg?react'
import Icon from '../Icon'
import { ICON_SIZE } from '../../utils/constants'

const Header = () => {
    return (
        <Container>
            <Title>
                <Log />
            </Title>
            <UserMenu>
                <User>
                    <Icon 
                        size={ICON_SIZE.NORMAL}
                        IconComponent={FaUserCircle}
                    />
                    <UserName>userName</UserName> 
                </User>
                <Menu>
                    <Icon 
                        size={ICON_SIZE.NORMAL}
                        IconComponent={IoIosMenu}
                    />
                </Menu>
            </UserMenu>
        </Container>
    )
}

export default Header