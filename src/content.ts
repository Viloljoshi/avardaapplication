export type EvidenceKind = 'FACT' | 'INFERENCE' | 'TO VALIDATE'

export type ScenarioId =
  | 'full-payment'
  | 'partial-payment'
  | 'refund'
  | 'reversal'
  | 'returned-payment'
  | 'delinquency'
  | 'migration'

export interface Scenario {
  id: ScenarioId
  shortLabel: string
  title: string
  kicker: string
  customer: string
  product: string
  financial: string
  external: string
  control: string
  decision: string
  changedSteps: number[]
  journal: Array<{ account: string; debit?: string; credit?: string; note: string }>
  caveat?: string
}

export const sources = {
  directInvoice:
    'https://docs.avarda.com/authorization-api/api-reference/create-credit-authorization/direct-invoice/',
  partPayment:
    'https://docs.avarda.com/authorization-api/api-reference/create-credit-authorization/part-payment/',
  flow: 'https://docs.avarda.com/authorization-api/flow-details/',
  return:
    'https://docs.avarda.com/order-management/authorization-api/return-order/',
  capture:
    'https://docs.avarda.com/order-management/authorization-api/capture-order/',
  megasol: 'https://megasol.se/',
  cornichePayments:
    'https://www.megasol.se/banking-services/payments-second-word/',
  cornicheIntegrations:
    'https://www.megasol.se/platform/corniche-banking-system/',
  ecb: 'https://www.ecb.europa.eu/services/glossary/html/act7c.en.html',
}

export const explorerSteps = [
  { label: 'Customer', hint: 'Visible outcome' },
  { label: 'Product config', hint: 'Rules & waterfall' },
  { label: 'Account state', hint: 'Obligation & lifecycle' },
  { label: 'Financial event', hint: 'Immutable intent' },
  { label: 'External rail', hint: 'Processing reality' },
  { label: 'Posting', hint: 'Accounting treatment' },
  { label: 'Ledger', hint: 'Authoritative balances' },
  { label: 'Reconcile', hint: 'Proven match' },
]

