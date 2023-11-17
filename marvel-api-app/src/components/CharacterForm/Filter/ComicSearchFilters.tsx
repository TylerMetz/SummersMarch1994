import { useState } from 'react';
import './ComicSearchFilters.scss'

type ComicSearchFiltersProps = {
  onFilterChange: (filter: { orderBy: string, includeVariants: boolean }) => void;
};

const ComicSearchFilters = ({ onFilterChange }: ComicSearchFiltersProps) => {
  const [selectedOrderBy, setSelectedOrderBy] = useState<string>('');
  const [selectedIncludeVariants, setSelectedIncludeVariants] = useState<boolean>(false);

  const handleOrderByChange = (orderBy: string) => {
    setSelectedOrderBy(orderBy);
    onFilterChange({
      orderBy,
      includeVariants: selectedIncludeVariants,
    });
  };

  const handleIncludeVariantsChange = () => {
    const includeVariants = !selectedIncludeVariants;
    setSelectedIncludeVariants(includeVariants);
    onFilterChange({
      orderBy: selectedOrderBy,
      includeVariants,
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
        <input
          type="checkbox"
          checked={selectedIncludeVariants}
          onChange={handleIncludeVariantsChange}
        />
      </label>
    </div>
  );
};

export default ComicSearchFilters;
