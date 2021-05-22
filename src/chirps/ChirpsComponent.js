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
  }

  serverUrl() {
    return process.env.REACT_APP_SERVER_URL
  }

  componentDidMount() {
    fetch(this.serverUrl() + 'chirps')
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

  render() {
    const { error, isLoaded, chirps } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {chirps.map(chirp => (
            <li key={chirp.id}>
              {chirp.id} -- {chirp.text}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default ChirpsComponent;