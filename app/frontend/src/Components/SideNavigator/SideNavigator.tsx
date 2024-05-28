import React, { useEffect, useState } from 'react'
import { Container, Header, Menu, IconArea, MenuItem, MenuText, Wrapper } from './SideNavigatorStyle'
import { AiOutlineMenuFold } from 'react-icons/ai'
import { AiOutlineMenuUnfold } from 'react-icons/ai'
import { CREATE_URL, HOME_URL, ICON_SIZE, INVOICES_URL, SIDE_MENU } from '../../utils/constants'
import { Link, useLocation } from 'react-router-dom'
import Icon from '../Icon'

const SideNavigator = () => {

    const { pathname } = useLocation()

    let icommenuDefault = false

    if(pathname == `${INVOICES_URL}${CREATE_URL}`) {
        icommenuDefault = true
    }

    const [selected, setSelected] = useState<number>(0)
    const [iconmenu, seticonmenu] = useState<boolean>(icommenuDefault)

    useEffect(() => {
        seticonmenu(icommenuDefault)
    }, [icommenuDefault])

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