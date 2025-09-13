import type { Metadata } from "next"
import Footer from "../components/footer"

export const metadata: Metadata = {
  title: "Contact June Vergel Querol - Technology Leader & Computer Engineer | Professional Inquiries",
  description: "Get in touch with June Vergel Querol for professional inquiries, educational technology consulting, web development projects, and ICT governance implementations. Based in Tuguegarao City, Cagayan, Philippines.",
  keywords: "contact June Vergel Querol, ICT consulting, educational technology consulting, web development services, digital transformation, Philippines, professional inquiries, technology consulting",
  openGraph: {
    title: "Contact June Vergel Querol - Technology Leader & Computer Engineer",
    description: "Get in touch with June Vergel Querol for professional inquiries, educational technology consulting, and web development projects.",
    images: ["/professional-id.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact June Vergel Querol - Technology Leader & Computer Engineer",
    description: "Get in touch with June Vergel Querol for professional inquiries, educational technology consulting, and web development projects."
  },
}

export default function ContactPage() {
  return (
    <main>
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-5 py-4">
          <div className="flex justify-between items-center">
            <a href="/" className="font-semibold text-lg hover:text-blue-600 transition-colors">
              June Vergel Querol
            </a>
            <div className="flex gap-3">
              <a 
                href="/utilities" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                🛠️ Utilities
              </a>
              <a 
                href="/journal" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                📝 Daily Journal
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-4">
              Contact Me
            </h1>
            <p className="text-xl text-muted-foreground">
              Let's connect and discuss opportunities, collaborations, or just say hello!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Email</h3>
                    <p className="text-muted-foreground">Best way to reach me</p>
                    <a 
                      href="mailto:cpejune@gmail.com" 
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      cpejune@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Location</h3>
                    <p className="text-muted-foreground">Based in</p>
                    <p>Tuguegarao City, Cagayan, Philippines</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💼</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Professional</h3>
                    <p className="text-muted-foreground">Current Role</p>
                    <p>Technology Leader & Computer Engineer</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🔗</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">GitHub</h3>
                    <p className="text-muted-foreground">Check out my projects</p>
                    <a 
                      href="https://github.com/JuneQuerol" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      github.com/JuneQuerol
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Areas */}
            <div>
              <h2 className="text-2xl font-bold mb-6">How Can I Help?</h2>
              <div className="grid gap-4">
                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold mb-2">🎓 Education & Training</h3>
                  <p className="text-sm text-muted-foreground">
                    Computer engineering curriculum development, educational technology integration, 
                    training programs, and academic consulting.
                  </p>
                </div>

                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold mb-2">💻 ICT Consulting</h3>
                  <p className="text-sm text-muted-foreground">
                    ICT infrastructure planning, technology governance, digital transformation, 
                    and IT strategy development.
                  </p>
                </div>

                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold mb-2">🚀 Web Development</h3>
                  <p className="text-sm text-muted-foreground">
                    Modern web applications using React, Next.js, TypeScript, and cloud platforms. 
                    Full-stack development and API integration.
                  </p>
                </div>

                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold mb-2">🤝 Collaboration</h3>
                  <p className="text-sm text-muted-foreground">
                    Open source projects, research partnerships, community extension programs, 
                    and knowledge sharing initiatives.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">🕒 Response Time</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  I typically respond to emails within 24-48 hours during weekdays.
                </p>
                <p className="text-sm text-muted-foreground">
                  For urgent matters, please indicate "URGENT" in your subject line.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-16 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Let's Build Something Amazing</h2>
              <p className="text-muted-foreground mb-8">
                Whether you're looking for technical expertise, educational partnerships, or just want to 
                connect with a fellow technology enthusiast, I'd love to hear from you.
              </p>
              <div className="flex justify-center gap-4">
                <a 
                  href="mailto:cpejune@gmail.com"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  📧 Send Email
                </a>
                <a 
                  href="/"
                  className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  👤 View Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}