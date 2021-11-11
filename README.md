# [CSAC](https://github.com/neobaran/csac) Action

## Usage

```yaml
name: '*.example.com'

on:
  schedule:
    - cron: '0 0 1 */2 *'

jobs:
  csac:
    runs-on: ubuntu-latest
    steps:
      - name: Auto Cert
        uses: neobaran/csac-action@v1
        with:
          # csac vesion https://github.com/neobaran/csac/releases
          version: latest # or 0.0.2
          tencent-secret-id: ${{ secrets.TENCENT_SECRET_ID }}
          tencent-secret-key: ${{ secrets.TENCENT_SECRET_KEY }}
          domains: |
            *.example.com
```