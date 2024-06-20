import { MetadataRoute } from "next";

const baseUrl = "https://tempero-tech.vercel.app/";

const paths = [
  "",
  "about",
  "my-account",
  "my-favorite-restaurants",
  "my-orders",
  "categories",
  "products",
  "restaurants",
  "signIn",
  "terms-and-conditions",
];

const dynamicPaths = [
  "categories/[id]/products",
  "products/[id]/recommended",
  "restaurants/[id]/recommended",
  "restaurants/[id]",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = paths.map((path) => ({
    url: `${baseUrl}/${path}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const dynamicPathsData = dynamicPaths.map((path) => ({
    url: `${baseUrl}/${path.replace(/\[id\]/g, "1")}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPaths, ...dynamicPathsData];
}
