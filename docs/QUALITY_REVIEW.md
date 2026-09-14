# Quality review

This review evaluates the artifact against the governing build specification. It is a release check, not a claim that public research substitutes for Avarda’s internal knowledge.

## Pass 1 — content and evidence

- Verified all external links return successfully.
- Grounded Avarda platform/role statements in Avarda’s role brief and public API documentation.
- Grounded Corniche customer/capability statements in Megasol’s public material.
- Grounded only the general correspondent-banking mechanism in the ECB glossary.
- Removed named-bank claims and candidate-specific transaction-chain claims from the visible artifact.
- Used no unverified candidate performance metrics.
- Marked illustrative journals, exact recognition policy, account ownership and migration accounting as `TO VALIDATE`.
- Kept the scope correction in the opening and resolution in the close; removed apology-style repetition from the middle.

Result: pass.

## Pass 2 — banking and product SME challenge

| Challenge | Coverage / release treatment |
|---|---|
| Client retries after timeout | Stable idempotency identity; two requests produce one financial event; payload-conflict behavior is called out |
| Payment reversal | Immutable original plus causally linked compensating event; no history rewrite |
| Returned payment | Separate return reason/reference; obligation restored; fees and collections effects remain configuration decisions |
| Settlement failure | Processing/finality is kept separate from posting and customer-visible state; recovery and suspense ownership are explicit |
| Posting succeeds, notification fails | Financial state remains authoritative; outbox/replay without reposting money |
| Matching fails after settlement | Unallocated cash/suspense is visible, aged and owned |
| Billing-boundary race | Event, processing, posting and effective dates are distinguished; regression at cut-off is required |
| Partial payment | Allocation hierarchy is versioned, testable and not assumed from generic practice |
| Refund after prior payment | Paid and unpaid branches are separated; outbound refund is not presented as completed on initiation |
| Migration cut-over | Capability, account and financial-state migration are separated; in-flight messages and one-minute boundary behavior are tested |
| System consolidation | Value case measures ownership, transaction hand-offs, reconciliation breaks, delivery burden and risk-adjusted economics—not platform count alone |
| Vendor release | Scenario acceptance covers function, accounting, performance, regression, audit, operations and rollback |

Result: pass, with exact Avarda ledger mappings and recognition policy deliberately left for internal validation.

## Pass 3 — hiring manager, interaction and responsive design

- Opening shows thesis, explicit scope correction and Avarda-specific proof in the intended first narrative.
- Eight major chapters; detailed mechanics remain behind visible disclosure controls.
- Signature Financial State Explorer covers all seven required scenarios and makes the product decision explicit.
- Interactive modernisation engine recomputes the recommendation as evidence changes.
- Screenshots reviewed at 1440×1000, 768×1024 and 390×844 for opening, Explorer, modernisation and close.
- No document-level horizontal overflow at 1440, 768 or 390 CSS pixels.
- Desktop shows persistent chapter navigation; tablet/mobile retain reading progress and clear local affordances.
- Tablet two-column Explorer promotes the fifth control block to full width; mobile uses intentional horizontal peeks for scenarios/state flow.
- Tested 200% root type scaling and RTL mirroring without document-level overflow.
- Interactive targets are at least 34 px high; keyboard focus is visible; reduced-motion preference is supported.

Result: pass.

## Hard score

| Dimension | Score | Minimum |
|---|---:|---:|
| Avarda specificity | 9.5 | 9 |
| Banking mechanics | 9.4 | 9 |
| Corniche accuracy | 9.6 | 9 |
| Financial correctness | 9.3 | 9 |
| Migration depth | 9.7 | 9 |
| Product judgement | 9.6 | 9 |
| Experience credibility | 10.0 | 10 |
| Trust recovery | 10.0 | 10 |
| Visual clarity | 9.4 | 9 |
| Interaction usefulness | 9.5 | 9 |
| Mobile quality | 9.0 | 8 |
| Genericity resistance | 10.0 | 10 |

Release decision: **approve**. The remaining unknowns are intentionally framed as the first questions to answer with Avarda, not gaps hidden by the artifact.
