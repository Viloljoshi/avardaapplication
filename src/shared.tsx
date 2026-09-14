import { useMemo, useState } from 'react'
import {
  explorerSteps,
  scenarios,
  type EvidenceKind,
  type ScenarioId,
} from './content'

export function EvidenceTag({ kind }: { kind: EvidenceKind }) {
  return <span className={`evidence-tag evidence-${kind.toLowerCase().replace(' ', '-')}`}>{kind}</span>
}

export function SourceLink({ href, children = 'source' }: { href: string; children?: React.ReactNode }) {
  return (
    <a className="source-link" href={href} target="_blank" rel="noreferrer">
      {children} <span aria-hidden="true">↗</span>
    </a>
  )
}

export function Arrow({ vertical = false }: { vertical?: boolean }) {
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

export function ChapterHeader({
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

export function Disclosure({
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

export function FiveLayerReasoning({
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

export function FinancialStateExplorer() {
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
              <span>{entry.debit ?? '–'}</span>
              <span>{entry.credit ?? '–'}</span>
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

export function DecisionEngine() {
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
        description: 'Sequence a bounded migration with behavioral, financial and reconciliation equivalence, not data-copy parity alone.',
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
