import { getSnowFall, defineBgColor } from '../utils'
import { type ChromeMessage, type MessageResponse, Sender } from '../types'

const validateSender = (
  message: ChromeMessage,
  sender: chrome.runtime.MessageSender
): boolean => {
  return sender.id === chrome.runtime.id && message.from === Sender.React
}

const messagesFromReactAppListener = (
  message: ChromeMessage,
  sender: chrome.runtime.MessageSender,
  response: MessageResponse
): void => {
  const isValidated = validateSender(message, sender)

  if (isValidated && message.message === 'Hello from React') {
    response('Hello from content.js')
    addBgSnow()
  }

  if (isValidated && message.message === 'Delete Snow') {
    removeBgSnow()
  }
}

const main = (): void => {
  console.log('[content.ts] Main')
  /**
   * Fired when a message is sent from either an extension process or a content script.
   */
  chrome.runtime.onMessage.addListener(messagesFromReactAppListener)
}

main()

export const addBgSnow = (): void => {
  const currentColor = getComputedStyle(document.body).backgroundColor

  const brightness = defineBgColor(currentColor)
  console.log(currentColor, brightness)

  getSnowFall(brightness)
}

export const removeBgSnow = (): void => {
  const element = document.querySelector('body')!
  element.style.backgroundImage = 'none'
}
