import { Intro } from "./components/intro"
import { PortfolioContent } from "./components/portfolio-content"
import Footer from "./components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "June Vergel Querol - Technology Leader & Computer Engineer | Professional Portfolio",
  description: "June Vergel Querol's professional portfolio - Technology leader and computer engineer specializing in educational technology, web development, and digital transformation. Explore free online utilities and tools.",
  keywords: "June Vergel Querol, ICT Head, Part-time Instructor, Computer Engineer, Educational Technology, Web Development, Digital Transformation, Free Online Tools, Utilities, Philippines, Tuguegarao",
  openGraph: {
    title: "June Vergel Querol - Technology Leader & Computer Engineer",
    description: "Professional portfolio featuring educational technology expertise, web development projects, and free online utilities for productivity and development.",
    images: ["/professional-id.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "June Vergel Querol - Technology Leader & Computer Engineer",
    description: "Professional portfolio featuring educational technology expertise, web development projects, and free online utilities for productivity and development.",
    images: ["/professional-id.png"]
  },
}

export default function Page() {
  return (
    <main>
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-5 py-4">
          <div className="flex justify-between items-center">
            <div className="font-semibold text-lg">June Vergel Querol</div>
            <div className="flex gap-3">
              <a 
                href="/journal" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                📝 Daily Journal
              </a>
              <a 
                href="/utilities" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                🛠️ Utilities
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-5">
        <Intro />
        <PortfolioContent />
      </section>
      <Footer />
    </main>
  )
}
