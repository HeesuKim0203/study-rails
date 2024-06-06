import { DialogBase } from '@freee_jp/vibes'
import React, { ReactNode } from 'react'
import { Container } from './ModalStyle'
import { styledComponentBoolToNumber } from '../../utils/util'

type Props = {
    display: boolean
    onClose: () => void
    content: ReactNode
}

const Modal = ({
    display,
    content
}: Props) => {
    return (
        <Container display={styledComponentBoolToNumber(display)}>
            <DialogBase border='default'>
                {content}
            </DialogBase>
        </Container>
    )
}

export default Modal