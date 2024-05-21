import React, { useState } from 'react'
import { Container, Header, Icon, Menu, MenuItem, MenuText, Wrapper } from './SideNavigatorStyle'
import { MdMenuOpen } from 'react-icons/md'
import { HOME_URL, SIDE_MENU } from '../../utils/constants'
import { Link } from 'react-router-dom'

const SideNavigator = () => {

    const [selected, setSelected] = useState<number>(-1)
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
                            <Link to={HOME_URL}>
                                <MenuItem
                                    selected={index === selected}
                                    onClick={() => setSelected(index)}
                                >
                                        <Icon />
                                        <MenuText>
                                            {text}
                                        </MenuText>
                                </MenuItem>
                            </Link>
                        )
                    }) }
                </Menu>
            </Wrapper>
        </Container>
    )
}

export default SideNavigator