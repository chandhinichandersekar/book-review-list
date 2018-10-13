import React from 'react';
import './App.css';
const superagent = require('superagent');


async function getBooks(query) {
  return new Promise(resolve => {
    superagent.get('https://find-books-by-title-author-or-isbn-ztnewtvsrs9y.runkit.sh/').query({ ...query }).then(res => {
      resolve(res.body);
    })
  });
}

export class BookRows extends React.Component {

  render() {
    const bookRows = this.props.books.map(book => {
      return (
        <tr key={book.title}>
          <td>{book.title}</td>
          <td>{book.author}</td>
        </tr>
      )
    })
    return bookRows;
  }
}


class BookTable extends React.Component {

  render() {
    return (
      <table>
        <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
        </tr>
        </thead>
        <tbody>
        <BookRows books={this.props.books} />
        </tbody>
      </table>
    )
  }
}

class SearchField extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('this.state.value)', this.state.value);
    this.props.handleSubmit(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          Search Parameters:
          <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      books: [],
      value: ''
    };
  }

  handleSubmit(text) {
    console.log('tesasdf', text);
    this.updateBooks({
      text
    });
  }

  async updateBooks(query) {
    const books = await getBooks(query);
    this.setState({
      books
    });
  }

  async componentDidMount() {
    this.updateBooks({
      text: 'ch'
    })
  }
  render() {
   // const query = { text: "ch" };
    return (
      <div>
        <SearchField handleSubmit={this.handleSubmit.bind(this)}/>
        <BookTable books={this.state.books} />
      </div>
    )
  }

}

export default App;

