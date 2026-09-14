import { briefSections } from '../content'

export function Brief() {
  return (
    <main className="brief-shell">
      <div className="brief-page">
        <header className="brief-head">
          <div>
            <p className="eyebrow">Executive brief</p>
            <h1>Core banking, without the big-bang rewrite.</h1>
            <p className="brief-sub">An outside-in product operating thesis for Avarda · Vilol Joshi</p>
          </div>
          <button type="button" className="brief-print" onClick={() => window.print()}>
            Print / save PDF
          </button>
        </header>

        <div className="brief-grid">
          {briefSections.map((section, index) => (
            <section className="brief-block" key={section.heading}>
              <span className="brief-num">{String(index + 1).padStart(2, '0')}</span>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>

        <footer className="brief-foot">
          <span>Prepared by Vilol Joshi</span>
          <span>Independent interview artifact · September 2026</span>
          <a href="#/deep-dive">Full case →</a>
        </footer>
      </div>
    </main>
  )
}
