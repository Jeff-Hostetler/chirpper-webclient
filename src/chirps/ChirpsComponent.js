import React from 'react'
import '../App.css';

class ChirpsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      chirps: []
    };
    this.createChirp = this.createChirp.bind(this);
  }

  componentDidMount() {
    fetch(serverUrl() + 'chirps')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            chirps: result.chirps
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  createChirp(event) {
    event.preventDefault();
    const form = event.target;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: form.elements["text"].value })
    };
    fetch(serverUrl() + 'chirps', requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          let chirps = this.state.chirps;
          chirps.unshift(result.chirp);
          form.elements["text"].value = null;
          this.setState({
            isLoaded: true,
            chirps: chirps
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, chirps } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <form onSubmit={this.createChirp}>
            <label>Make a Chirp: <input name="text" type="textarea" /></label>
            <input type="submit" value="Submit" />
          </form>
          <ul>
            {chirps.map(chirp => (
              <li key={chirp.id}>
                {chirp.id} -- {chirp.text}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

const serverUrl = () => {
  return process.env.REACT_APP_SERVER_URL
}

export default ChirpsComponent;