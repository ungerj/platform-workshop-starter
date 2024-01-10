import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import "../index.css";
import Favicon from "../assets/images/yext-favicon.ico";
import About from "../components/About";
import Banner from "../components/Banner";
import Hours from "../components/Hours";
import PageLayout from "../components/PageLayout";
import Schema from "../components/Schema";
import FAQs from "../components/FAQs";
import FeaturedProducts from "../components/FeaturedProducts";
import ImageCarousel from "../components/ImageCarousel";
import Location from "../types/autogen";

export const config: TemplateConfig = {
  stream: {
    $id: "Location",
    filter: {
      entityIds: ["calvins-coffee"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "c_tagline",
      "mainPhone",
      "description",
      "hours",
      "slug",
      "logo",
      "services",
      "photoGallery",
      "paymentOptions",
      "emails",
      "yextDisplayCoordinate",
      "c_backgroundColor",
      "c_faqs.question",
      "c_faqs.answerV2",
      "c_featuredProducts.name",
      "c_featuredProducts.primaryPhoto",
      "c_featuredProducts.richTextDescriptionV2",
    ],
    localization: {
      locales: ["en", "de"],
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
  relativePrefixToRoot,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
      {
        type: "meta", // Meta Tag (og:image)
        attributes: {
          property: "og:image",
          content: document.photoGallery
            ? document.photoGallery[0].image.url
            : null,
        },
      },
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: relativePrefixToRoot + Favicon,
        },
      },
    ],
  };
};

// TODO: Core Business component (address, phone, email)
// TODO: Typing
const Location: Template<TemplateRenderProps<Location>> = ({
  __meta,
  document,
}) => {
  const {
    name,
    address,
    hours,
    mainPhone,
    services,
    description,
    emails,
    logo,
    photoGallery,
    yextDisplayCoordinate,
    c_backgroundColor,
    c_featuredProducts,
    c_faqs,
    c_tagline,
  } = document;

  const data = {
    locale: document.meta.locale,
  };

  return (
    <>
      <Schema data={document} />
      <PageLayout data={data} templateData={{ __meta, document }}>
        <Banner name={name} tagline={c_tagline} photoGallery={photoGallery} />
        <About description={description} />
        {hours && <Hours title={"Hours"} hours={hours} />}
        <ImageCarousel title={"Gallery"} photoGallery={photoGallery} />
        <FeaturedProducts products={c_featuredProducts} title={"Products"} />
        <FAQs title={"FAQs"} faqs={c_faqs} />
      </PageLayout>
    </>
  );
};

export default Location;
