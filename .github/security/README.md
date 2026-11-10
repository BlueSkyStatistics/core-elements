# Security scan

`.github/workflows/security-scan.yml` runs these scanners and builds one report:

| Check | Tool |
| --- | --- |
| Secrets in the full git history | gitleaks (`gitleaks.toml`) |
| Vulnerable dependencies | npm audit, OSV-Scanner |
| Code patterns | Semgrep (`p/javascript`, `p/secrets` + `semgrep-rules.yml`), ESLint security plugins (`eslint.config.mjs`) |

This is the same scan as BlueSkyJS runs, without the Electron check, since this module is loaded into the BlueSky app rather than being an app itself.

## Running it

- **On demand:** Actions tab → *Security scan* → *Run workflow*, and pick the branch.
- **Automatically:** every Monday at 06:00 UTC, on the branch set in `SCAN_BRANCH` in the workflow (`dev`).

GitHub only shows the *Run workflow* button, and only runs the schedule, once the workflow file is on the repository's **default branch** (`main` here).

Findings never fail the workflow. A failed run means a scanner or the report step broke.

## Reading the report

- The report appears on the run's **Summary** page.
- The `security-report-<branch>` artifact holds `report.md`, `summary.json`, `findings.json` and the raw scanner outputs. Secret values are redacted, and source code is stripped from the raw outputs.
- Each run compares itself with the last successful run on the same branch. The report shows the change in each count and lists new and resolved findings.
- ESLint's Low findings (mostly `detect-object-injection`) are counted but not listed.

## Tuning

- Known false positives from gitleaks go in the `[allowlist]` in `gitleaks.toml`.
- New project-specific patterns go in `semgrep-rules.yml`.
- `build_report.py` is the same script used by the other BlueSky repositories; `SCAN_TOOLS` in the workflow picks which checks appear.
- Tool versions are pinned at the top of the workflow. Bump them deliberately: a new version can change the counts without any code change.
