import React from 'react';
import { resetIdCounter, useCombobox } from 'downshift';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';
import { useSearchProductsLazyQuery } from '../types/generated-queries';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
export const Search = () => {
  const router = useRouter();
  const [findItems, { data, error, loading }] = useSearchProductsLazyQuery({
    fetchPolicy: 'no-cache',
  });

  const findItemsButChill = debounce(findItems, 350);

  resetIdCounter();
  const items = data?.searchTerms || [];
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      void router.push({
        pathname: `/product/${selectedItem.id}`,
      });
    },
    itemToString(item) {
      return item?.name || '';
    },
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an Item',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              key={item.id}
              {...getItemProps({ item, index })}
              highlighted={index === highlightedIndex}
            >
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
                width='50'
              />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry, No items found for ${inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
};
