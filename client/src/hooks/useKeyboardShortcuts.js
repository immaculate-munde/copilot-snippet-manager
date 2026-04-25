import { useEffect } from 'react'

export function useKeyboardShortcuts(shortcuts) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if any input is focused
      const activeElement = document.activeElement
      const isInputFocused = 
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.isContentEditable

      if (isInputFocused) return

      shortcuts.forEach(({ key, ctrlKey, shiftKey, callback }) => {
        const isCtrlMatch = ctrlKey ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey
        const isShiftMatch = shiftKey ? event.shiftKey : !event.shiftKey

        if (event.key === key && isCtrlMatch && isShiftMatch) {
          event.preventDefault()
          callback()
        }
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}
