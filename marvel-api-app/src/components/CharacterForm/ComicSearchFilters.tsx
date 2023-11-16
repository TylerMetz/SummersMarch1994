import { useState } from 'react';

type ComicSearchFiltersProps = {
  onFilterChange: (filter: { orderBy: string }) => void;
};

const ComicSearchFilters = ({ onFilterChange }: ComicSearchFiltersProps) => {
  const [selectedOrderBy, setSelectedOrderBy] = useState('');

  const handleOrderByChange = (orderBy: string) => {
    setSelectedOrderBy(orderBy);
    onFilterChange({ orderBy });
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          name="orderBy"
          value="onsaleDate"
          checked={selectedOrderBy === 'onsaleDate'}
          onChange={() => handleOrderByChange('onsaleDate')}
        />
        On Sale Date
      </label>
      <label>
        <input
          type="radio"
          name="orderBy"
          value="focDate"
          checked={selectedOrderBy === 'focDate'}
          onChange={() => handleOrderByChange('focDate')}
        />
        Foc Date
      </label>
      <label>
        <input
          type="radio"
          name="orderBy"
          value="title"
          checked={selectedOrderBy === 'title'}
          onChange={() => handleOrderByChange('title')}
        />
        Title
      </label>
      <label>
        <input
          type="radio"
          name="orderBy"
          value="issueNumber"
          checked={selectedOrderBy === 'issueNumber'}
          onChange={() => handleOrderByChange('issueNumber')}
        />
        Issue Number
      </label>
    </div>
  );
};

export default ComicSearchFilters;
