# Contributing to the agent payment fraud taxonomy

This taxonomy is a working list of how AI agent payments go wrong. It gets better when people who run agent payments tell us what they have seen. You don't need to write code to contribute.

## What we welcome

- **A new pattern** that isn't in the list, with an anonymized example.
- **Better signals** for an existing pattern: which [APE](https://github.com/halvorAI/ape-schema) fields reveal it, and how.
- **Corrections and clarifications** where a description, example or signal is wrong or vague.
- **Links from signals to APE fields** that an implementer can test against.

## Out of scope for now

- Real customer names, merchant names, personal data or anything that identifies a company or person. Anonymize every example.
- Vendor or product comparisons, and marketing.
- Renumbering published IDs. IDs are stable once published; a pattern can be split or merged in a later version, and the changelog says so.

## Set up and run the checks

Requirements: None for text changes. To check `taxonomy.json` locally you need Python 3 or Node.js.

```bash
git clone https://github.com/halvorAI/agent-fraud-taxonomy.git
cd agent-fraud-taxonomy
python3 -m json.tool taxonomy.json > /dev/null && echo "taxonomy.json is valid JSON"
```

There is no test suite. If you change `taxonomy.json`, check that it still parses with the command above.

## Your first contribution

Look for issues labeled [`good first issue`](https://github.com/halvorAI/agent-fraud-taxonomy/labels/good%20first%20issue). To suggest a new pattern, open a **New pattern or signal** issue; a pull request isn't required.

1. **Comment on the issue** to say you're taking it, so two people don't do the same work. For anything not covered by an issue, open one first and say what you plan to change.
2. **Fork the repository** and create a branch.
3. **Keep the pull request small**: one change, with its tests or examples.
4. **Run the checks above** before you push.
5. **Open the pull request** and fill in the template. Leave the "Brain update" section empty; a maintainer fills it in.

## Tests, fixtures and docs

- Keep [`README.md`](README.md) and [`taxonomy.json`](taxonomy.json) in step: a pattern or signal you add or change in one must match in the other.
- Mark examples as illustrative, and keep them synthetic.
- Refer to APE fields by their exact path, such as `payment.amount` or `payee.wallet.address`.
- Add a line to `CHANGELOG.md` under the next version.

## How we respond

The maintainers are [@hedge-waleed](https://github.com/hedge-waleed) (reviewer) and [@hedge-urk](https://github.com/hedge-urk) (backup reviewer). In business days, we aim to:

| What you open | First response |
| --- | --- |
| An issue | Acknowledged within 1 business day |
| An issue | Triaged within 2 business days: accepted, needs more information, needs design discussion, or out of scope |
| A pull request | A substantive first review within 3 business days |

We won't promise a merge date before a review and a green CI run. If we miss these times, a polite ping on the issue or pull request is welcome.

Questions are welcome as issues too. You don't need to email us or know anyone at HalvorAI to contribute.

## Security

Please don't report vulnerabilities in public issues. Email **hello@halvorai.com** with the details instead, and we'll reply privately. See [SECURITY.md](SECURITY.md).

## License

By contributing, you agree that your contribution is licensed under the Apache License 2.0, the same license as this repository.
