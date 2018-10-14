import React from 'react';
import ReactDOM from 'react-dom';
import App, { BookRows, SearchField, Pagination, SearchType } from './App';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import toJson from 'enzyme-to-json';

const books = [{ "title": "ANIMAL FARM (AB)", "author": "George Orwell", "average_rating": "4.26" }, { "title": "Ardil-22 (Catch-22, # 1)", "author": "Joseph Heller", "average_rating": "3.26" }, { "title": "A Tale of Two Cities", "author": "Charles Dickens", "average_rating": "4.16" }, { "title": "Fields of Elysium (Fields of Elysium, #1)", "author": "A.B. Whelan", "average_rating": "4.26" }, { "title": "14 Days to Die", "author": "A.B. Whelan", "average_rating": "4.26" }, { "title": "Cornelsen Senior English Library - Literatur: Ab 11. Schuljahr - Never let me go: Textband mit Annotationen und Zusatztexten", "author": "Kazuo Ishiguro", "average_rating": "4.26"  }, { "title": "A Leste do Éden (Vol I e II)", "author": "John Steinbeck", "average_rating": "4.26"  }, { "title": "Atlas wirft die Welt ab", "author": "Ayn Rand", "average_rating": "4.26"  }, { "title": "The Way West (The Big Sky, #2)", "author": "A.B. Guthrie Jr.", "average_rating": "4.26"  }, { "title": "Hart van Inkt (Inkt, #1)", "author": "Cornelia Funke", "average_rating": "4.26"  }, { "title": "The Big Sky (The Big Sky, #1)", "author": "A.B. Guthrie Jr." , "average_rating": "4.26" }, { "title": "As Sick as Our Secrets", "author": "A.B. Whelan", "average_rating": "4.26"  }, { "title": "AB de Villiers - The Autobiography", "author": "A.B. de Villiers", "average_rating": "4.26"  }, { "title": "Oliver Twist ( Ab 11 J.).", "author": "Charles Dickens", "average_rating": "4.26"  }, { "title": "Don Quixote [illustrated]", "author": "Miguel de Cervantes Saavedra", "average_rating": "4.26"  }, { "title": "Insel der blauen Delfine. CD. ( Ab 8 J.)", "author": "Scott O'Dell" , "average_rating": "4.26" }, { "title": "A Streetcar Named Desire. Ab 11. Schuljahr", "author": "Tennessee Williams" , "average_rating": "4.26" }, { "title": "A mulher de Jerusalém", "author": "A.B. Yehoshua", "average_rating": "4.26"  }, { "title": "The Lover", "author": "A.B. Yehoshua" , "average_rating": "4.26" }, { "title": "O misterioso caso de Styles", "author": "Agatha Christie", "average_rating": "4.26"  }]

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('when App is rendered with shallow', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(
      <App />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
})

describe('when BookRows is rendered with shallow', () => {
  describe('before component has mounted', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(
        <BookRows books={books} />
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});

describe('when SearchField is rendered with shallow', () => {
  const mockOnChange = jest.fn();
  const wrapper = shallow(
    <SearchField onChange={mockOnChange} value='ab'/>
  );
  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  describe('when input is changed', () => {
    it('should update the input value', () => {
      wrapper.find('input').first().simulate('change', {
        target: {
          value: 'typedSearch'
        }
      });
    expect(mockOnChange.mock.calls[0]).toMatchObject(['typedSearch']);
    });
  });
});


describe('when Pagination is rendered with shallow', () => {
  const mockOnChange = jest.fn();
  const wrapper = shallow(
    <Pagination onChange={mockOnChange} value='2'/>
  );
  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  describe('when input is changed', () => {
    it('should update the input value', () => {
      wrapper.find('input').first().simulate('change', {
        target: {
          value: '1'
        }
      });
    expect(mockOnChange.mock.calls[0]).toMatchObject(['1']);
    });
  });
});

describe('when search type is rendered with shallow', () => {
  const mockOnChange = jest.fn();
  const wrapper = shallow(
    <SearchType onChange={mockOnChange} />
  );
  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  describe('when input is changed', () => {
    it('should update the input value', () => {
      wrapper.find('select').first().simulate('change', {
        target: {
          value: 'author'
        }
      });
    expect(mockOnChange.mock.calls[0]).toMatchObject(['author']);
    });
  });
});