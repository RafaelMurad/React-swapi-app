import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import api from "./api";

class App extends React.Component {
  state = {
    characters: [],
    selectedCharacter: null,
    films: [],
  };

  async componentDidMount() {
    const response = await api.get("/people");
    this.setState({ characters: response.data.results });
  }

  async characterSelector(index) {
    await this.setState({
      selectedCharacter: this.state.characters[index],
      films: [],
    });
    this.state.characters[index].films.forEach((film) => {
      this.getFilms(film);
    });
  }

  async getFilms(film) {
    const filmContent = await axios.get(film).then((result) => result.data);
    this.setState({ films: [...this.state.films, filmContent] });
  }

  render() {
    const { characters, selectedCharacter, films } = this.state;

    return (
      <div className="container d-flex flex-direction-row">
        <div className="card p-4 m-3 shadow bg-light">
          <h1>List of Characters</h1>
          <div>
            <ul className="list-group" style={{ cursor: "pointer" }}>
              {characters.map((character, index) => (
                <li
                  key={character.name}
                  onClick={() => this.characterSelector(index)}
                  className={
                    selectedCharacter &&
                    selectedCharacter.name === character.name
                      ? "list-group-item active"
                      : "list-group-item"
                  }
                >
                  {character.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card p-4 m-3 shadow bg-light">
          {selectedCharacter ? (
            <>
              <h1>{selectedCharacter.name} - List of films</h1>
              <ul className="list-group border-round">
                {films.map((film, index) => (
                  <li className="list-group-item" key={index}>
                    {film.title}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h1>Select a character</h1>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default App;
