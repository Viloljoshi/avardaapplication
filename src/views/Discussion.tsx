import { discussionDecisions } from '../content'

export function Discussion() {
  return (
    <main className="discussion-shell">
      <header className="discussion-hero">
        <p className="eyebrow">Present · five-minute route</p>
        <h1>Six decisions in five minutes.</h1>
        <p className="discussion-lead">
          The whole argument, at the altitude of a first conversation. Each decision links to the evidence behind it.
        </p>
      </header>

      <ol className="decision-list">
        {discussionDecisions.map((decision) => (
          <li className="decision-item" key={decision.number}>
            <div className="decision-index">{decision.number}</div>
            <div className="decision-body">
              <h2>{decision.title}</h2>
              <p className="decision-point">{decision.point}</p>
              <p className="decision-detail">{decision.detail}</p>
              <a className="decision-link" href={`#/deep-dive/${decision.anchor}`}>
                See the detail <span aria-hidden="true">→</span>
              </a>
            </div>
          </li>
        ))}
      </ol>

      <section className="discussion-cta">
        <div>
          <p className="eyebrow">Continue</p>
          <h2>Test this against Avarda’s real architecture.</h2>
          <p>The unknowns here are the first questions I would answer with the team, not gaps hidden by the artifact.</p>
        </div>
        <div className="discussion-cta-actions">
          <a className="home-btn primary" href="#/deep-dive">Explore the full case →</a>
          <a className="home-btn" href="#/brief">Read the brief</a>
        </div>
      </section>
    </main>
  )
}