export const scenarios: Scenario[] = [
  {
    id: 'full-payment',
    shortLabel: 'Full payment',
    title: 'Full invoice payment',
    kicker: '€400 received against a €400 due balance',
    customer: 'The invoice becomes paid only after the incoming payment is matched and the account state is updated, not merely when a payment instruction is observed.',
    product: 'The repayment waterfall allocates the receipt across configured balance components; the obligation closes when no amount remains due.',
    financial: 'Cash / clearing increases and the customer receivable decreases by €400. Any fee or interest allocation follows the product configuration in force.',
    external: 'The rail or correspondent reports receipt and, later, a settled/final state. Those are related states, not necessarily the same timestamp.',
    control: 'Match amount, currency, value date and durable payment reference; prove a balanced journal and reconcile to the external statement.',
    decision: 'Define exactly which external status is sufficient to expose “paid” to the customer, and how a later return reopens the obligation.',
    changedSteps: [0, 1, 2, 3, 4, 5, 6, 7],
    journal: [
      { account: 'Cash / clearing', debit: '€400', note: 'Receipt recognised' },
      { account: 'Customer receivable', credit: '€400', note: 'Obligation reduced' },
    ],
    caveat: 'Illustrative journal only. Exact account mapping and recognition point are TO VALIDATE with Finance and the actual ledger configuration.',
  },
  {
    id: 'partial-payment',
    shortLabel: 'Partial',
    title: 'Partial repayment',
    kicker: '€150 received against a €400 due balance',
    customer: 'The customer sees €150 applied and €250 still due, with the next due date and any consequence stated unambiguously.',
    product: 'Allocation follows the configured hierarchy, for example fees, interest and principal, but the actual order is a product and jurisdiction decision.',
    financial: 'The total receivable falls by €150; component balances change according to the waterfall. No amount should disappear into an untraceable residual.',
    external: 'One settled receipt arrives with a stable reference. A partial amount is still a complete payment event; it is not a failed full-payment attempt.',
    control: 'Recalculate the component sum, retain the allocation trace and confirm that the remaining balance equals the customer-facing amount.',
    decision: 'Make the repayment hierarchy versioned, testable and explainable, especially around billing cut-offs and changes to product terms.',
    changedSteps: [0, 1, 2, 3, 4, 5, 6, 7],
    journal: [
      { account: 'Cash / clearing', debit: '€150', note: 'Receipt recognised' },
      { account: 'Customer receivable', credit: '€150', note: 'Allocated by configured waterfall' },
    ],
    caveat: 'The allocation order is deliberately not assumed. It is a TO VALIDATE requirement, not a generic banking constant.',
  },
  {
    id: 'refund',
    shortLabel: 'Refund',
    title: 'Refund after a return',
    kicker: '€120 merchandise return after purchase capture',
    customer: 'If the invoice is unpaid, the balance may reduce. If already paid, the customer may instead become owed money. The experience must reflect which branch occurred.',
    product: 'The credit links to the original purchase line and product/account. A return is a new lifecycle event, not a rewrite of the purchase.',
    financial: 'Unpaid branch: reduce the receivable. Paid branch: create a customer payable or outbound-refund obligation until execution completes.',
    external: 'A merchant return instruction and an outbound rail status can progress independently; “refund initiated” is not “funds received”.',
    control: 'Preserve the original purchase, prevent credit beyond the eligible amount, and reconcile any outbound refund to the bank/rail confirmation.',
    decision: 'Model the paid and unpaid branches explicitly, including partial returns, failed payouts and customer communications.',
    changedSteps: [0, 2, 3, 4, 5, 6, 7],
    journal: [
      { account: 'Sales-finance adjustment', debit: '€120', note: 'Illustrative credit event' },
      { account: 'Receivable / customer payable', credit: '€120', note: 'Branch depends on prior payment state' },
    ],
    caveat: 'Avarda publicly documents returns and price adjustments; the exact internal journal and refund rail are TO VALIDATE.',
  },
  {
    id: 'reversal',
    shortLabel: 'Reversal',
    title: 'Payment reversal',
    kicker: 'A previously recorded receipt is negated',
    customer: 'The balance may reopen, with a clear explanation and no disappearing history. A temporary processing state should not masquerade as finality.',
    product: 'Lifecycle logic applies the inverse economic effect while retaining a causal link to the original event.',
    financial: 'The original posting remains immutable. A compensating journal restores the receivable and reverses cash / clearing recognition.',
    external: 'The processor or bank supplies a reversal/cancellation reference that must correlate to the original payment.',
    control: 'Only one valid compensating event per reversal identity; monitor orphan reversals and changes after billing or collections transitions.',
    decision: 'Specify finality, customer communication and downstream compensation by reversal reason, not as one undifferentiated error.',
    changedSteps: [0, 2, 3, 4, 5, 6, 7],
    journal: [
      { account: 'Customer receivable', debit: '€400', note: 'Obligation restored' },
      { account: 'Cash / clearing', credit: '€400', note: 'Prior receipt compensated' },
    ],
    caveat: 'A reversal is shown as a compensating event. Exact posting rules depend on finality and the external payment method.',
  },
  {
    id: 'returned-payment',
    shortLabel: 'Returned',
    title: 'Returned payment',
    kicker: 'A payment marked received is later returned unpaid',
    customer: 'The invoice reopens or returns to due status. Any fee, grace period or collections effect must come from configured terms, not from a technical default.',
    product: 'The account moves through an explicit returned-payment state; delinquency treatment is evaluated from effective dates and policy.',
    financial: 'Restore the unpaid obligation and reverse the provisional cash/clearing effect. Additional charges, if any, are separate events.',
    external: 'The rail reports a return with reason, value date and reference. This may arrive after customer-facing state already changed.',
    control: 'Correlate to the original receipt, prevent duplicate returns and reconcile the return leg and any suspense position.',
    decision: 'Choose when a receipt becomes customer-final versus provisional, and design a deterministic late-return recovery path.',
    changedSteps: [0, 1, 2, 3, 4, 5, 6, 7],
    journal: [
      { account: 'Customer receivable', debit: '€400', note: 'Unpaid obligation restored' },
      { account: 'Cash / clearing', credit: '€400', note: 'Returned funds recognised' },
    ],
    caveat: 'Returned-payment behavior varies by rail and product. Customer fees and collections consequences are TO VALIDATE.',
  },
  {
    id: 'delinquency',
    shortLabel: 'Delinquency',
    title: 'Delinquency transition',
    kicker: 'The due date passes with €400 unpaid',
    customer: 'The customer sees a stable amount due, days past due and a next action. Messaging must not outrun the authoritative account calculation.',
    product: 'Calendar, grace period, aging buckets, collections strategy and any accrual behavior determine the next lifecycle state.',
    financial: 'No cash event occurs. Accruals, impairment classification, fees or write-off treatment are separate controlled events where applicable.',
    external: 'Collections and communication providers may receive instructions, but they do not become the source of monetary truth.',
    control: 'Reproduce the transition for the same account/configuration version and verify the balance at the billing boundary.',
    decision: 'Separate “days past due changed” from “charge applied” and “collections action sent” so each can fail or be reversed safely.',
    changedSteps: [0, 1, 2, 3, 5, 6, 7],
    journal: [
      { account: 'No cash journal', note: 'Lifecycle movement alone need not post money' },
      { account: 'Accrual / fee events', note: 'Only when configured and legally applicable' },
    ],
    caveat: 'This model intentionally makes no claim about Avarda’s collections, impairment or fee policy.',
  },
  {
    id: 'migration',
    shortLabel: 'Migration',
    title: 'Live-account migration',
    kicker: '€400 obligation crosses the cut-over boundary',
    customer: 'The amount, due date, payment options and service history remain economically continuous. The customer should not need to understand the system move.',
    product: 'Identity, product-version, lifecycle and servicing state map to the target without silently applying today’s defaults to yesterday’s contract.',
    financial: 'Principal, fees, interest/accruals, unapplied cash, suspense and linked reversals are conserved and prove back to control totals.',
    external: 'In-flight payments are quarantined, drained or replayed once under a defined cut-over protocol; every message has an owner.',
    control: 'Prove static balances, behavioral equivalence, ledger control totals and external reconciliation before releasing the migration cohort.',
    decision: 'Do not equate row-count parity with migration success. Release only when economic behavior is equivalent across the boundary.',
    changedSteps: [0, 1, 2, 3, 4, 5, 6, 7],
    journal: [
      { account: 'Source control total', credit: '€400', note: 'Closed/transferred by governed cut-over method' },
      { account: 'Target control total', debit: '€400', note: 'Opening state proves to source' },
    ],
    caveat: 'Illustrative control view, not a prescribed migration journal. Finance determines the actual accounting treatment.',
  },
]

