import { DialogBase } from '@freee_jp/vibes'
import React, { ReactNode } from 'react'
import { Container } from './ModalStyle'

type Props = {
    display: boolean
    onClose: () => void
    content: ReactNode
}

const Modal = ({
    display,
    onClose,
    content
}: Props) => {
    return (
        <Container display={display? 1 : 0}>
            <DialogBase border='default'>
                {content}
            </DialogBase>
        </Container>
    )
}

export default Modal