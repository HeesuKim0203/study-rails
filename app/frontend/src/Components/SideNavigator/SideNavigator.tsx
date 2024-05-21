import React, { useState } from 'react'
import { Container, Header, Icon, Menu, MenuItem, MenuText, Wrapper } from './SideNavigatorStyle'
import { MdMenuOpen } from 'react-icons/md'
import { SIDE_MENU } from '../../utils/constants'

const SideNavigator = () => {

    const [seleted, setSeleted] = useState<number>(-1)
    const [iconMenu, setIconMenu] = useState<boolean>(false)

    return (
        <Container>
            <Wrapper
                iconMenu={iconMenu}
            >
                <Header>
                    <Icon
                        onClick={() => setIconMenu(!iconMenu)}
                    >
                        <MdMenuOpen />
                    </Icon>
                </Header>
                <Menu>
                    { SIDE_MENU.map(({ text, icon : Icon }, index) => {
                        return (
                            <MenuItem
                                seleted={index === seleted}
                                onClick={() => setSeleted(index)}
                            >
                                <Icon />
                                <MenuText>{text}</MenuText>
                            </MenuItem>
                        )
                    }) }
                </Menu>
            </Wrapper>
        </Container>
    )
}

export default SideNavigator