import * as React from "react";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TemplateProps,
} from "@yext/pages";
import "../index.css";
import {
  SearchBar,
  UniversalResults,
  onSearchFunc,
} from "@yext/search-ui-react";
import PageLayout from "../components/PageLayout";
import { useSearchActions } from "@yext/search-headless-react";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

export const getPath: GetPath<TemplateProps> = () => {
  return "search";
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: `Search Results`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const Search: Template<TemplateRenderProps> = ({ __meta, document }) => {
  React.useEffect(() => {
    if (document.meta.locale !== "en") {
      i18n.changeLanguage("de");
    }
  }, []);
  return (
    <PageLayout data={{}} templateData={{ __meta, document }}>
      <SearchInner />
    </PageLayout>
  );
};

export const SearchInner: React.FC = () => {
  const { t } = useTranslation();

  const searchActions = useSearchActions();
  // function which will be run when a search is executed
  const handleSearch: onSearchFunc = (searchEventData) => {
    const { query } = searchEventData;
    searchActions.setQuery(query);
    searchActions.executeUniversalQuery();
    const queryParams = new URLSearchParams(window.location.search);
    if (query) {
      queryParams.set("query", query);
    } else {
      queryParams.delete("query");
    }
    history.pushState(null, "", "?" + queryParams.toString());
  };

  //hook to execute a search if necessary based on the query param in the url
  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get("query");
    if (query) {
      searchActions.setQuery(query);
      searchActions.executeUniversalQuery();
    }
  }, []);

  const placeHolderText = t("Search...");

  return (
    <div className="px-4 py-8">
      <div className="mx-auto flex max-w-5xl flex-col">
        <SearchBar placeholder={placeHolderText} onSearch={handleSearch} />
        <UniversalResults verticalConfigMap={{ faqs: { label: "FAQs" } }} />
      </div>
    </div>
  );
};

export default Search;
