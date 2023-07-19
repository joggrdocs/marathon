import render, { getTemplate, Template } from '../render';
import * as howToGuideBasic from '../lib/templates/how-to-guide-basic';

// Mocking the howToGuideBasic module
jest.mock('../lib/templates/how-to-guide-basic', () => ({
  name: 'how-to-guide-basic',
  run: jest.fn((data: howToGuideBasic.Data) => `${data.title}: ${data.content}`),
}));

describe('render', () => {
  it('should render the correct output for howToGuideBasic template', () => {
    const data = { title: 'Test Title', content: 'Test Content' };
    // @ts-ignore
    const result = render('how-to-guide-basic', { title: 'Test Title', content: 'Test Content' });
    expect(howToGuideBasic.run).toHaveBeenCalledWith(data);
  });

  it('should throw an error for an unknown template', () => {
    const unknownTemplate = 'unknownTemplate';

    // Ensure that trying to render an unknown template throws an error
    // @ts-ignore
    expect(() => render(unknownTemplate, {})).toThrow(`Unknown template: ${unknownTemplate}`);
  });
});

describe('getTemplate', () => {
  it('should throw an error for an unknown template', () => {
    const unknownTemplate = 'unknownTemplate';
    expect(() => getTemplate(unknownTemplate as Template)).toThrow(
      `Unknown template: ${unknownTemplate}`
    );
  });
});