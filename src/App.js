import React from 'react';
import './App.css';
const superagent = require('superagent');


async function getBooks(query) {
  return new Promise(resolve => {
    superagent.get('https://find-books-by-title-author-or-isbn-ztnewtvsrs9y.runkit.sh/').query({...query}).then(res => {
      resolve(res.body);
    })
  });
}

export class BookRowsStateless extends React.Component {

  render() {
    const bookRows = this.props.books.map(book => {
      return (
        <tr>
          <td>{book.title}</td>
          <td>{book.author}</td>
        </tr>
      )
    })
    return bookRows;
}
}

export class BookRows extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      books: []
    };
  }

  async componentDidMount() {
      const books = await getBooks(this.props.query);
      this.setState({
        books
      });
  }

  render() {
    if (this.state.books.length) {
      return (
        <BookRowsStateless books={this.state.books} />
      );
    } else {
      return null;
    }
  }
}

class BookTable extends React.Component {

  render() {
    return (
      <table>
        <tr>
          <th>Title</th>
          <th>Author</th>
        </tr>
        <BookRows query = {this.props.query} />
      </table>
    )
  }
}

function App() {
  const query = {text:"ch"};
  return (
  <div>
    <SearchField />
    <BookTable query = {query} />
    </div>
    )
}

class SearchField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  handleChange (event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
       <label>
          Search Parameters:
          <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)}/>
        </label>
        <input type="submit" value="Submit" />
      </form> 
    )
  }
}

export default App;

