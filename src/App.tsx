import { useEffect, useState } from 'react'
import { navModes, type Route } from './content'
import { Home } from './views/Home'
import { Discussion } from './views/Discussion'
import { Brief } from './views/Brief'
import { DeepDive } from './views/DeepDive'

type ParsedRoute = { route: Route; anchor?: string }

function parseHash(): ParsedRoute {
  const raw = window.location.hash.replace(/^#\/?/, '')
  const [segment, anchor] = raw.split('/')
  if (segment === 'discussion') return { route: 'discussion' }
  if (segment === 'brief') return { route: 'brief' }
  if (segment === 'deep-dive') return { route: 'deep-dive', anchor }
  return { route: 'home' }
}

function App() {
  const [parsed, setParsed] = useState<ParsedRoute>(() => parseHash())

  useEffect(() => {
    const onHashChange = () => setParsed(parseHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (parsed.route === 'deep-dive' && parsed.anchor) {
      const target = parsed.anchor
      const timer = window.setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'auto', block: 'start' })
      }, 80)
      return () => window.clearTimeout(timer)
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [parsed.route, parsed.anchor])

  return (
    <div className={`app-shell route-${parsed.route}`}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header">
        <a className="wordmark" href="#/" aria-label="Home">
          <span>VJ</span>
          <span>CORE BANKING / WORKING THESIS</span>
        </a>
        <nav className="mode-nav" aria-label="Reading modes">
          <a href="#/" className={parsed.route === 'home' ? 'is-active' : ''} aria-current={parsed.route === 'home' ? 'page' : undefined}>
            Overview
          </a>
          {navModes.map((mode) => (
            <a
              key={mode.route}
              href={`#/${mode.route}`}
              className={parsed.route === mode.route ? 'is-active' : ''}
              aria-current={parsed.route === mode.route ? 'page' : undefined}
            >
              {mode.label}
            </a>
          ))}
        </nav>
        <div className="header-meta">
          <span>Outside-in · Sep 2026</span>
        </div>
      </header>

      <div id="main-content">
        {parsed.route === 'home' && <Home />}
        {parsed.route === 'discussion' && <Discussion />}
        {parsed.route === 'brief' && <Brief />}
        {parsed.route === 'deep-dive' && <DeepDive />}
      </div>
    </div>
  )
}

export default App
