export const getScreenWidth = (): number => {
  if (process.client && typeof window !== 'undefined') {
    return window.innerWidth
  }
  return 1024 // default desktop width
}

export const isMobile = (): boolean => {
  return getScreenWidth() < 640
}

export const isTablet = (): boolean => {
  const width = getScreenWidth()
  return width >= 640 && width < 1024
}

export const isDesktop = (): boolean => {
  return getScreenWidth() >= 1024
}

export const getItemsPerPage = (): number => {
  return isMobile() ? 10 : 30
}
