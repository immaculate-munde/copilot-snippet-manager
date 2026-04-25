import { useState } from 'react'
import '../styles/KeyboardHelp.css'

function KeyboardHelp() {
  const [isOpen, setIsOpen] = useState(false)

  const shortcuts = [
    { key: 'N', description: 'New Snippet' },
    { key: 'K', description: 'Focus Search', modifier: 'Ctrl' },
    { key: '/', description: 'Show Shortcuts' },
    { key: 'Esc', description: 'Close Modal' },
  ]

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="keyboard-help-btn"
        title="Keyboard Shortcuts (Press ?)"
      >
        ⌨️
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>⌨️ Keyboard Shortcuts</h3>
              <button onClick={() => setIsOpen(false)} className="close-btn">✕</button>
            </div>

            <div className="shortcuts-list">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="shortcut-item">
                  <div className="shortcut-keys">
                    {shortcut.modifier && (
                      <kbd>{shortcut.modifier}</kbd>
                    )}
                    <kbd>{shortcut.key}</kbd>
                  </div>
                  <span className="shortcut-description">{shortcut.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default KeyboardHelp
