import { useEffect, useMemo, useState } from 'react'
import {
  chapters,
  explorerSteps,
  scenarios,
  sources,
  transferRows,
  type EvidenceKind,
  type ScenarioId,
} from './content'

function EvidenceTag({ kind }: { kind: EvidenceKind }) {
  return <span className={`evidence-tag evidence-${kind.toLowerCase().replace(' ', '-')}`}>{kind}</span>
}

function SourceLink({ href, children = 'source' }: { href: string; children?: React.ReactNode }) {
  return (
    <a className="source-link" href={href} target="_blank" rel="noreferrer">
      {children} <span aria-hidden="true">↗</span>
    </a>
  )
}

function Arrow({ vertical = false }: { vertical?: boolean }) {
  return (
    <svg
      className={vertical ? 'arrow arrow-vertical' : 'arrow'}
      viewBox="0 0 42 12"
      aria-hidden="true"
    >
      <path d="M1 6h38M34 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function ChapterHeader({
  number,
  eyebrow,
  title,
  intro,
}: {
  number: string
  eyebrow: string
  title: string
  intro: string
}) {
  return (
    <header className="chapter-header">
      <div className="chapter-number" aria-hidden="true">
        {number}
      </div>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="chapter-intro">{intro}</p>
      </div>
    </header>
  )
}

function Disclosure({
  label,
  meta,
  children,
  open = false,
}: {
  label: string
  meta?: string
  children: React.ReactNode
  open?: boolean
}) {
  return (
    <details className="disclosure" open={open}>
      <summary>
        <span>{label}</span>
        <span className="disclosure-meta">{meta ?? 'Inspect'}</span>
      </summary>
      <div className="disclosure-body">{children}</div>
    </details>
  )
}

