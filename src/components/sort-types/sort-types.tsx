import { useState } from 'react';
import React from 'react';

import { SortTypes } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { sortTypeChange } from '../../store/main-process/main-slice';
import { getActiveSort } from '../../store/main-process/selectors';


function SortChoice(): JSX.Element {
  const optionActive = useAppSelector(getActiveSort);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleSortTypeChange = (sortType: SortTypes) => {
    dispatch(sortTypeChange(sortType));
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest('.places__sorting')) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={toggleDropdown}>
        {optionActive}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen && 'places__options--opened'}`}>
        {Object.entries(SortTypes).map(([, value], id) => {
          const keyValue = `key-${id}`;
          return (
            <li key={keyValue}
              className={`places__option ${optionActive === value && 'places__option--active'}`}
              tabIndex={0}
              onClick={() => handleSortTypeChange(value)}
            >
              {value}
            </li>);
        })}
      </ul>
    </form>
  );
}

export default React.memo(SortChoice);
