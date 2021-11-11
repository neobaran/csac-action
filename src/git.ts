import * as exec from '@actions/exec';

const git = async (args: string[] = []) => {
  return await exec
    .getExecOutput(`git`, args, {
      ignoreReturnCode: true,
      silent: true
    })
    .then(res => {
      if (res.stderr.length > 0 && res.exitCode != 0) {
        throw new Error(res.stderr);
      }
      return res.stdout.trim();
    });
};

export async function getEmail() {
  return await git(['--no-pager', 'log', `--format=format:'%ae'`, '-n', '1']);
}
