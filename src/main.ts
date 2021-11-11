import * as git from './git';
import * as core from '@actions/core';
import {dump} from 'js-yaml';
import {install} from './installer';
import * as path from 'path';
import * as fs from 'fs';
import {exec} from '@actions/exec';

async function run() {
  try {
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
    const email = await git.getEmail();

    const config = dump({
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
    core.info(`csac v${version} installed successfully`);

    fs.writeFileSync(path.resolve(path.dirname(csac), 'config.yaml'), config);
    core.info(`create config file successfully`);

    await exec(csac, ['--config', 'config.yaml']);
  } catch (e) {
    const error = e as Error;
    core.setFailed(error.message);
  }
}

run();
