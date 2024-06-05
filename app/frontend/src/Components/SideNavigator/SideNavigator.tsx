import React, { useEffect, useState } from 'react'
import { Container, Header, Menu, IconArea, MenuItem, MenuText, Wrapper } from './SideNavigatorStyle'
import { AiOutlineMenuFold } from 'react-icons/ai'
import { AiOutlineMenuUnfold } from 'react-icons/ai'
import { CREATE_URL, HOME_URL, ICON_SIZE, INVOICES_URL, SIDE_MENU } from '../../utils/constants'
import { Link, useLocation } from 'react-router-dom'
import Icon from '../Icon'
import { styledComponentBoolToNumber } from '../../utils/util'

const SideNavigator = () => {

    const { pathname } = useLocation()

    const [selected, setSelected] = useState<number>(0)
    const [iconmenu, seticonmenu] = useState<boolean>(false)

    useEffect(() => {
        if(pathname.includes(`${INVOICES_URL}${CREATE_URL}`)) {
            seticonmenu(true)
        }
    }, [pathname])

    return (
        <Container>
            <Wrapper
                iconmenu={styledComponentBoolToNumber(iconmenu)}
            >
                <Header>
                    <IconArea
                        onClick={() => seticonmenu(!iconmenu)}
                    >
                        <Icon 
                            size={ICON_SIZE.NORMAL}
                            IconComponent={iconmenu ? AiOutlineMenuUnfold : AiOutlineMenuFold}
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