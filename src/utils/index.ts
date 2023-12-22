export const getCurrentTabUId = (callback: (url: number | undefined) => void): void => {
  const queryInfo = { active: true, lastFocusedWindow: true }

  chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
    callback(tabs[0].id)
  })
}

type brightness = 'light' | 'dark'

export const defineBgColor = (color): brightness => {
  const RED_WEIGHT = 0.299
  const GREEN_WEIGHT = 0.587
  const BLUE_WEIGHT = 0.114
  const HSP_MED_VAL = 127.5
  const RED_SHIFT = 16
  const GREEN_SHIFT = 8
  const BLUE_MASK = 255

  let red
  let green
  let blue

  if (color.match(/^rgb/)) {
    red = color[1]
    green = color[2]
    blue = color[3]
  } else {
    color = +('0x' + color.slice(1).replace(
      color.length < 5 && /./g, '$&$&'
    ))

    red = (color >> RED_SHIFT) & BLUE_MASK
    green = (color >> GREEN_SHIFT) & BLUE_MASK
    blue = color & BLUE_MASK
  }

  const hsp = Math.sqrt(
    RED_WEIGHT * (red * red) +
      GREEN_WEIGHT * (green * green) +
      BLUE_WEIGHT * (blue * blue)
  )

  return hsp > HSP_MED_VAL ? 'light' : 'dark'
}

export const getSnowFall = (brightness): void => {
  const element = document.querySelector('body')!

  const img1 = chrome.runtime.getURL('/images/background1-dark.png')
  const img3 = chrome.runtime.getURL('/images/background3.png')
  const img2 = chrome.runtime.getURL(
    brightness === 'dark'
      ? '/images/background2.png'
      : '/images/background2-dark.png')

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
}
