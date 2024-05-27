import React, { useState } from 'react'
import { Container, Header, Menu, IconArea, MenuItem, MenuText, Wrapper } from './SideNavigatorStyle'
import { MdMenuOpen } from 'react-icons/md'
import { HOME_URL, ICON_SIZE, SIDE_MENU } from '../../utils/constants'
import { Link } from 'react-router-dom'
import Icon from '../Icon'

const SideNavigator = () => {

    const [selected, setSelected] = useState<number>(0)
    const [iconmenu, seticonmenu] = useState<boolean>(false)

    return (
        <Container>
            <Wrapper
                iconmenu={iconmenu ? 1 : 0}
            >
                <Header>
                    <IconArea
                        onClick={() => seticonmenu(!iconmenu)}
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
                            <Link key={index} to={HOME_URL}>
                                <MenuItem
                                    selected={index === selected}
                                    onClick={() => setSelected(index)}
                                >
                                        <Icon 
                                            size={ICON_SIZE.NORMAL}
                                            IconComponent={icon}
                                        />
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