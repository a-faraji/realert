import * as path from 'node:path';
import * as fs from 'node:fs';
import { execSync } from 'child_process';

const testFileRegex = /\.test\.tsx?$/i;

function isTestFile(file: string) {
  return testFileRegex.test(file);
}

function traverseFolder(folder: string): string[] {
  const dir = path.resolve('./', folder);
  const fileList = fs.readdirSync(dir);
  let testFiles: string[] = [];
  fileList.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stats = fs.lstatSync(fullPath);
    if (stats.isDirectory()) {
      testFiles = testFiles.concat(traverseFolder(fullPath));
    } else if (isTestFile(file)) {
      testFiles.push(`"${fullPath}"`);
    }
  });
  return testFiles;
}

(() => {
  const filesToTest = traverseFolder('./src').join(' ');

  if (filesToTest) {
    // run test
    try {
      execSync(`node --test --loader ts-node/esm ${filesToTest}`, { stdio: 'inherit' });
    } catch (e) {}
  }
})();
