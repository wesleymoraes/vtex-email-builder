import { promises as fs } from 'fs';
import { mkdtemp, rm } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { tmpdir } from 'os';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_URL = 'https://github.com/vtex/vtex-emails.git';

export async function importTemplates() {
  const tempDir = await mkdtemp(path.join(tmpdir(), 'vtex-emails-'));
  try {
    await execAsync(`git clone --depth=1 ${REPO_URL} ${tempDir}`);
    const srcDir = path.join(tempDir, 'source', 'templates');
    const destDir = path.join(__dirname, 'src', 'templates');
    await fs.mkdir(destDir, { recursive: true });
    const files = await fs.readdir(srcDir);
    await Promise.all(
      files.map(file => fs.copyFile(path.join(srcDir, file), path.join(destDir, file)))
    );
    console.log(`Templates copied to ${destDir}`);
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  importTemplates().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
