import React, { ChangeEvent, useState } from 'react'
import {
    Button,
    CheckBox,
    DateField,
    DateInput,
    DescriptionList,
    DigitsInput,
    FloatingMessageBlock,
    FormActions,
    FormControl,
    FormControlGroup,
    InlineLink,
    ListTable,
    Loading,
    Message,
    MessageBlock,
    MessageIcon,
    NameField,
    Note,
    SelectBox,
    TaskDialog,
    TextField,
    ToggleButton,
    VisuallyHidden,
    WithDescriptionContent,
    WithBalloon,
    RequiredIcon,
    Container,
    ContentsBase,
    HeadlineArea,
  } from '@freee_jp/vibes'

const Create = () => {
    const [message, setMessage] = useState('')
    const [sending, setSending] = useState(false)
    const [error, setError] = useState(false)

    const [title, setTitle] = useState('')
    const [userName, setUserName] = useState('')
    const [amount, setAmount] = useState(0)

    const onChange = (
        event: ChangeEvent<HTMLInputElement>, 
        setState: React.Dispatch<React.SetStateAction<string>>
    ) => setState(event.currentTarget.value)

    return (
      <>
        {message && <MessageBlock error={error} success={!error} mb={1} message={message} />}
            <Container width='wide'>
                <ContentsBase>
                    <HeadlineArea pageTitle='Create Data'>
                        データを作って見てください！
                    </HeadlineArea>
                    <DescriptionList
                        mb={1}
                        listContents={[
                            {
                                title: (
                                    <label htmlFor="submit-error-interaction__amount">
                                        タイトル
                                        <RequiredIcon ml={0.5} />
                                    </label>
                                ),
                                value: (
                                    <>
                                        <WithDescriptionContent
                                            renderContent={(descId) => (
                                            <>
                                                <TextField
                                                    id="submit-error-interaction__name-from"
                                                    // エラーメッセージがaria-desdribedbyになっているべきか悩ましいが、
                                                    // ここでは他のフィールドと仕様をあわせやすいよう、エラーメッセージをaria-describedに入れない判断をした
                                                    aria-describedby={descId}
                                                    error={error}
                                                    value={title}
                                                    onChange={(e) => onChange(e, setTitle)}
                                                />
                                                {error && (
                                                    <Message ml={1} error>
                                                        半角カタカナで記入してください。
                                                    </Message>
                                                )}
                                            </>
                                            )}
                                            renderDescriptionContent={() => (
                                                <Note mt={0.5}>
                                                    タイトルを半角カタカナで記入してください。
                                                </Note>
                                            )}
                                        />
                                    </>
                                ),
                            },
                            {
                                title: (
                                    <label htmlFor="submit-error-interaction__account-from">
                                        名前
                                        <RequiredIcon ml={0.5} />
                                    </label>
                                ),
                                value: (
                                    <>
                                        <WithDescriptionContent
                                            renderContent={(descId) => (
                                                <>
                                                    <TextField
                                                        id="submit-error-interaction__name-from"
                                                        // エラーメッセージがaria-desdribedbyになっているべきか悩ましいが、
                                                        // ここでは他のフィールドと仕様をあわせやすいよう、エラーメッセージをaria-describedに入れない判断をした
                                                        aria-describedby={descId}
                                                        error={error}
                                                        value={userName}
                                                        onChange={(e) => onChange(e, setUserName)}
                                                    />
                                                    {error && (
                                                        <Message ml={1} error>
                                                            半角カタカナで記入してください
                                                        </Message>
                                                    )}
                                                </>
                                            )}
                                            renderDescriptionContent={() => (
                                                <Note mt={0.5}>
                                                    ユーザの名前を半角カタカナで記入してください。
                                                </Note>
                                            )}
                                        />
                                    </>
                                ),
                            },
                            {
                                title: (
                                    <label htmlFor="submit-error-interaction__name-from">
                                        金額
                                        <RequiredIcon ml={0.5} />
                                    </label>
                                ),
                                value: (
                                    <>
                                        <DigitsInput
                                            id="submit-error-interaction__amount"
                                            required
                                            error={error}
                                            value={amount}
                                            onChange={(e) => setAmount(e ? e : 0)}
                                        />
                                        {error && (
                                            <Message ml={1} error>
                                                0より大きい数値を入力してください
                                            </Message>
                                        )}
                                    </>
                                ),
                            },
                        ]}
                    />
            
                    <FormActions>
                        <Button
                            appearance="primary"
                            disabled={sending}
                            onClick={() => {
                                setMessage('')
                                setTimeout(() => {

                                    console.log(userName, title, amount)

                                    if( !userName || !title || !amount ) {
                                        setError(true)
                                        setMessage(
                                            '入力内容にエラーがあります。修正のうえ、再度お試しください'
                                        )
                                        console.log('error!')
                                    }else {
                                        setError(false)
                                        setMessage('保存しました')
                                    }
                                }, 600)
                            }}
                        >
                            保存
                        </Button>
                        <Button disabled={sending}>キャンセル</Button>
                    </FormActions>
                    {/* <Loading coverAll isLoading={sending} /> */}
                    {message && <FloatingMessageBlock error={error} success={!error} message={message} />}
                </ContentsBase>
            </Container>
      </>
    )
  }

export default Create