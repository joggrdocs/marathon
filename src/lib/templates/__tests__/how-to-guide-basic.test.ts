import * as doc from '../how-to-guide-basic';

describe('how-to-guide-basic', () => {
  it('matches snapshot', () => {
    expect(doc.run(doc.sample as doc.Data)).toMatchSnapshot();
  });
});
