# CSAC Action

[GitHub Action](https://github.com/features/actions) for [CSAC](https://github.com/neobaran/csac)

[![](https://img.shields.io/github/release/neobaran/csac-action.svg?logo=github&style=flat-square)](https://github.com/neobaran/csac-action/releases/latest)
[![](https://img.shields.io/badge/marketplace-csac--action-blue?logo=github&style=flat-square)](https://github.com/marketplace/actions/csac-action)
[![](https://img.shields.io/github/license/neobaran/csac-action?style=flat-square)](https://github.com/neobaran/csac-action/blob/master/LICENSE)

---
## Usage

```yaml
name: 'example.com'

on:
  schedule:
    - cron: '0 0 1 */2 *'

jobs:
  csac:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Auto Cert
        uses: neobaran/csac-action@v1.0.0
        with:
          # csac vesion https://github.com/neobaran/csac/releases
          version: latest # or 0.0.2
          tencent-secret-id: ${{ secrets.TENCENT_SECRET_ID }}
          tencent-secret-key: ${{ secrets.TENCENT_SECRET_KEY }}
          domains: |
            *.example.com
```