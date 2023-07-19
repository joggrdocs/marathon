import * as howToGuideBasic from './lib/templates/how-to-guide-basic';

export type Template = typeof howToGuideBasic.name;

export type TemplateData<T> = T extends typeof howToGuideBasic.name
  ? howToGuideBasic.Data
  : never;

export function getTemplate<T = Template>(name: T) {
  switch (name) {
    case howToGuideBasic.name:
      return howToGuideBasic;
    default:
      throw new Error(`Unknown template: ${name}`);
  }
}

function run<T = Template>(template: T, data: TemplateData<T>) {
  const t = getTemplate(template);
  return t.run(data);
}

export default run;
