import React from 'react';
import './App.css';
const superagent = require('superagent');


async function getBooks() {
  return new Promise(resolve => {
    superagent.get('https://find-books-by-title-author-or-isbn-ztnewtvsrs9y.runkit.sh/').then(res => {
      resolve(res.body);
    })
  });
}

export class BookRowsStateless extends React.Component {

  constructor(props) {
    super(props);
  }

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
      const books = await getBooks();
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
        <BookRows />
      </table>
    )
  }
}

export default BookTable;