export const transferRows = [
  {
    challenge: 'Modernise a mixed core portfolio without destabilising monetary truth',
    faced: 'Regulated banking journeys spread across authoritative platforms, integration layers and downstream consumers',
    did: 'Worked on product logic around transaction/payment dependencies, event/data contracts and operational exception paths',
    principle: 'Modernise around the system of record before changing who owns state',
  },
  {
    challenge: 'Make platform behavior reusable across products and markets',
    faced: 'Multiple financial workflows with different rules, data shapes and decision policies',
    did: 'Separated shared orchestration and evaluation capabilities from configurable policy and workflow variation',
    principle: 'Standardise the engine; configure legitimate variation',
  },
  {
    challenge: 'Operate when one customer journey spans several authorities',
    faced: 'Transaction feeds with pending/booked changes, duplicates, reversals, freshness gaps and inconsistent schemas',
    did: 'Defined stable states, correlation logic, monitoring and downstream behavior around imperfect upstream signals',
    principle: 'Integration success is not financial correctness',
  },
  {
    challenge: 'Scale automation safely in a regulated environment',
    faced: 'Fraud, payments and PFM decisions where model errors can create customer or operational harm',
    did: 'Used evaluation harnesses, confidence gates, human review, audit trails and controlled release paths',
    principle: 'Automation needs measurable escape hatches',
  },
]

export const chapters = [
  { id: 'context', number: '01', label: 'Context & boundary' },
  { id: 'model', number: '02', label: 'Model the domain' },
  { id: 'explorer', number: '03', label: 'Financial state' },
  { id: 'mechanics', number: '04', label: 'Mechanics & controls' },
  { id: 'modernise', number: '05', label: 'Modernise & migrate' },
  { id: 'proof', number: '06', label: 'Transferable proof' },
  { id: 'operate', number: '07', label: 'Operating model' },
  { id: 'close', number: '08', label: 'Continue the conversation' },
]
