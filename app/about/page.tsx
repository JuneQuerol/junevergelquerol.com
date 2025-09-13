import type { Metadata } from "next"
import Footer from "../components/footer"

export const metadata: Metadata = {
  title: "About - June Vergel Querol",
  description: "Learn about June Vergel Querol - Technology leader and computer engineer",
}

export default function AboutPage() {
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
              About Me
            </h1>
            <p className="text-xl text-muted-foreground">
              Technology Leader, Educator, and Lifelong Learner
            </p>
          </div>

          <div className="space-y-16">
            {/* Main Introduction */}
            <section className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Welcome! I'm June Vergel Querol, a versatile technology leader and educator with over 7 years 
                of experience bridging academia and industry through innovative ICT solutions and comprehensive 
                educational program management.
              </p>
              <p>
                With extensive experience in educational institutions, I combine hands-on technical 
                expertise with strategic leadership to drive digital transformation and enhance educational outcomes.
              </p>
            </section>

            {/* Professional Journey */}
            <section>
              <h2 className="text-3xl font-bold mb-8">Professional Journey</h2>
              <div className="space-y-8">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold">Technology Leadership Experience</h3>
                  <p className="text-blue-600 font-medium mb-3">Technology Leader & Computer Engineer</p>
                  <p className="text-muted-foreground">
                    Experienced in leading institutional ICT strategy and digital transformation initiatives. 
                    Skilled in managing technology infrastructure across educational institutions and 
                    implementing modern educational technologies.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-semibold">Academic Leadership (2019 - 2025)</h3>
                  <p className="text-purple-600 font-medium mb-3">Program Coordinator & ICT Head</p>
                  <p className="text-muted-foreground">
                    Coordinated Computer Engineering and IT programs while serving as ICT Head. Balanced dual 
                    responsibilities of academic program leadership and ICT management, developing comprehensive 
                    curricula and establishing industry partnerships.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-semibold">Early Career (2018 - 2019)</h3>
                  <p className="text-green-600 font-medium mb-3">Instructor</p>
                  <p className="text-muted-foreground">
                    Started as an instructor teaching computer engineering and information technology courses. 
                    Developed innovative teaching methodologies and mentored students in programming and system design.
                  </p>
                </div>
              </div>
            </section>

            {/* Education & Certifications */}
            <section>
              <h2 className="text-3xl font-bold mb-8">Education & Continuous Learning</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  <h3 className="text-lg font-semibold mb-2">🎓 Current Studies</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium">Juris Doctor (2024 - Present)</p>
                      <p className="text-sm text-muted-foreground">University of Cagayan Valley</p>
                    </div>
                    <div>
                      <p className="font-medium">MS Computer Engineering (2020 - Present)</p>
                      <p className="text-sm text-muted-foreground">Mapua University</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <h3 className="text-lg font-semibold mb-2">🏆 Certifications</h3>
                  <ul className="text-sm space-y-1">
                    <li>• ISO Internal Auditor 9001:2015</li>
                    <li>• Certified Computer Engineer (ICpEP)</li>
                    <li>• Civil Service Professional</li>
                    <li>• Licensed Professional Teacher</li>
                    <li>• TESDA Computer System Servicing NCII</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Technical Expertise */}
            <section>
              <h2 className="text-3xl font-bold mb-8">Technical Expertise</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-blue-600 mb-3">💻 Development</h3>
                  <ul className="text-sm space-y-1">
                    <li>React & Next.js</li>
                    <li>TypeScript</li>
                    <li>Node.js & Python</li>
                    <li>Tailwind CSS</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-green-600 mb-3">☁️ Cloud & Enterprise</h3>
                  <ul className="text-sm space-y-1">
                    <li>Azure Administration</li>
                    <li>Office 365 Development</li>
                    <li>Google Workspace</li>
                    <li>Moodle LMS</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-purple-600 mb-3">🏢 Governance</h3>
                  <ul className="text-sm space-y-1">
                    <li>COBIT Framework</li>
                    <li>ITIL 4</li>
                    <li>ISO 9001:2015</li>
                    <li>Project Management</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Philosophy & Approach */}
            <section>
              <h2 className="text-3xl font-bold mb-8">Philosophy & Approach</h2>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-lg">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">🎯 Education</h3>
                    <p className="text-muted-foreground">
                      Committed to advancing computer engineering education through outcome-based approaches, 
                      industry partnerships, and cutting-edge technology integration that prepares students 
                      for evolving digital challenges.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">🚀 Innovation</h3>
                    <p className="text-muted-foreground">
                      Bridging the gap between theoretical knowledge and practical application through 
                      hands-on projects, real-world problem solving, and continuous exploration of 
                      emerging technologies.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Personal Touch */}
            <section>
              <h2 className="text-3xl font-bold mb-8">Beyond Technology</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>
                  When I'm not immersed in code or curriculum design, I enjoy exploring the intersection 
                  of technology and society. My pursuit of law studies reflects my interest in understanding 
                  the regulatory and ethical implications of technological advancement.
                </p>
                <p>
                  I believe in the power of community and knowledge sharing, which is why I've created 
                  this platform with free utilities and resources for fellow developers and learners.
                </p>
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center">
              <div className="bg-blue-600 text-white p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Let's Connect!</h2>
                <p className="mb-6">
                  Whether you're interested in collaboration, have questions about technology education, 
                  or just want to chat about the latest in tech, I'd love to hear from you.
                </p>
                <div className="flex justify-center gap-4">
                  <a 
                    href="/contact"
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Get In Touch
                  </a>
                  <a 
                    href="/"
                    className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
                  >
                    View Portfolio
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}