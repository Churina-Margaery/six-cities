import { SortTypes } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { sortTypeChange } from '../../store/action';

function SortChoice(): JSX.Element {
  const optionActive = useAppSelector((state) => state.activeSort);
  const dispatch = useAppDispatch();

  const handleSortTypeChange = (sortType: string) => {
    dispatch(sortTypeChange(sortType));
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {optionActive}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {SortTypes.map((sortType, id) => {
          const keyValue = `key-${id}`;
          return (
            <li key={keyValue}
              className={`places__option ${optionActive === sortType && 'places__option--active'}`}
              tabIndex={0}
              onClick={() => handleSortTypeChange(sortType)}
            >
              {sortType}
            </li>);
        })}
      </ul>
    </form>
  );
}

export default SortChoice;
