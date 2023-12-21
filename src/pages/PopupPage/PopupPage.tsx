import React, { useState } from 'react'
import { Button } from '@mui/material'
import { StyledPopupWrapper, StyledTitle } from './styles'
import './PopupPage.css'

export const PopupPage: React.FC = () => {
  const ADD_SNOW = 'Let it snow'
  const REMOVE_SNOW = 'Sick of snow'
  type brightness = 'light' | 'dark'

  const [title, setTitle] = useState<string>(ADD_SNOW)

  // todo: refactor, move separated functions to utils folder
  const addBgSnow = (): void => {
    const lightOrDark = (color): brightness => {
      let red
      let green
      let blue
      let hsp

      if (color.match(/^rgb/)) {
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)

        red = color[1]
        green = color[2]
        blue = color[3]
      } else {
        color = +('0x' + color.slice(1).replace(
          color.length < 5 && /./g, '$&$&'
        ))

        red = color >> 16
        green = color >> 8 & 255
        blue = color & 255
      }

      hsp = Math.sqrt(
        0.299 * (red * red) +
          0.587 * (green * green) +
          0.114 * (blue * blue)
      )

      return hsp > 127.5 ? 'light' : 'dark'
    }

    const currentColor = getComputedStyle(document.body).backgroundColor
    const brightness = lightOrDark(currentColor)
    console.log(currentColor, brightness, '1')

    if (brightness === 'dark') {
      const element = document.querySelector('body')!

      const img1 = chrome.runtime.getURL('/images/background1.png')
      const img2 = chrome.runtime.getURL('/images/background2.png')
      const img3 = chrome.runtime.getURL('/images/background3.png')

      element.style.backgroundImage = `url(${img1}), url(${img2}), url(${img3})`
      element.style.backgroundSize = 'initial'
      element.style.height = 'inherit'
      element.style.width = '100%'
      element.className = 'snow'
      element.style.position = 'absolute'
      element.style.top = '0'
      element.style.zIndex = '1'

      element.animate(
        [
          {
            backgroundPosition: '0px 0px, 0px 0px, 0px 0px'
          },
          {
            backgroundPosition: '600px 1800px, 600px 1200px, 600px 600px'
          }
        ],
        {
          duration: 40000,
          iterations: Infinity
        }
      )
    } else {
      const random = (min: number, max: number): number => Math.random() * (max - min) + min

      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight

      const createSnowflake = (): HTMLImageElement => {
        const snowflake = document.createElement('img')
        const img1 = chrome.runtime.getURL('/images/1.svg')
        snowflake.src = img1

        snowflake.className = 'snow'
        snowflake.style.position = 'fixed'
        snowflake.style.top = '-2px'
        snowflake.style.right = random(0, screenWidth) + 'px'
        snowflake.style.height = '36px'
        snowflake.style.width = '36px'
        snowflake.style.borderRadius = '50%'
        snowflake.style.zIndex = '999'
        snowflake.style.pointerEvents = 'none'

        document.body.appendChild(snowflake)

        return snowflake
      }

      const animateSnowflake = (snowflake: HTMLImageElement): void => {
        snowflake.style.top = parseInt(snowflake.style.top) + 2 + 'px'
        // snowflake.style.right = parseInt(snowflake.style.right) + random(0, 2) + 'px'

        if (parseInt(snowflake.style.top) > screenHeight) {
          // snowflake.style.left = random(0, screenWidth) + 'px'
          snowflake.style.top = `-${parseInt(random(0, 2).toString(), 10)}px`
        }

        window.requestAnimationFrame(() => { animateSnowflake(snowflake) })
      }

      for (let i = 0; i < 60; i++) {
        setTimeout(() => {
          const snowflake = createSnowflake()
          animateSnowflake(snowflake)
        }, i * 100)
      }
    }
  }

  const removeBgSnow = (): void => {
    // todo: move function to other file, rename, refactor
    const lightOrDark = (color): brightness => {
      let red
      let green
      let blue
      let hsp

      if (color.match(/^rgb/)) {
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)

        red = color[1]
        green = color[2]
        blue = color[3]
      } else {
        color = +('0x' + color.slice(1).replace(
          color.length < 5 && /./g, '$&$&'
        ))

        red = color >> 16
        green = color >> 8 & 255
        blue = color & 255
      }

      hsp = Math.sqrt(
        0.299 * (red * red) +
          0.587 * (green * green) +
          0.114 * (blue * blue)
      )

      return hsp > 127.5 ? 'light' : 'dark'
    }

    const currentColor = getComputedStyle(document.body).backgroundColor
    const brightness = lightOrDark(currentColor)
    console.log(currentColor, brightness, '1')

    if (brightness === 'dark') {
      const element = document.querySelector('body')!
      element.style.backgroundImage = 'none'
    } else {
      const snowflake = document.querySelectorAll('.snowflake')

      for (let i = 0; i < snowflake.length; i++) {
        snowflake[i].remove()
      }
    }
  }

  const execScript = (tab, isAdded: boolean): void => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: isAdded ? addBgSnow : removeBgSnow
    }, () => {
      console.error('Some result')
    })
  }

  const handleClick = (): void => {
    if (title === ADD_SNOW) {
      setTitle(REMOVE_SNOW)
    } else {
      setTitle(ADD_SNOW)
    }

    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (tabs) => {
      const tab = tabs[0]
      const isAdded = title === ADD_SNOW

      execScript(tab, isAdded)
    })
  }

  return (
        <StyledPopupWrapper>
            <StyledTitle variant={'h3'}>Snow Creator</StyledTitle>
            <Button onClick={handleClick} className="btn--grab">
                {title}
            </Button>
        </StyledPopupWrapper>
  )
}