# Evidence ledger

This is the internal claim-control sheet for the interview artifact. It is deliberately more conservative than a CV: every material statement is either externally cited, candidate-supplied and narrowly phrased, or left as a question to validate.

| Claim | Source | Exact support | Confidence | Safe wording used |
|---|---|---|---|---|
| Avarda Bank is a Corniche customer | Megasol public website | Avarda Bank appears in Megasol’s customer list | High | Used as `FACT`, linked to Megasol |
| Corniche supports accounts, payments, general-ledger/reporting concepts and stable APIs | Megasol public website | Public capability and endpoint examples include accounts, payments, daily ledger balances and transaction audit | High | Described at capability level; no claim about Avarda’s exact configuration |
| Corniche supports internal/external payments and SEPA / ISO 20022 through integrations or access partners | Megasol payments and integrations pages | The pages state this directly | High | Used as `FACT`; exact Avarda rail topology remains `TO VALIDATE` |
| Avarda’s Direct Invoice API exposes `AccountClassCode` and partner configuration fallback | Avarda public API documentation | The request property and fallback behavior are documented directly | High | Used as an Avarda-specific proof point |
| Avarda documents asynchronous background processing and separate order-management readiness | Avarda Authorization API flow/status documentation | The documentation describes approval followed by background processing and an `InBackOffice` indicator | High | Used to support the general need to distinguish states |
| Correspondent banking allows one bank to make or receive payments on behalf of another | ECB payments glossary | The ECB definition states this directly | High | Used only to validate the general mechanism |
| HSBC or Wells Fargo directly used Corniche in the candidate’s historical workflow | No reliable evidence supplied or found | Nothing establishes this specific relationship or data path | None | Not claimed; explicitly left unverified |
| Candidate owned end-to-end Corniche administration/configuration | Candidate correction in the governing brief | Candidate explicitly says this is not the accurate scope | High | Explicitly disclaimed near the top and in the close |
| Candidate worked with banking platforms, transaction/payment dependencies, downstream workflows and data/events around authoritative systems | Candidate-supplied brief and referenced conversation | Stated by the candidate as the accurate boundary of experience | Medium (candidate supplied) | Used without named-bank attribution or invented metrics |
| Candidate used controlled automation patterns in regulated financial workflows | Candidate-supplied brief and referenced conversation | Candidate describes evaluation harnesses, confidence gates, human review, fraud/payments/PFM model work | Medium (candidate supplied) | Used as a transferable principle; no unsupported performance metric |

## Rules applied

- No HSBC, Wells Fargo or candidate-specific Corniche data path is asserted.
- No private Avarda topology, ledger account, repayment waterfall, fee policy or migration decision is presented as fact.
- Illustrative journals are labelled as such and defer exact recognition/account mappings to Finance and the real configuration.
- Public/company-specific claims use `FACT`, `INFERENCE`, or `TO VALIDATE` in the artifact.
- No numerical candidate outcomes are used because no primary CV/source file was available to verify them.
