import fs from 'node:fs/promises';
import path from 'node:path';

const rootDir = path.resolve(__dirname, '../..');

async function run() {
  const templatesDir = await fs.readdir(path.join(rootDir, 'src', 'lib', 'templates'));
  const templates = templatesDir.filter((file) => file.endsWith('.ts'));

  for (const template of templates) {
    const templateName = template.replace(/\.ts$/, '');
    const templatePath = path.join(rootDir, 'src', 'lib', 'templates', template);
    const templateModule = await import(templatePath);
    const templateFunction = templateModule.run;
    const templateData = templateModule.sample;
    const output = templateFunction(templateData);
    const outputPath = path.join(rootDir, 'templates', `${templateName}.md`);
    await fs.writeFile(outputPath, output);
  }
}

console.log('Building outputs...');
run()
  .then(() => console.log('Completed building outputs.'));
