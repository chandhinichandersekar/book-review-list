import React from 'react';
import ReactDOM from 'react-dom';
import App, { BookRows, BookRowsStateless } from './App';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import toJson from 'enzyme-to-json';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('when app is rendered with shallow', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(
      <App />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})

describe('when bookrows is rendered with shallow', () => {
  describe('before component has mounted', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(
        <BookRows />
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});

describe('when BookRowsStateless is rendered with shallow', () => {
  describe('before component has mounted', () => {
    it('should match the snapshot', () => {
      const books = [{"title":"ANIMAL FARM (AB)","author":"George Orwell"},{"title":"Ardil-22 (Catch-22, # 1)","author":"Joseph Heller"},{"title":"A Tale of Two Cities","author":"Charles Dickens"},{"title":"Fields of Elysium (Fields of Elysium, #1)","author":"A.B. Whelan"},{"title":"14 Days to Die","author":"A.B. Whelan"},{"title":"Cornelsen Senior English Library - Literatur: Ab 11. Schuljahr - Never let me go: Textband mit Annotationen und Zusatztexten","author":"Kazuo Ishiguro"},{"title":"A Leste do Éden (Vol I e II)","author":"John Steinbeck"},{"title":"Atlas wirft die Welt ab","author":"Ayn Rand"},{"title":"The Way West (The Big Sky, #2)","author":"A.B. Guthrie Jr."},{"title":"Hart van Inkt (Inkt, #1)","author":"Cornelia Funke"},{"title":"The Big Sky (The Big Sky, #1)","author":"A.B. Guthrie Jr."},{"title":"As Sick as Our Secrets","author":"A.B. Whelan"},{"title":"AB de Villiers - The Autobiography","author":"A.B. de Villiers"},{"title":"Oliver Twist ( Ab 11 J.).","author":"Charles Dickens"},{"title":"Don Quixote [illustrated]","author":"Miguel de Cervantes Saavedra"},{"title":"Insel der blauen Delfine. CD. ( Ab 8 J.)","author":"Scott O'Dell"},{"title":"A Streetcar Named Desire. Ab 11. Schuljahr","author":"Tennessee Williams"},{"title":"A mulher de Jerusalém","author":"A.B. Yehoshua"},{"title":"The Lover","author":"A.B. Yehoshua"},{"title":"O misterioso caso de Styles","author":"Agatha Christie"}]
      const wrapper = shallow(
        <BookRowsStateless books={books} />
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
