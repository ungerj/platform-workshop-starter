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
import { SearchBar, UniversalResults } from "@yext/search-ui-react";
import PageLayout from "../components/PageLayout";

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
  return (
    <PageLayout data={{}} templateData={{ __meta, document }}>
      <div className="px-4 py-8">
        <div className="mx-auto flex max-w-5xl flex-col">
          <SearchBar placeholder="Search..." />
          <UniversalResults verticalConfigMap={{ faqs: { label: "FAQs" } }} />
        </div>
      </div>
    </PageLayout>
  );
};

export default Search;
