import { useState } from 'react';
import './ComicSearchFilters.scss';

type ComicSearchFiltersProps = {
  onFilterChange: (filter: {
    orderBy: string;
    dateDescriptor: string;
    includeVariants: boolean;
  }) => void;
};

const ComicSearchFilters = ({ onFilterChange }: ComicSearchFiltersProps) => {
  const [selectedOrderBy, setSelectedOrderBy] = useState<string>('');
  const [selectedDateDescriptor, setSelectedDateDescriptor] = useState<string>('');
  const [selectedIncludeVariants, setSelectedIncludeVariants] =
    useState<boolean>(false);

  const handleOrderByChange = (orderBy: string) => {
    setSelectedOrderBy(orderBy);
    onFilterChange({
      orderBy,
      dateDescriptor: selectedDateDescriptor,
      includeVariants: selectedIncludeVariants,
    });
  };

  const handleDateDescriptorChange = (dateDescriptor: string) => {
    setSelectedDateDescriptor(dateDescriptor);
    onFilterChange({
      orderBy: selectedOrderBy,
      dateDescriptor,
      includeVariants: selectedIncludeVariants,
    });
  };

  const handleIncludeVariantsChange = () => {
    const includeVariants = !selectedIncludeVariants;
    setSelectedIncludeVariants(includeVariants);
    onFilterChange({
      orderBy: selectedOrderBy,
      dateDescriptor: selectedDateDescriptor,
      includeVariants,
    });
  };

  return (
    <div>
      <label>
        Order By Filter:
        <select
          value={selectedOrderBy}
          onChange={(e) => handleOrderByChange(e.target.value)}>
          <option value={''}>None</option>
          <option value={'onsaleDate'}>On Sale Date</option>
          <option value={'focDate'}>FOC(Final Order Cutoff) Date</option>
          <option value={'title'}>Title</option>
          <option value={'issueNumber'}>Issue Number</option>
          <option value={'-onsaleDate'}>- On Sale Date</option>
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
      <label>
        Date Descriptor:
        <select
          value={selectedDateDescriptor}
          onChange={(e) => handleDateDescriptorChange(e.target.value)}>
          <option value={''}>None</option>
          <option value={'lastWeek'}>Last Week</option>
          <option value={'thisWeek'}>This Week</option>
          <option value={'nextWeek'}>Next Week</option>
          <option value={'thisMonth'}>This Month</option>
        </select>
      </label>
    </div>
  );
};

export default ComicSearchFilters;
