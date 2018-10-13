import React from 'react';
import ReactDOM from 'react-dom';
import App, { BookRows, SearchField } from './App';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import toJson from 'enzyme-to-json';

const books = [{ "title": "ANIMAL FARM (AB)", "author": "George Orwell" }, { "title": "Ardil-22 (Catch-22, # 1)", "author": "Joseph Heller" }, { "title": "A Tale of Two Cities", "author": "Charles Dickens" }, { "title": "Fields of Elysium (Fields of Elysium, #1)", "author": "A.B. Whelan" }, { "title": "14 Days to Die", "author": "A.B. Whelan" }, { "title": "Cornelsen Senior English Library - Literatur: Ab 11. Schuljahr - Never let me go: Textband mit Annotationen und Zusatztexten", "author": "Kazuo Ishiguro" }, { "title": "A Leste do Éden (Vol I e II)", "author": "John Steinbeck" }, { "title": "Atlas wirft die Welt ab", "author": "Ayn Rand" }, { "title": "The Way West (The Big Sky, #2)", "author": "A.B. Guthrie Jr." }, { "title": "Hart van Inkt (Inkt, #1)", "author": "Cornelia Funke" }, { "title": "The Big Sky (The Big Sky, #1)", "author": "A.B. Guthrie Jr." }, { "title": "As Sick as Our Secrets", "author": "A.B. Whelan" }, { "title": "AB de Villiers - The Autobiography", "author": "A.B. de Villiers" }, { "title": "Oliver Twist ( Ab 11 J.).", "author": "Charles Dickens" }, { "title": "Don Quixote [illustrated]", "author": "Miguel de Cervantes Saavedra" }, { "title": "Insel der blauen Delfine. CD. ( Ab 8 J.)", "author": "Scott O'Dell" }, { "title": "A Streetcar Named Desire. Ab 11. Schuljahr", "author": "Tennessee Williams" }, { "title": "A mulher de Jerusalém", "author": "A.B. Yehoshua" }, { "title": "The Lover", "author": "A.B. Yehoshua" }, { "title": "O misterioso caso de Styles", "author": "Agatha Christie" }]

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
  const mockHandleSubmit = jest.fn();
  const wrapper = shallow(
    <SearchField handleSubmit={mockHandleSubmit} />
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
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
  describe('when submitted', () => {
    it('should update the input value', () => {
      wrapper.instance().handleSubmit({
        preventDefault: jest.fn()
      });
      const mockCall = mockHandleSubmit.mock.calls[0];
      expect(mockCall).toMatchObject([
        'typedSearch'
      ]);
    });
  });
});

