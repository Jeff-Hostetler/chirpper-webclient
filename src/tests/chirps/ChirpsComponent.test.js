import {render, screen} from '@testing-library/react';
import ChirpsComponent from '../../chirps/ChirpsComponent'

beforeEach(() => {
  fetch.resetMocks();
  process.env = {REACT_APP_SERVER_URL: 'www.test.com/chirpper/v1/'}
});

describe('intialization', () => {
  test('it fetches chirps and renders them',async () => {
    fetch.mockResponseOnce(JSON.stringify(
      {chirps: [{id: 1, text: 'first'}, {id: 2, text: 'second'}]}
    ));

    const {findByText} = render(<ChirpsComponent/>);

    expect(fetch).toHaveBeenCalledWith(
      'www.test.com/chirpper/v1/chirps'
    );
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    const firstChirp = await findByText(/1 -- first/i);
    const secondChirp = await findByText(/2 -- second/i);
    expect(firstChirp).toBeInTheDocument();
    expect(secondChirp).toBeInTheDocument();
  });
});

describe('createChirp', () => {
  test('creating a chip', async () => {
    fetch.mockResponseOnce(JSON.stringify(
      {chirps: [{id: 1, text: 'first'}]}
    ));

    const {findByText} = render(<ChirpsComponent/>);

    expect(fetch).toHaveBeenCalledWith(
      'www.test.com/chirpper/v1/chirps'
    );
    const firstChirp = await findByText(/1 -- first/i);
    expect(firstChirp).toBeInTheDocument();

    fetch.mockResponseOnce(JSON.stringify(
      {chirp: {id: 123, text: 'test text'}}
    ));

    // fill form and click button
    // expect that the new chirp is at the top
  })
});
