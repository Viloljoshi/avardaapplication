import { decisionFramework, heroFacts } from '../content'
import { EvidenceTag, SourceLink } from '../shared'

export function Home() {
  return (
    <main className="home-shell">
      <section className="home-hero">
        <div className="home-copy">
          <div className="home-kicker">
            <EvidenceTag kind="INFERENCE" />
            <span>Outside-in product operating thesis · Vilol Joshi</span>
          </div>
          <h1>
            Core banking, without
            <br />
            the big-bang rewrite.
          </h1>
          <p className="home-lead">
            How I think about product configuration, financial state, Corniche and safe modernisation at Avarda, and where my experience genuinely sits.
          </p>
          <div className="home-actions">
            <a className="home-btn primary" href="#/discussion">
              Open 5-minute view <span aria-hidden="true">→</span>
            </a>
            <a className="home-btn" href="#/deep-dive">
              Explore the case
            </a>
          </div>
        </div>

        <div className="home-system" aria-label="Capability decision framework">
          <div className="home-system-question">
            <span>Start here</span>
            <strong>{decisionFramework.start}</strong>
          </div>
          <div className="home-system-methods">
            {decisionFramework.moves.map((move) => (
              <span key={move}>{move}</span>
            ))}
          </div>
          <div className="home-system-proof">
            {decisionFramework.gates.map((gate) => (
              <div key={gate.label}>
                <span>{gate.label}</span>
                <strong>{gate.question}</strong>
              </div>
            ))}
          </div>
          <p className="home-system-note">{decisionFramework.note}</p>
        </div>
      </section>

      <section className="home-evidence" aria-label="Public evidence context">
        {heroFacts.map((fact) => (
          <article key={fact.value}>
            <EvidenceTag kind={fact.kind} />
            <strong>{fact.value}</strong>
            <p>{fact.note}</p>
            {fact.href ? <SourceLink href={fact.href}>source</SourceLink> : null}
          </article>
        ))}
      </section>

      <section className="home-scope" aria-labelledby="home-scope-title">
        <div className="home-scope-copy">
          <p className="eyebrow">Clearing the air</p>
          <h2 id="home-scope-title">My Corniche experience, stated precisely.</h2>
          <p>
            I interacted with Corniche in a partner-bank context and worked to understand its configuration. I have not owned or run the end-to-end administration of a Corniche implementation, and I do not want my wording to imply that.
          </p>
          <p>
            That is a real but bounded exposure. Everything here shows the domain understanding behind it and the product disciplines that transfer.
          </p>
        </div>
        <div className="home-scope-ledger">
          <div>
            <span>Corniche · partner-bank context</span>
            <strong>Interacted · understood configuration</strong>
          </div>
          <div>
            <span>End-to-end Corniche administration</span>
            <strong>Not owned</strong>
          </div>
          <div>
            <span>Avarda-specific implementation</span>
            <strong>To validate with the team</strong>
          </div>
        </div>
      </section>

      <section className="home-modes" aria-labelledby="home-modes-title">
        <div className="home-modes-head">
          <h2 id="home-modes-title">Choose the depth that fits the conversation.</h2>
          <p>One argument, three reading modes.</p>
        </div>
        <div className="home-modes-grid">
          <a className="mode-card primary" href="#/discussion">
            <span>Recruiter and hiring-manager route</span>
            <h3>Six decisions in five minutes</h3>
            <p>Boundary, thesis, domain model, financial state, safe modernisation and fit.</p>
            <strong>Present the argument →</strong>
          </a>
          <a className="mode-card" href="#/brief">
            <span>Executive brief</span>
            <h3>One-page summary</h3>
            <p>Share the judgment without asking for a long read. Print-friendly.</p>
            <strong>Open the brief →</strong>
          </a>
          <a className="mode-card" href="#/deep-dive">
            <span>Technical product case</span>
            <h3>Evidence behind every decision</h3>
            <p>Domain model, the Financial State Explorer, mechanics, migration and proof.</p>
            <strong>Inspect the deep dive →</strong>
          </a>
        </div>
      </section>
    </main>
  )
}
