import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages-components";
import { TemplateProps } from "@yext/pages";
import {
  Environment,
  HeadlessConfig,
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import { getRuntime } from "@yext/pages/util";
import i18n from "../i18n";

export interface PageLayoutProps {
  children?: React.ReactNode;
  data?: any;
  templateData: TemplateProps;
}

const PageLayout = ({ children, data, templateData }: PageLayoutProps) => {
  // set locale based on the locale provided by the pages system
  const runtime = getRuntime();
  let locale = templateData.document?.meta?.locale;
  if (locale !== "en") {
    i18n.changeLanguage("de");
  }
  if (!runtime.isServerSide) {
    const searchParams = new URLSearchParams(window?.location.search);
    const localeParam = searchParams.get("lang");
    locale = localeParam;
  }

  const searchConfig: HeadlessConfig = {
    apiKey: "e3377abbf6e20d714caa16c4c4eb7007",
    experienceKey: "calvins-coffee-search",
    locale: locale,
    experienceVersion: "STAGING",
    environment: Environment.SANDBOX,
  };
  const searcher = provideHeadless(searchConfig);

  return (
    <>
      <SearchHeadlessProvider searcher={searcher}>
        <AnalyticsProvider templateData={templateData}>
          <div className="min-h-screen flex flex-col">
            <AnalyticsScopeProvider name="header">
              <Header data={data} />
            </AnalyticsScopeProvider>
            {children}
            <AnalyticsScopeProvider name="footer">
              <Footer />
            </AnalyticsScopeProvider>
          </div>
        </AnalyticsProvider>
      </SearchHeadlessProvider>
    </>
  );
};

export default PageLayout;
