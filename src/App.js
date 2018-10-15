import React from 'react';
import './App.css';
const superagent = require('superagent');

async function getBooks(query) {
  return new Promise(async resolve => {
    const request = superagent.get('https://find-books-by-title-author-or-isbn-ztnewtvsrs9y.runkit.sh/bookReviews').query({ ...query });
    try {
      const response = await request;
      resolve(response.body);
    } catch (e) {

    }
  });
}

export class BookRows extends React.Component {
  render() {
    const bookRows = this.props.books.map(book => {
      return (
        <tbody>
        <tr key={book.title}>
        <TdWithStyles>{book.title}</TdWithStyles>
        <TdWithStyles>{book.author}</TdWithStyles>
        <TdWithStyles>{book.average_rating}</TdWithStyles>
        </tr>
        </tbody>
      )
    })
    return bookRows;
  }
}

function TdWithStyles(props) {
  const styles = {
    "border": "1px solid #ddd",
    "padding": "8px",
  };
  return (
    <td style={styles}>{props.children}</td>  
  );
}

function ThWithStyles(props) {
  const styles = {
    "border": "1px solid #ddd",
    "padding": "8px",
    "paddingTop": "12px",
    "paddingBottom": "12px",
    "textAlign": "center",
    "backgroundColor": "#056593",
    color: "white"
  };
  return (
    <th style={styles}>{props.children}</th>  
  );
}

class BookTable extends React.Component {

  render() {
    const styles = {
        "borderCollapse": "collapse",
        width: "90%"
    };
    return (
      <table id="booklist" style={styles}>
        <thead>
          <tr>
            <ThWithStyles>Title</ThWithStyles>
            <ThWithStyles>Author</ThWithStyles>
            <ThWithStyles>Average Rating</ThWithStyles>
          </tr>
        </thead>
          <BookRows books={this.props.books} />
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

