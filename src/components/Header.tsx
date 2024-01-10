import * as React from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { formatPhoneNumber } from "react-phone-number-input";
import { Image } from "@yext/pages-components";
import { Link } from "@yext/pages-components";
import { useSearchActions } from "@yext/search-headless-react";
import { SearchBar, onSearchFunc } from "@yext/search-ui-react";

export interface HeaderProps {
  data?: {
    locale: string;
  };
}

const Header = ({ data }: HeaderProps) => {
  const locale = data?.locale;
  const handleSearch: onSearchFunc = (searchEventData) => {
    const { query } = searchEventData;
    window.location.href = `/search?query=${query}&locale=${locale}`;
  };

  return (
    <header className="" style={{ background: `var(--backgroundColor)` }}>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center gap-x-12">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-12 sm:h-24 w-auto rounded-md"
              src="https://static.vecteezy.com/system/resources/thumbnails/002/412/377/small/coffee-cup-logo-coffee-shop-icon-design-free-vector.jpg"
              alt=""
            />
          </a>
        </div>
        <SearchBar
          onSearch={handleSearch}
          customCssClasses={{
            searchBarContainer: "mb-0 w-3/4 md:w-1/3",
          }}
          placeholder={locale == "de" ? "Suchen..." : "Search..."}
        />
      </nav>
    </header>
  );
};

export default Header;
