import * as core from '@actions/core';
import { dump } from 'js-yaml';
import { install } from './installer';
import * as path from 'path';
import * as fs from 'fs';
import { exec, getExecOutput } from '@actions/exec';

async function getEmail() {
  return await
    getExecOutput('git', ['--no-pager', 'log', `--format=format:'%ae'`, '-n', '1'], {
      ignoreReturnCode: true,
      silent: true
    })
      .then(res => {
        if (res.stderr.length > 0 && res.exitCode != 0) {
          throw new Error(res.stderr);
        }
        return res.stdout.trim().replace(/'/g, '');
      });
}

async function run() {
  try {
    const keyType = core.getInput('keytype') || 'RSA2048';
    const tencentSecretID = core.getInput('tencent-secret-id');
    const tencentSecretKey = core.getInput('tencent-secret-key');
    const domains = core.getMultilineInput('domains') || [];
    const ttl = core.getInput('ttl') || '600';
    if (domains.length === 0) {
      throw new Error('No domain specified');
    }
    if (!tencentSecretID || !tencentSecretKey) {
      throw new Error('No tencent secret id or key specified');
    }
    const email = core.getInput('email') || await getEmail();

    const config = dump({
      KeyType: keyType,
      Email: email,
      Tencent: {
        SecretId: tencentSecretID,
        SecretKey: tencentSecretKey
      },
      Domains: domains,
      TTL: +ttl
    });

    const version = core.getInput('version') || 'latest';

    const csac = await install(version);
    core.info(`csac ${version} installed successfully`);

    const configPath = path.resolve(path.dirname(csac), 'config.yaml')
    fs.writeFileSync(configPath, config);
    core.info(`create config file on ${configPath}`);

    const args = ['--config', configPath]
    if (core.getBooleanInput('debug') === true) {
      args.push('--debug');
    }
    await exec(csac, args);
  } catch (e) {
    const error = e as Error;
    core.setFailed(error.message);
  }
}

run();
