import React, { useState } from 'react'
import { Container, Header, Menu, IconArea, MenuItem, MenuText, Wrapper } from './SideNavigatorStyle'
import { MdMenuOpen } from 'react-icons/md'
import { HOME_URL, ICON_SIZE, SIDE_MENU } from '../../utils/constants'
import { Link } from 'react-router-dom'
import Icon from '../Icon'

const SideNavigator = () => {

    const [selected, setSelected] = useState<number>(0)
    const [iconMenu, setIconMenu] = useState<boolean>(false)

    return (
        <Container>
            <Wrapper
                iconMenu={iconMenu}
            >
                <Header>
                    <IconArea
                        onClick={() => setIconMenu(!iconMenu)}
                    >
                        <Icon 
                            size={ICON_SIZE.NORMAL}
                            IconComponent={MdMenuOpen}
                        />
                    </IconArea>
                </Header>
                <Menu>
                    { SIDE_MENU.map(({ text, icon }, index) => {
                        return (
                            <Link to={HOME_URL}>
                                <MenuItem
                                    key={index}
                                    selected={index === selected}
                                    onClick={() => setSelected(index)}
                                >
                                        {/* <IconArea> */}
                                            <Icon 
                                                size={ICON_SIZE.NORMAL}
                                                IconComponent={icon}
                                            />
                                        {/* </IconArea> */}
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