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
    this.setState({ value: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          Enter text to search:
          <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export class Pagination extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state.value);
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          Pagination Parameters:
          <input type="number" value={this.state.value} onChange={this.handleChange.bind(this)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export class SearchType extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state.value);
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
      <label>
        Choose a search type parameter:
        <select value={this.state.value} onChange={this.handleChange.bind(this)}>
          <option value="all">all</option>
          <option value="author">author</option>
          <option value="title">title</option>
        </select>
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
      query: {
        text:'', 
        page: '',
        search: ''
      }
    };
  }

  handleSubmitText(text) {
    this.updateBooks({
      ...this.state.query,
      text
    });
  }

  handleSubmitPage(page) {
    this.updateBooks({
      ...this.state.query,
      page
    });
  }

  handleSubmitSearch(search) {
    this.updateBooks({
      ...this.state.query,
      search
    });
  }

  async updateBooks(query) {
    const books = await getBooks(query);
    this.setState({
      books,
      query
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
        <SearchField handleSubmit={this.handleSubmitText.bind(this)}/>
        <Pagination handleSubmit={this.handleSubmitPage.bind(this)}/>
        <SearchType handleSubmit={this.handleSubmitSearch.bind(this)}/>
        <BookTable books={this.state.books} />
      </div>
    )
  }

}

export default App;

