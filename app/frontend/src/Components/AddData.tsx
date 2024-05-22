import React, { ChangeEvent, useState } from 'react'
import {
    Button,
    ColumnBase,
    DigitsInput,
    FloatingMessageBlock,
    FormActions,
    FormControl,
    FormControlGroup,
    TextField,
} from '@freee_jp/vibes'

const AddData = () => {

    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)

    const [title, setTitle] = useState('')
    const [userName, setUserName] = useState('')
    const [amount, setAmount] = useState(0)

    const onChange = (
        event: ChangeEvent<HTMLInputElement>, 
        setState: React.Dispatch<React.SetStateAction<string>>
    ) => setState(event.target.value)

    return  (
        <ColumnBase paddingSize="small" mb={2}>
            <FormControlGroup>
                <FormControl
                    mb={1}
                    mr={1}
                    label="ユーザ名前"
                    fieldId="horizontal-form__account"
                    help="ユーザ名前を入力します。"
                    required
                >
                    <TextField
                        id="submit-error-interaction__name-from"
                        error={error}
                        value={userName}
                        onChange={(e) => onChange(e, setUserName)}
                    />
                </FormControl>
                <FormControl
                    mb={1}
                    mr={1}
                    label="タイトル"
                    required
                    help="タイトルを書きます。"
                    fieldId="horizontal-form__partner"
                >
                    <TextField
                        id="submit-error-interaction__name-from"
                        error={error}
                        value={title}
                        onChange={(e) => onChange(e, setTitle)}
                    />
                </FormControl>
                <FormControl
                    mb={1}
                    mr={1}
                    label="金額"
                    required
                    fieldId="horizontal-form__amount"
                >
                    <DigitsInput
                        id="submit-error-interaction__amount"
                        required
                        error={error}
                        value={amount}
                        onChange={(e) => setAmount(e ? e : 0)}
                    />
                </FormControl>
            </FormControlGroup>
            <FormActions>
                <Button 
                    appearance="primary"
                    onClick={() => {
                        setMessage('')
                        setTimeout(() => {
                            if( !userName || !title || !amount ) {
                                setError(true)
                                setMessage(
                                    '入力内容にエラーがあります。修正のうえ、再度お試しください'
                                )
                            }else {
                                setError(false)
                                setMessage('保存しました')
                                setTitle('')
                                setUserName('')
                                setAmount(0)
                            }
                        }, 600)
                    }}
                >登録</Button>
                {message && <FloatingMessageBlock error={error} success={!error} message={message} />}
            </FormActions>
        </ColumnBase>
    )
}

export default AddData