import React from 'react';
import { Collection } from './Collection';
import './index.scss';

const cats = [
  { name: 'All' },
  { name: 'Sea' },
  { name: 'Mountains' },
  { name: 'Architecture' },
  { name: 'Cities' },
];

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);
    const category = categoryId ? `category=${categoryId}` : '';
    fetch(`https://641c1b8a1f5d999a44719729.mockapi.io/photos?page=${page}&limit=3&${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert('Warning!');
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>My photo collection</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, index) => (
            <li
              onClick={() => setCategoryId(index)}
              className={categoryId === index ? 'active' : ''}
              key={obj.name}>
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Search by name"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          collections
            .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((obj, index) => <Collection key={index} name={obj.name} images={obj.photos} />)
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, index) => (
          <li
            className={page === index + 1 ? 'active' : ''}
            onClick={() => setPage(index + 1)}
            key={index}>
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
