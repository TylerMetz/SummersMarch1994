import { useState } from 'react';
import './ComicSearchFilters.scss'

type ComicSearchFiltersProps = {
  onFilterChange: (filter: { orderBy: string, includeVariants: boolean }) => void;
};

const ComicSearchFilters = ({ onFilterChange }: ComicSearchFiltersProps) => {
  const [selectedOrderBy, setSelectedOrderBy] = useState('');

  const handleOrderByChange = (orderBy: string) => {
    setSelectedOrderBy(orderBy);
    onFilterChange({
      orderBy,
      includeVariants: false
    });
  };

  return (
    <div>
      <label>
        Order By Filter:
        <select
          value={selectedOrderBy}
          onChange={(e) => handleOrderByChange(e.target.value)}
          >
            <option value={''}>None</option>
            <option value={'onSaleDate'}>On Sale Date</option>
            <option value={'focDate'}>FOC(Final Order Cutoff) Date</option>
            <option value={'title'}>Title</option>
            <option value={'issueNumber'}>Issue Number</option>
            <option value={'-onSaleDate'}>- On Sale Date</option>
            <option value={'-focDate'}>- FOC(Final Order Cutoff) Date</option>
            <option value={'-title'}>- Title</option>
            <option value={'-issueNumber'}>- Issue Number</option>
          </select>
      </label>
      <label>
       Include Variants:
        <select
          value={selectedOrderBy}
          onChange={(e) => handleOrderByChange(e.target.value)}
          >
            <option value={'true'}>True</option>
            <option value={'false'}>False</option>
          </select>
      </label>
    </div>
  );
};

export default ComicSearchFilters;
