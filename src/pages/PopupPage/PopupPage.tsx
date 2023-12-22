import React, { useState } from 'react'
import { Button } from '@mui/material'
import { getCurrentTabUId } from '../../utils'
import { Sender } from '../../types'
import { StyledPopupWrapper, StyledTitle } from './styles'
import './PopupPage.css'

export const PopupPage: React.FC = () => {
  const ADD_SNOW = 'Let it snow'
  const REMOVE_SNOW = 'Sick of snow'
  const GREETING = 'Hello from React'
  const BYE = 'Delete Snow'

  const [title, setTitle] = useState<string>(ADD_SNOW)
  const [responseFromContent, setResponseFromContent] = useState<string>('')

  const sendTestMessage = (): void => {
    const message = {
      from: Sender.React,
      message: title === ADD_SNOW ? GREETING : BYE
    }
    getCurrentTabUId((id) => {
      if (id) {
        chrome.tabs.sendMessage(
          id,
          message,
          (responseFromContentScript: string) => {
            setTitle(title === ADD_SNOW ? REMOVE_SNOW : ADD_SNOW)
            setResponseFromContent(responseFromContentScript)
          })
      }
    })
  }

  return (
        <StyledPopupWrapper>
            <Button onClick={sendTestMessage}>{title}</Button>
            <StyledTitle variant={'body1'}>{responseFromContent}</StyledTitle>
        </StyledPopupWrapper>
  )
}
