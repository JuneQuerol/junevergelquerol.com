import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Citation Generator - June Vergel Querol",
  description: "Generate citations in APA, MLA, Chicago, and Harvard styles for books, journals, websites, and more",
  keywords: "citation generator, APA citation, MLA citation, Chicago citation, Harvard citation, academic writing, bibliography, reference generator",
  openGraph: {
    title: "Citation Generator - Generate Academic Citations",
    description: "Free citation generator supporting APA, MLA, Chicago, and Harvard citation styles. Perfect for academic research and writing.",
    images: ["/professional-id.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Citation Generator - Academic Citation Tool",
    description: "Generate properly formatted citations in APA, MLA, Chicago, and Harvard styles with our free citation generator."
  }
}

export default function CitationGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}