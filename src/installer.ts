import * as httpm from '@actions/http-client';
import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as path from 'path';
import type {Release} from '@octokit/webhooks-types';

export async function install(version: string) {
  let url = 'https://api.github.com/repos/neobaran/csac/releases/';
  if (version === 'latest') {
    url += 'latest';
  } else {
    url += `tags/v${version}`;
  }
  core.info(`Fetching release from ${url}`);
  const res = (await (await new httpm.HttpClient('actions/install-csac').getJson(url)).result) as Release;
  const asset = res.assets.find(item => item.name.includes('Linux_x86_64.tar.gz'));
  if (!asset) {
    throw new Error('No asset found');
  }
  const downloadPath = await tc.downloadTool(asset.browser_download_url);
  core.debug(`Downloaded to ${downloadPath}`);

  core.info('Extracting csac');
  const extPath = await tc.extractTar(downloadPath);
  core.debug(`Extracted to ${extPath}`);

  const cachePath = await tc.cacheDir(extPath, 'csac-action', version);
  core.debug(`Cached to ${cachePath}`);

  const exePath = path.join(cachePath, 'csac');
  core.debug(`Exe path is ${exePath}`);

  return exePath;
}