function FiveLayerReasoning({
  promise,
  state,
  event,
  breakage,
  decision,
}: {
  promise: string
  state: string
  event: string
  breakage: string
  decision: string
}) {
  const items = [
    ['Business promise', promise],
    ['State / configuration', state],
    ['Financial event', event],
    ['Where it breaks', breakage],
    ['PM decision', decision],
  ]
  return (
    <ol className="reasoning-chain">
      {items.map(([label, value], index) => (
        <li key={label}>
          <span className="reason-index">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <span className="reason-label">{label}</span>
            <p>{value}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function FinancialStateExplorer() {
  const [selectedId, setSelectedId] = useState<ScenarioId>('partial-payment')
  const scenario = scenarios.find((item) => item.id === selectedId) ?? scenarios[0]

  return (
    <div className="explorer-shell">
      <div className="explorer-topline">
        <div>
          <p className="eyebrow">Signature interaction</p>
          <h3>Financial State Explorer</h3>
        </div>
        <span className="working-label">WORKED MODEL · NOT AVARDA IMPLEMENTATION</span>
      </div>

      <div className="scenario-tabs" role="group" aria-label="Select a financial scenario">
        {scenarios.map((item) => (
          <button
            type="button"
            key={item.id}
            className={selectedId === item.id ? 'scenario-tab is-active' : 'scenario-tab'}
            aria-pressed={selectedId === item.id}
            onClick={() => setSelectedId(item.id)}
          >
            {item.shortLabel}
          </button>
        ))}
      </div>

      <div className="scenario-heading" aria-live="polite">
        <div>
          <span className="scenario-count">
            {String(scenarios.findIndex((item) => item.id === selectedId) + 1).padStart(2, '0')} /{' '}
            {String(scenarios.length).padStart(2, '0')}
          </span>
          <h4>{scenario.title}</h4>
        </div>
        <p>{scenario.kicker}</p>
      </div>

      <div className="state-rail" aria-label={`System path for ${scenario.title}`}>
        {explorerSteps.map((step, index) => (
          <div className="rail-segment" key={step.label}>
            <div className={scenario.changedSteps.includes(index) ? 'rail-node is-changed' : 'rail-node'}>
              <span className="rail-dot" />
              <span className="rail-label">{step.label}</span>
              <span className="rail-hint">{step.hint}</span>
            </div>
            {index < explorerSteps.length - 1 && <Arrow />}
          </div>
        ))}
      </div>

      <div className="state-details">
        {[
          ['Customer', scenario.customer],
          ['Product state', scenario.product],
          ['Financial state', scenario.financial],
          ['External state', scenario.external],
          ['Control', scenario.control],
        ].map(([label, text], index) => (
          <article key={label}>
            <span className="state-index">0{index + 1}</span>
            <h5>{label}</h5>
            <p>{text}</p>
          </article>
        ))}
      </div>

      <div className="explorer-lower">
        <div className="journal-card">
          <div className="journal-header">
            <span>Illustrative accounting lens</span>
            <span>DEBIT</span>
            <span>CREDIT</span>
          </div>
          {scenario.journal.map((entry) => (
            <div className="journal-row" key={`${entry.account}-${entry.note}`}>
              <div>
                <strong>{entry.account}</strong>
                <span>{entry.note}</span>
              </div>
              <span>{entry.debit ?? '—'}</span>
              <span>{entry.credit ?? '—'}</span>
            </div>
          ))}
          <p className="journal-caveat">{scenario.caveat}</p>
        </div>
        <aside className="decision-card">
          <span className="decision-label">THE PRODUCT DECISION</span>
          <p>{scenario.decision}</p>
        </aside>
      </div>
    </div>
  )
}

type Binary = 'yes' | 'no'
type DecisionAnswers = {
  obsolete: Binary
  currentOwner: Binary
  stableContract: Binary
  destinationReady: Binary
  equivalence: Binary
}

function DecisionEngine() {
  const [answers, setAnswers] = useState<DecisionAnswers>({
    obsolete: 'no',
    currentOwner: 'yes',
    stableContract: 'yes',
    destinationReady: 'no',
    equivalence: 'no',
  })

  const outcome = useMemo(() => {
    if (answers.obsolete === 'yes') {
      return {
        label: 'RETIRE',
        description: 'Remove the duplicate capability through a controlled decommission, with consumers and historical evidence accounted for.',
      }
    }
    if (answers.currentOwner === 'yes' && answers.stableContract === 'yes') {
      return {
        label: 'KEEP + WRAP',
        description: 'Keep financial ownership in place and expose a stable contract so channels and workflows can evolve independently.',
      }
    }
    if (answers.currentOwner === 'yes') {
      return {
        label: 'ENHANCE',
        description: 'Improve the current capability or contract before adding migration risk. Acceptance must prove the accounting outcome.',
      }
    }
    if (answers.destinationReady === 'yes' && answers.equivalence === 'yes') {
      return {
        label: 'MIGRATE',
        description: 'Sequence a bounded migration with behavioral, financial and reconciliation equivalence—not data-copy parity alone.',
      }
    }
    return {
      label: 'KEEP / ENHANCE',
      description: 'Do not move financial ownership yet. Close the destination or equivalence gap, then re-run the decision.',
    }
  }, [answers])

  const questions: Array<{ key: keyof DecisionAnswers; label: string; hint: string }> = [
    { key: 'obsolete', label: 'Is the capability duplicated or no longer needed?', hint: 'Retirement gate' },
    { key: 'currentOwner', label: 'Does today’s system remain a credible owner?', hint: 'State ownership' },
    { key: 'stableContract', label: 'Can a stable contract meet the roadmap?', hint: 'Wrap potential' },
    { key: 'destinationReady', label: 'Is a strategic destination operationally ready?', hint: 'Target maturity' },
    { key: 'equivalence', label: 'Can financial and behavioral equivalence be proven?', hint: 'Migration gate' },
  ]

  return (
    <div className="decision-engine">
      <div className="engine-questions">
        {questions.map((question, index) => (
          <div className="engine-question" key={question.key}>
            <div>
              <span className="state-index">0{index + 1}</span>
              <p>{question.label}</p>
              <small>{question.hint}</small>
            </div>
            <div className="binary-control" role="group" aria-label={question.label}>
              {(['yes', 'no'] as Binary[]).map((value) => (
                <button
                  type="button"
                  key={value}
                  className={answers[question.key] === value ? 'is-active' : ''}
                  aria-pressed={answers[question.key] === value}
                  onClick={() => setAnswers((previous) => ({ ...previous, [question.key]: value }))}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <aside className="engine-outcome" aria-live="polite">
        <EvidenceTag kind="INFERENCE" />
        <span className="outcome-kicker">WORKING OUTCOME</span>
        <strong>{outcome.label}</strong>
        <p>{outcome.description}</p>
        <div className="outcome-rule">
          <span>Decision is conditional</span>
          <span>Re-run as evidence changes</span>
        </div>
      </aside>
    </div>
  )
}

function App() {
  const [activeChapter, setActiveChapter] = useState('context')

  useEffect(() => {
    const elements = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActiveChapter(visible.target.id)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.15, 0.4] },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const progress = ((chapters.findIndex((chapter) => chapter.id === activeChapter) + 1) / chapters.length) * 100

  return (
    <div className="app-shell">
      <a className="skip-link" href="#context">
        Skip to main content
      </a>
      <header className="site-header">
        <a className="wordmark" href="#context" aria-label="Back to top">
          <span>VJ</span>
          <span>CORE BANKING / WORKING THESIS</span>
        </a>
        <div className="header-meta">
          <span>Outside-in · September 2026</span>
          <a href="#sources">Evidence</a>
        </div>
        <div className="reading-progress" style={{ '--progress': `${progress}%` } as React.CSSProperties} />
      </header>

      <aside className="chapter-nav" aria-label="Chapters">
        <p>Eight chapters</p>
        <nav>
          {chapters.map((chapter) => (
            <a
              href={`#${chapter.id}`}
              key={chapter.id}
              className={activeChapter === chapter.id ? 'is-active' : ''}
              aria-current={activeChapter === chapter.id ? 'location' : undefined}
            >
              <span>{chapter.number}</span>
              <span>{chapter.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      <main>
        <section className="hero chapter" id="context">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">AN OUTSIDE-IN PRODUCT OPERATING THESIS · VILOL JOSHI</p>
              <h1>
                Core Banking,
                <br />
                <em>without</em> the big-bang rewrite
              </h1>
              <p className="hero-subhead">
                How I think about product configuration, financial state, Corniche, platform orchestration and safe modernisation at Avarda.
              </p>
              <a className="primary-link" href="#explorer">
                Explore the financial state model <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="hero-thesis">
              <span className="thesis-label">THE ONE THESIS</span>
              <p>
                Core-banking modernisation is a <strong>financial-state ownership</strong> problem before it is a system-replacement problem.
              </p>
              <div className="thesis-rule">
                <span>Own the state</span>
                <span>Expose the contract</span>
                <span>Prove equivalence</span>
              </div>
            </div>
          </div>

          <div className="promise-flow" aria-label="From product promise to reconciliation">
            {['Product promise', 'Configuration', 'Account state', 'Financial event', 'Ledger', 'Payment', 'Settlement', 'Reconciliation'].map(
              (step, index, all) => (
                <div className="promise-step" key={step}>
                  <span>{step}</span>
                  {index < all.length - 1 && <Arrow />}
                </div>
              ),
            )}
          </div>
          <blockquote className="hero-quote">Core banking is where a product promise becomes financial truth.</blockquote>

          <div className="scope-block">
            <div className="scope-copy">
              <p className="eyebrow">SCOPE CLARIFICATION</p>
              <h2>A precise boundary, stated plainly.</h2>
              <p>
                After reflecting on our discussion, I realised that my wording around having “worked with Corniche” could reasonably have implied broader direct implementation ownership than I intended.
              </p>
              <p>
                My experience has been across banking platforms, modernisation, financial workflows, transaction/payment dependencies and integrations around authoritative banking systems. <strong>I have not personally administered or owned the end-to-end configuration of a Corniche implementation.</strong>
              </p>
              <p>
                That distinction matters, so I wanted to correct it explicitly rather than leave ambiguity. This artifact shows the underlying domain understanding, what I have actually done, and how I would approach Avarda’s environment.
              </p>
            </div>
            <div className="scope-ledger" aria-label="Experience boundary">
              <div>
                <span>DIRECT CORNICHE ADMINISTRATION</span>
                <strong>Not claimed</strong>
              </div>
              <div>
                <span>BANKING / PLATFORM / INTEGRATION DEPTH</span>
                <strong>Demonstrated below</strong>
              </div>
              <div>
                <span>AVARDA-SPECIFIC IMPLEMENTATION</span>
                <strong>To validate with the team</strong>
              </div>
            </div>
          </div>

          <div className="proof-moment">
            <div className="proof-heading">
              <p className="eyebrow">THE FIRST PROOF POINT</p>
              <h2>The question is not “Corniche: yes or no?”</h2>
              <p>It is how a mixed platform portfolio divides capability, state and accountability.</p>
            </div>
            <div className="evidence-grid">
              <article>
                <EvidenceTag kind="FACT" />
                <p>
                  Avarda’s role brief describes internally developed and licensed core platforms supporting lending, cards, deposits and payments.
                </p>
                <SourceLink href={sources.role}>role brief</SourceLink>
              </article>
              <article>
                <EvidenceTag kind="FACT" />
                <p>
                  Megasol publicly lists Avarda Bank among Corniche customers; Corniche documents account, payment, ledger and integration capabilities.
                </p>
                <SourceLink href={sources.megasol}>Megasol</SourceLink>
              </article>
              <article>
                <EvidenceTag kind="FACT" />
                <p>
                  Avarda’s public Direct Invoice API accepts an <code>AccountClassCode</code> and can fall back to partner-level configuration.
                </p>
                <SourceLink href={sources.directInvoice}>API docs</SourceLink>
              </article>
              <article className="evidence-inference">
                <EvidenceTag kind="INFERENCE" />
                <p>
                  The PM problem is to make ownership explicit: what Avarda services own, what the core owns, what a rail owns—and where financial truth is authoritative.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="chapter" id="model">
          <ChapterHeader
            number="02"
            eyebrow="MODEL THE DOMAIN"
            title="Start with ownership, not architecture boxes."
            intro="The UI and configuration model differ between cores. The portable PM questions do not: who owns state, who calculates, who posts, who executes, who can reverse, and who proves the result?"
          />

          <div className="ownership-map">
            <div className="ownership-spine">
              <span>BUSINESS PROMISE</span>
              <Arrow vertical />
              <span>CONFIGURED PRODUCT</span>
              <Arrow vertical />
              <span>AUTHORITATIVE ACCOUNT</span>
              <Arrow vertical />
              <span>FINANCIAL TRUTH</span>
            </div>
            <div className="ownership-questions">
              {[
                ['Who owns state?', 'Account, balance component, lifecycle, history'],
                ['Who calculates?', 'Interest, fees, billing, repayment allocation'],
                ['Who posts?', 'Financial event → balanced accounting treatment'],
                ['Who executes?', 'Internal transfer, payment rail, partner instruction'],
                ['Who can reverse?', 'Causal compensating event and authority'],
                ['Who reconciles?', 'External statement ↔ internal ledger ↔ customer state'],
              ].map(([title, copy]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="section-split product-decomposition">
            <div>
              <p className="eyebrow">ONE PRODUCT, DECOMPOSED</p>
              <h3>Direct Invoice as a traceable product promise</h3>
              <p className="lead-copy">
                Avarda publicly describes a fixed-term direct invoice, updated invoices for partial deliveries or returns, and the possibility to part-pay and transfer a balance to a loan.
              </p>
              <div className="inline-evidence">
                <EvidenceTag kind="FACT" />
                <SourceLink href={sources.directInvoice}>Avarda Direct Invoice documentation</SourceLink>
              </div>
            </div>
            <FiveLayerReasoning
              promise="Buy now; receive a correct invoice; pay in full or follow the allowed credit path."
              state="Account class, partner/product settings, captured order lines, due date, balance components and lifecycle."
              event="Authorization, capture, invoice creation, repayment, return/credit, transfer-to-loan where eligible."
              breakage="Partial delivery, duplicate capture, late return, unmatched repayment, stale status, or disagreement between customer and ledger state."
              decision="Define ownership and acceptance for every branch—including the financially ugly ones, not only the happy checkout."
            />
          </div>

          <div className="disclosure-stack">
            <Disclosure label="Inspect product-configuration questions" meta="5 decision areas">
              <div className="question-grid">
                {[
                  ['Repayment waterfall', 'Which balance component is reduced first, under which product version, and how is the allocation explained?'],
                  ['Billing boundary', 'What becomes immutable at cut-off, and how do late events appear on the next statement?'],
                  ['Interest & fees', 'What uses effective date versus processing date, and how are corrections represented?'],
                  ['Returns', 'Does a return reduce an unpaid receivable or create an outbound obligation after payment?'],
                  ['Transfer to loan', 'What eligibility, consent, account mapping and accounting events govern the conversion?'],
                ].map(([title, copy]) => (
                  <article key={title}>
                    <h4>{title}</h4>
                    <p>{copy}</p>
                    <EvidenceTag kind="TO VALIDATE" />
                  </article>
                ))}
              </div>
            </Disclosure>
            <Disclosure label="Inspect the public evidence boundary" meta="Observed vs inferred">
              <div className="boundary-table" role="table" aria-label="Evidence boundary">
                <div role="row" className="table-head">
                  <span role="columnheader">Statement</span>
                  <span role="columnheader">Status</span>
                  <span role="columnheader">Safe use</span>
                </div>
                <div role="row">
                  <span role="cell">AccountClassCode appears in Avarda’s Direct Invoice API</span>
                  <span role="cell"><EvidenceTag kind="FACT" /></span>
                  <span role="cell">Proof that public product APIs expose account/product configuration concepts.</span>
                </div>
                <div role="row">
                  <span role="cell">Which exact platform owns each Avarda product/account state</span>
                  <span role="cell"><EvidenceTag kind="TO VALIDATE" /></span>
                  <span role="cell">A discovery question, never a public-data conclusion.</span>
                </div>
              </div>
            </Disclosure>
          </div>
        </section>

        <section className="chapter chapter-dark" id="explorer">
          <ChapterHeader
            number="03"
            eyebrow="FINANCIAL STATE"
            title="One account. Seven scenarios. One source of truth."
            intro="A payment journey is safe only when customer state, product state, accounting state and external processing state can disagree temporarily—but never silently."
          />
          <FinancialStateExplorer />

          <div className="invariants-section">
            <div className="invariants-heading">
              <p className="eyebrow">NON-NEGOTIABLE QUALITY BAR</p>
              <h3>The invariants I would protect</h3>
              <p>These become acceptance criteria for requirements, releases, migrations and incident recovery.</p>
            </div>
            <div className="invariants-grid">
              {[
                ['Ledger integrity', 'Σ Debit = Σ Credit', 'Every completed accounting event balances by currency and entity.'],
                ['Idempotency', '1 external event → 1 financial event', 'A retry cannot create a second economic effect.'],
                ['Traceability', 'Balance → posting → source event', 'Every change retains a causal and auditable chain.'],
                ['State consistency', 'Customer ≈ product ≈ ledger ≈ rail', 'Disagreement is explicit, timed and operationally owned.'],
                ['Reconciliation', 'External reality ⇄ recorded reality', 'Breaks surface with amount, age, owner and recovery action.'],
                ['Recoverability', 'Failure → deterministic next state', 'No deletion-as-correction; reversals and compensation are first-class.'],
              ].map(([title, formula, copy], index) => (
                <article key={title}>
                  <span className="invariant-number">0{index + 1}</span>
                  <h4>{title}</h4>
                  <code>{formula}</code>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="chapter" id="mechanics">
          <ChapterHeader
            number="04"
            eyebrow="MECHANICS & CONTROLS"
            title="Distributed-systems correctness becomes financial correctness."
            intro="Transaction, payment, posting, settlement and reconciliation are connected—but they are not synonyms. Product requirements must preserve each state and the contracts between them."
          />

          <div className="mechanics-flow">
            {[
              ['01', 'Business event', 'Repayment instructed or return accepted'],
              ['02', 'Payment processing', 'Rail accepts, rejects, times out or later returns'],
              ['03', 'Financial event', 'One immutable economic intent with stable identity'],
              ['04', 'Posting', 'Configured debit / credit treatment is applied'],
              ['05', 'Settlement', 'Value moves with the external finality of that rail'],
              ['06', 'Reconciliation', 'External and internal records are matched; breaks are owned'],
            ].map(([number, title, copy], index, all) => (
              <div className="mechanics-step" key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                {index < all.length - 1 && <Arrow vertical />}
              </div>
            ))}
          </div>
          <p className="flow-caveat">
            <EvidenceTag kind="TO VALIDATE" />
            <span>Control layers, not a claimed universal time sequence. Recognition and posting points vary by product, rail, finality model and accounting policy.</span>
          </p>
          <div className="inline-evidence mechanics-evidence">
            <EvidenceTag kind="FACT" />
            <p>
              Megasol documents internal/external payments, incoming third-party interfaces, automated posting, and SEPA/ISO 20022 access-partner integrations. This supports the flow’s possibility—not Avarda’s exact deployment.
            </p>
            <SourceLink href={sources.cornichePayments}>Megasol payments</SourceLink>
          </div>

          <div className="avarda-state-proof">
            <div>
              <EvidenceTag kind="FACT" />
              <span>AVARDA PUBLIC API · ASYNCHRONOUS STATE</span>
            </div>
            <blockquote>Approved does not necessarily mean ready for the next operation.</blockquote>
            <p>Avarda’s public Authorization API documents additional background processing after approval and an <code>InBackOffice</code> indicator for order-management readiness.</p>
            <p><strong>Product lesson:</strong> name the states, expose readiness, and make retries safe; never compress asynchronous processing into one misleading “success”.</p>
            <SourceLink href={sources.flow}>Authorization flow</SourceLink>
          </div>

          <div className="section-split retry-section">
            <div>
              <p className="eyebrow">THE RETRY PROBLEM</p>
              <h3>A timeout does not mean “nothing happened.”</h3>
              <p className="lead-copy">
                The caller knows only that it did not receive a response. The service may have rejected, accepted, posted, or completed before the connection failed.
              </p>
              <blockquote>Retry of the same event ≠ a new payment.</blockquote>
            </div>
            <div className="retry-console" aria-label="Idempotent payment retry example">
              <div className="console-line">
                <span>12:04:11.082</span>
                <strong>POST repayment</strong>
                <code>idempotency: trn_84D9</code>
              </div>
              <div className="console-line warning">
                <span>12:04:16.083</span>
                <strong>CLIENT TIMEOUT</strong>
                <code>state: unknown</code>
              </div>
              <div className="console-line">
                <span>12:04:17.210</span>
                <strong>RETRY repayment</strong>
                <code>idempotency: trn_84D9</code>
              </div>
              <div className="console-line success">
                <span>12:04:17.224</span>
                <strong>REPLAY RESULT</strong>
                <code>financial_events: 1</code>
              </div>
              <div className="console-total">
                <span>Requests observed</span><strong>2</strong>
                <span>Economic effects</span><strong>1</strong>
              </div>
            </div>
          </div>

          <div className="time-model">
            <div className="time-intro">
              <p className="eyebrow">FOUR CLOCKS</p>
              <h3>The date on the screen may not be the date that drives the money.</h3>
              <p>A repayment received today but value-dated yesterday may affect interest differently from one merely posted today. The correct behavior is a product/accounting rule to validate.</p>
            </div>
            <div className="time-grid">
              {[
                ['Event time', 'When the business or external event occurred', '2026-09-14 · 22:58'],
                ['Processing date', 'When Avarda receives or handles it', '2026-09-15 · 00:04'],
                ['Posting time', 'When the accounting entries are recorded', '2026-09-15 · 00:05'],
                ['Effective date', 'The economic date used by calculation rules', '2026-09-14'],
              ].map(([title, copy, date]) => (
                <article key={title}>
                  <span>{date}</span>
                  <h4>{title}</h4>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
            <EvidenceTag kind="TO VALIDATE" />
          </div>

          <div className="disclosure-stack">
            <Disclosure label="Inspect failure ownership" meta="5 boundary cases" open>
              <div className="failure-table" role="table" aria-label="Failure ownership matrix">
                <div className="table-head" role="row">
                  <span role="columnheader">Failure</span>
                  <span role="columnheader">Safe state</span>
                  <span role="columnheader">Control / recovery</span>
                </div>
                {[
                  ['Posting succeeds; notification fails', 'Financial state remains authoritative; message state is retryable', 'Outbox/replay, dedupe at consumer, no financial repost'],
                  ['Rail accepts; settlement later fails', 'Payment remains pending/exception, not silently final', 'Status transition, suspense/return handling, customer policy'],
                  ['Settlement succeeds; matching fails', 'Cash exists but customer allocation is unresolved', 'Suspense queue, reference matching, aging and owned break'],
                  ['Duplicate payment message arrives', 'Original result is returned or duplicate quarantined', 'Stable payment identity + payload conflict detection'],
                  ['Billing cut-off races a repayment', 'One deterministic statement and carry-forward rule', 'Ordering/effective-date policy + boundary regression test'],
                ].map(([failure, state, control]) => (
                  <div role="row" key={failure}>
                    <span role="cell">{failure}</span>
                    <span role="cell">{state}</span>
                    <span role="cell">{control}</span>
                  </div>
                ))}
              </div>
            </Disclosure>
            <Disclosure label="Inspect vendor-core acceptance" meta="Delivered ≠ accepted">
              <div className="vendor-lifecycle">
                {['Need', 'Scenario', 'Gap analysis', 'Config vs custom', 'Vendor scope', 'Acceptance contract', 'Regression', 'Financial validation', 'Release sign-off', 'Production control'].map(
                  (item, index) => (
                    <div key={item}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{item}</strong>
                    </div>
                  ),
                )}
              </div>
              <div className="acceptance-contract">
                <h4>Acceptance means the scenario passes end to end</h4>
                <ul>
                  <li>Functional outcome</li>
                  <li>Accounting outcome</li>
                  <li>Performance and volume</li>
                  <li>Regression coverage</li>
                  <li>Audit trail</li>
                  <li>Operations playbook</li>
                  <li>Rollback / compensation</li>
                </ul>
                <blockquote>“Vendor delivered” is not the same as “product accepted.”</blockquote>
              </div>
            </Disclosure>
            <Disclosure label="Inspect correspondent-banking boundary" meta="No named-bank inference">
              <div className="correspondent-note">
                <div>
                  <EvidenceTag kind="FACT" />
                  <p>The ECB defines correspondent banking as one bank making or receiving payments, and potentially other services, on behalf of another bank.</p>
                  <SourceLink href={sources.ecb}>ECB glossary</SourceLink>
                </div>
                <div>
                  <EvidenceTag kind="FACT" />
                  <p>Megasol lists several bank and payment integrations and says Corniche supports payment systems through APIs and access partners.</p>
                  <SourceLink href={sources.cornicheIntegrations}>Megasol integrations</SourceLink>
                </div>
                <div>
                  <EvidenceTag kind="TO VALIDATE" />
                  <p>Those public capabilities do not establish any candidate-specific historical data path. No named-bank chain is inferred from the general mechanism.</p>
                </div>
              </div>
            </Disclosure>
          </div>
        </section>

        <section className="chapter chapter-tint" id="modernise">
          <ChapterHeader
            number="05"
            eyebrow="MODERNISE & MIGRATE"
            title="Move capability only when its destination—and its truth—are ready."
            intro="The strategy is neither “keep legacy forever” nor “replace the core.” It is a repeatable decision about the best owner, the strength of the contract, and the ability to prove equivalence."
          />

          <div className="decision-intro">
            <div>
              <p className="eyebrow">INTERACTIVE DECISION ENGINE</p>
              <h3>Keep · Wrap · Enhance · Migrate · Retire</h3>
            </div>
            <p>Change the evidence below. The working outcome changes with it—because platform strategy should be falsifiable, not ideological.</p>
          </div>
          <DecisionEngine />

          <div className="migration-section">
            <div className="migration-heading">
              <p className="eyebrow">THREE MIGRATIONS, NOT ONE</p>
              <h3>Moving a capability is not the same as moving an account—or its financial truth.</h3>
            </div>
            <div className="migration-types">
              <article>
                <span>01</span>
                <h4>Capability migration</h4>
                <p>Move responsibility for billing, payment routing, servicing or another function.</p>
                <strong>Core question</strong>
                <p>Who handles events that straddle the switch?</p>
              </article>
              <article>
                <span>02</span>
                <h4>Account / data migration</h4>
                <p>Move customer identity, product version, lifecycle, references and servicing state.</p>
                <strong>Core question</strong>
                <p>Can every target field retain its original meaning?</p>
              </article>
              <article>
                <span>03</span>
                <h4>Financial-state migration</h4>
                <p>Move principal, accruals, obligations, unapplied cash, suspense and linked reversals.</p>
                <strong>Core question</strong>
                <p>Does economic behavior remain correct after cut-over?</p>
              </article>
            </div>
          </div>

          <div className="equivalence-proof">
            <div className="equivalence-stack">
              {['Identity', 'Product', 'Balance', 'Accrual', 'Transaction', 'Servicing', 'Accounting'].map((item, index) => (
                <div key={item} style={{ '--stack-index': index } as React.CSSProperties}>
                  <span>{item} equivalence</span>
                  <strong>+</strong>
                </div>
              ))}
              <div className="confidence-result">MIGRATION CONFIDENCE</div>
            </div>
            <div className="behavioral-test">
              <p className="eyebrow">THE BOUNDARY TEST</p>
              <blockquote>
                If the same €400 repayment arrives one minute before and one minute after migration, does the customer end in the same economically correct state?
              </blockquote>
              <div className="boundary-comparison">
                <div>
                  <span>23:59 · SOURCE</span>
                  <strong>€400 → one receipt → balance €0</strong>
                </div>
                <Arrow />
                <div>
                  <span>00:01 · TARGET</span>
                  <strong>€400 → one receipt → balance €0</strong>
                </div>
              </div>
              <p>Equal copied values are necessary. Equivalent behavior is the release criterion.</p>
            </div>
          </div>

          <div className="disclosure-stack">
            <Disclosure label="Inspect the migration proof pack" meta="6 release gates" open>
              <div className="proof-pack">
                {[
                  ['Static controls', 'Record counts and component/control totals by currency, entity, account class and lifecycle.'],
                  ['Accounting proof', 'Opening positions and migration journals balance and prove back to signed source totals.'],
                  ['Behavioral replay', 'Golden scenarios produce equivalent schedules, allocations, fees, reversals and statements.'],
                  ['In-flight control', 'Every payment/message is drained, quarantined or replayed once with a known owner.'],
                  ['External reconciliation', 'Target state matches rail/settlement evidence, including suspense and unresolved breaks.'],
                  ['Recoverable release', 'Cohort gates, stop conditions, support visibility and an executable rollback/compensation plan.'],
                ].map(([title, copy], index) => (
                  <article key={title}>
                    <span>GATE {String(index + 1).padStart(2, '0')}</span>
                    <h4>{title}</h4>
                    <p>{copy}</p>
                  </article>
                ))}
              </div>
            </Disclosure>
            <Disclosure label="Inspect the consolidation value case" meta="Fewer systems is not enough">
              <div className="consolidation-case">
                <div>
                  <p className="eyebrow">SYSTEM CONSOLIDATION</p>
                  <h3>Count eliminated ambiguity—not only eliminated platforms.</h3>
                  <p>A consolidation creates value when it removes duplicate ownership, hand-offs and operational breaks without creating disproportionate migration risk.</p>
                </div>
                <div className="consolidation-signals">
                  {[
                    ['Ownership', 'One accountable owner per balance, calculation and lifecycle transition.'],
                    ['Transaction paths', 'Fewer synchronous hand-offs and shadow copies of financial state.'],
                    ['Settlement & reconciliation', 'Lower break value/age and clearer recovery ownership.'],
                    ['Delivery', 'Less duplicated change, regression and vendor coordination effort.'],
                    ['Risk-adjusted economics', 'Run-cost benefit exceeds migration, control and reversibility cost.'],
                  ].map(([title, copy], index) => (
                    <article key={title}>
                      <span>0{index + 1}</span>
                      <h4>{title}</h4>
                      <p>{copy}</p>
                    </article>
                  ))}
                </div>
                <blockquote>A lower platform count is a weak success metric if the financial-state model becomes harder to prove.</blockquote>
              </div>
            </Disclosure>
          </div>

          <div className="tradeoff-card">
            <div className="tradeoff-hypothesis">
              <span>MY CURRENT HYPOTHESIS</span>
              <h3>Wrap a stable financial owner before migrating it.</h3>
              <p>This preserves trusted state while improving channel and workflow velocity.</p>
            </div>
            <div className="tradeoff-grid">
              <div><span>UPSIDE</span><p>Lower change radius; faster contract and customer-layer evolution.</p></div>
              <div><span>RISK</span><p>Wrapper becomes permanent complexity or hides an unsuitable core.</p></div>
              <div><span>REVERSIBILITY</span><p>High if the contract is versioned and ownership remains explicit.</p></div>
              <div><span>DEPENDENCIES</span><p>Core runtime, vendor roadmap, API completeness, operating model.</p></div>
            </div>
            <div className="change-mind">
              <span>WHAT WOULD CHANGE MY MIND?</span>
              <p>Unacceptable vendor lead time · insufficient reliability · blocked product configurability · regulatory limitation · wrapper economics worse than migration.</p>
            </div>
          </div>
        </section>

        <section className="chapter" id="proof">
          <ChapterHeader
            number="06"
            eyebrow="TRANSFERABLE PROOF"
            title="The systems differ. The product disciplines transfer."
            intro="This is not a biography. It is a precise map from work I have done to the decisions this role requires—and the product principles that carry across platforms."
          />

          <div className="experience-proof-strip" aria-label="Candidate experience context">
            <div>
              <span>PRIMARY CONTEXT</span>
              <strong>MoneyLion / Gen</strong>
              <p>AI/ML product work across fraud, payments and personal financial management.</p>
            </div>
            <div>
              <span>SYSTEM CONTEXT</span>
              <strong>Banking-platform integrations</strong>
              <p>Transaction streams, payment dependencies and downstream financial workflows.</p>
            </div>
            <div>
              <span>CONTROL PATTERN</span>
              <strong>Governed automation</strong>
              <p>Evaluation, confidence routing, human review, auditability and release control.</p>
            </div>
          </div>

          <div className="transfer-table" role="table" aria-label="Experience transfer matrix">
            <div className="transfer-head" role="row">
              <span role="columnheader">Avarda challenge</span>
              <span role="columnheader">What I previously faced</span>
              <span role="columnheader">What I actually did</span>
              <span role="columnheader">Transferable principle</span>
            </div>
            {transferRows.map((row) => (
              <div className="transfer-row" role="row" key={row.challenge}>
                <span role="cell">{row.challenge}</span>
                <span role="cell">{row.faced}</span>
                <span role="cell">{row.did}</span>
                <strong role="cell">{row.principle}</strong>
              </div>
            ))}
          </div>

          <div className="experience-boundary">
            <div>
              <span>EXPERIENCE EVIDENCE USED</span>
              <ul>
                <li>Banking/platform integrations</li>
                <li>Transaction and payment dependencies</li>
                <li>Downstream financial workflows</li>
                <li>Distributed event/data quality</li>
                <li>Regulated decision controls</li>
              </ul>
            </div>
            <div>
              <span>AVARDA RAMP QUESTIONS</span>
              <ul>
                <li>Product-to-account-class mapping</li>
                <li>Authoritative ledger and subledger topology</li>
                <li>Payment-rail and settlement responsibilities</li>
                <li>Current break and reconciliation landscape</li>
                <li>Active consolidation and migration decisions</li>
              </ul>
            </div>
          </div>

          <Disclosure label="Inspect the Open Banking lesson" meta="One transferable pattern">
            <div className="open-banking-lesson">
              <div>
                <p className="eyebrow">ONE JOURNEY · MULTIPLE AUTHORITIES</p>
                <h3>Pending is not booked. Fresh is not final. A duplicate is not new.</h3>
              </div>
              <div className="lesson-list">
                {['Pending ↔ booked transitions', 'Duplicate events', 'Refresh / freshness gaps', 'Schema inconsistency', 'Reversals', 'Account matching', 'Consent state'].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <blockquote>INTEGRATION SUCCESS ≠ FINANCIAL CORRECTNESS</blockquote>
            </div>
          </Disclosure>
        </section>

        <section className="chapter chapter-dark" id="operate">
          <ChapterHeader
            number="07"
            eyebrow="OPERATING MODEL"
            title="Thirty days to a decision-quality roadmap."
            intro="The first month should reduce uncertainty in a deliberate order: ownership → journeys → exceptions → capability decisions → an accepted roadmap."
          />

          <div className="days-grid">
            {[
              ['05', 'I can answer', 'Which system owns which financial truth?', 'Signed ownership map and glossary'],
              ['10', 'I can explain', 'How the top product journeys become account and financial events.', 'Scenario maps with owners and contracts'],
              ['15', 'I know', 'Where financial and operational exceptions accumulate—and why.', 'Break inventory by value, age, cause and recovery'],
              ['20', 'We have', 'A Keep / Wrap / Enhance / Migrate / Retire capability view.', 'Evidence-led decision register'],
              ['30', 'We have', 'A prioritised roadmap with customer value, operational value and financial risk.', 'Scenario acceptance + measurable outcomes'],
            ].map(([day, prefix, statement, output]) => (
              <article key={day}>
                <span className="day-number">DAY {day}</span>
                <small>{prefix}</small>
                <h3>{statement}</h3>
                <div><span>OUTCOME</span><p>{output}</p></div>
              </article>
            ))}
          </div>

          <div className="operating-loop">
            <div className="loop-core">
              <span>PRODUCT</span>
              <strong>SCENARIO + ACCEPTANCE</strong>
              <span>LEDGER</span>
            </div>
            {['Business & customer', 'Engineering', 'Finance', 'Operations', 'Risk & compliance', 'Platform vendor'].map((item, index) => (
              <span className={`loop-orbit orbit-${index + 1}`} key={item}>{item}</span>
            ))}
          </div>

          <div className="ai-boundary">
            <div>
              <p className="eyebrow">AI · AROUND 10%, BY DESIGN</p>
              <h3>Probabilistic intelligence can surround the core.</h3>
              <p>It can reduce investigation time and surface patterns without becoming the owner of monetary truth.</p>
            </div>
            <div className="ai-columns">
              <article>
                <span>AI CAN</span>
                <ul>
                  <li>Detect anomalous breaks</li>
                  <li>Summarise an exception trail</li>
                  <li>Recommend likely matches</li>
                  <li>Generate test candidates</li>
                  <li>Triage operational queues</li>
                </ul>
              </article>
              <article>
                <span>AI CANNOT OWN</span>
                <ul>
                  <li>Ledger truth</li>
                  <li>Account balance</li>
                  <li>Regulatory accountability</li>
                  <li>Unreviewed monetary correction</li>
                  <li>Untraceable product policy</li>
                </ul>
              </article>
            </div>
            <blockquote>Monetary truth must remain governed, auditable and deterministic.</blockquote>
          </div>
        </section>

        <section className="chapter closing" id="close">
          <div className="closing-number">08</div>
          <p className="eyebrow">WHY CONTINUE THE CONVERSATION</p>
          <h2>A platform-specific gap.<br />Not a systems-thinking gap.</h2>
          <div className="closing-copy">
            <p>
              The distinction I wanted to make after our conversation is simple: my background is not years of direct Corniche administration, and I do not want to represent it that way.
            </p>
            <p>
              What I do bring is experience modernising regulated banking systems around trusted cores, understanding cross-system financial workflows, turning complex operational rules into product logic, and building controlled automation at scale.
            </p>
            <p><strong>I built this to make that boundary—and the transferable depth—clear.</strong></p>
          </div>
          <div className="closing-cta">
            <p>I would value the opportunity to continue the discussion and test this thinking against Avarda’s actual architecture, constraints and roadmap.</p>
            <a href="mailto:?subject=Avarda%20core%20banking%20discussion">Continue the conversation <span aria-hidden="true">→</span></a>
          </div>
        </section>

        <footer id="sources">
          <div className="footer-heading">
            <p className="eyebrow">EVIDENCE & BOUNDARIES</p>
            <h2>Public sources used</h2>
            <p>External facts are cited. Internal architecture, policy, accounting mappings and vendor configuration remain explicitly to validate.</p>
          </div>
          <div className="source-list">
            {[
              ['Avarda', 'Core Banking Product role brief', sources.role],
              ['Avarda', 'Direct Invoice API', sources.directInvoice],
              ['Avarda', 'Authorization flow details', sources.flow],
              ['Avarda', 'Return and price-adjustment API', sources.return],
              ['Megasol', 'Corniche platform and customer list', sources.megasol],
              ['Megasol', 'Payments and posting capabilities', sources.cornichePayments],
              ['Megasol', 'Documented integrations', sources.cornicheIntegrations],
              ['ECB', 'Correspondent banking glossary', sources.ecb],
            ].map(([publisher, title, href], index) => (
              <a href={href} target="_blank" rel="noreferrer" key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><small>{publisher}</small><strong>{title}</strong></div>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <div className="footer-note">
            <span>Prepared by Vilol Joshi</span>
            <span>Independent interview artifact · September 2026</span>
            <span>Public facts current at preparation</span>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
