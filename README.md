# CSAC Action

[GitHub Action](https://github.com/features/actions) for [CSAC](https://github.com/neobaran/csac)

[![](https://img.shields.io/github/release/neobaran/csac-action.svg?logo=github&style=flat-square)](https://github.com/neobaran/csac-action/releases/latest)
[![](https://img.shields.io/badge/marketplace-csac--action-blue?logo=github&style=flat-square)](https://github.com/marketplace/actions/csac-action)
[![](https://img.shields.io/github/license/neobaran/csac-action?style=flat-square)](https://github.com/neobaran/csac-action/blob/master/LICENSE)

---
## Usage

1. [Generate your Tencent Cloud API key](https://cloud.tencent.com/document/api/213/30654#.E7.94.B3.E8.AF.B7.E5.AE.89.E5.85.A8.E5.87.AD.E8.AF.81)

2. [Add secret](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets#creating-encrypted-secrets-for-a-repository) called `TENCENT_SECRET_ID` and `TENCENT_SECRET_KEY` in your repo.

3. creat new action

```yaml
name: 'example.com'

on:
  schedule:
    # Runs every two months on the 1st
    - cron: '0 0 1 */2 *'

jobs:
  csac:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Auto Cert
        uses: neobaran/csac-action@v1.0.2
        with:
          # csac vesion https://github.com/neobaran/csac/releases
          version: latest # or 0.0.2
          keytype: 'RSA2048' # or EC256 / EC384 / RSA4096 / RSA8192
          tencent-secret-id: ${{ secrets.TENCENT_SECRET_ID }}
          tencent-secret-key: ${{ secrets.TENCENT_SECRET_KEY }}
          domains: |
            *.example.com
```
