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
          <td>{book.average_rating}</td>
        </tr>
      )
    })
    return bookRows;
  }
}


class BookTable extends React.Component {

  render() {
    return (
      <table id="booklist">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Average Rating</th>
          </tr>
        </thead>
        <tbody>
          <BookRows books={this.props.books} />
        </tbody>
      </table>
    )
  }
}

export class SearchField extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <label>
        Enter text to search:
          <input type="text" value={this.props.value} onChange={this.handleChange.bind(this)} />
      </label>
    )
  }
}

export class Pagination extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }


  render() {
    return (
        <label>
          Pagination Parameters:
          <input type="number" value={this.props.value} onChange={this.handleChange.bind(this)} />
        </label>
    )
  }
}

export class SearchType extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
        <label>
          Choose a search type parameter:
        <select value={this.props.value} onChange={this.handleChange.bind(this)}>
            <option value="all">all</option>
            <option value="author">author</option>
            <option value="title">title</option>
          </select>
        </label>
    )
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      books: [],
      query: {
        text: 'ch',
        page: '',
        search: ''
      }
    };
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.search();
  }

  async search() {
    const books = await getBooks(this.state.query);
    this.setState({
      books
    });
  }

  handleText(text) {
    this.setState({
      query: {
        ...this.state.query,
        text
      }
    });
  }

  handlePage(page) {
    this.setState({
      query: {
        ...this.state.query,
        page
      }
    });
  }

  handleSearch(search) {
    this.setState({
      query: {
        ...this.state.query,
        search
      }
    });
  }


  async componentDidMount() {
    this.search()
  }
  render() {
    // const query = { text: "ch" };
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <SearchField onChange={this.handleText.bind(this)} value={this.state.query.text}/>
          <Pagination onChange={this.handlePage.bind(this)} value={this.state.query.page}/>
          <SearchType onChange={this.handleSearch.bind(this)} value={this.state.query.search}/>
          <input type="submit" value="submit"></input>
        </form>
        <BookTable books={this.state.books} />
      </div>
    )
  }

}

export default App;

