export function PortfolioContent() {
  return (
    <div className="space-y-16">
      {/* About Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8">About Me</h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p className="text-gray-700 dark:text-gray-300">
            Versatile technology leader and educator with 7+ years of experience bridging academia and industry through 
            innovative ICT solutions and comprehensive educational program management. Experienced in leading 
            technology initiatives at educational institutions, while pursuing advanced studies in both Computer Engineering (MS) and Law (JD).
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Expertise spans from hands-on technical implementation—including cloud infrastructure, enterprise platforms, 
            and AI tools—to strategic academic leadership in curriculum design, research crafting, and community extension 
            programs. Proven track record in tech-transfer initiatives, process optimization, and building robust ICT 
            frameworks that enhance educational outcomes and operational efficiency.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Committed to advancing computer engineering education through outcome-based approaches, industry partnerships, 
            and cutting-edge technology integration that prepares students for evolving digital challenges.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Technical Expertise</h2>
        
        {/* Skills Overview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">🚀</span>
              </div>
              <h3 className="text-lg font-semibold">Development</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Full-stack web development with modern frameworks</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded text-xs">React</span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded text-xs">Next.js</span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded text-xs">TypeScript</span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded text-xs">Node.js</span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded text-xs">Python</span>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-center">
                <span className="text-white font-bold">☁️</span>
              </div>
              <h3 className="text-lg font-semibold">Cloud & Enterprise</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Enterprise platforms and cloud infrastructure management</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200 rounded text-xs">Azure</span>
              <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200 rounded text-xs">Office 365</span>
              <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200 rounded text-xs">Moodle</span>
              <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200 rounded text-xs">WordPress</span>
              <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200 rounded text-xs">AWS</span>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center">
                <span className="text-white font-bold">🎯</span>
              </div>
              <h3 className="text-lg font-semibold">Leadership & Education</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Academic program coordination and technology governance</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 rounded text-xs">Curriculum Design</span>
              <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 rounded text-xs">Project Mgmt</span>
              <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 rounded text-xs">ISO 9001</span>
              <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 rounded text-xs">COBIT</span>
            </div>
          </div>
        </div>

        {/* Detailed Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 text-sm uppercase tracking-wide">Development Stack</h4>
            <div className="space-y-1 text-sm">
              <p>React & Next.js • TypeScript</p>
              <p>Tailwind CSS • HTML5/CSS3</p>
              <p>Node.js • Python</p>
              <p>Google APIs • Microsoft APIs</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-emerald-600 dark:text-emerald-400 text-sm uppercase tracking-wide">Cloud & Platforms</h4>
            <div className="space-y-1 text-sm">
              <p>Azure Admin • Office 365 Dev</p>
              <p>Google Workspace Admin</p>
              <p>DigitalOcean • Cloudflare</p>
              <p>WordPress • Moodle LMS</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-purple-600 dark:text-purple-400 text-sm uppercase tracking-wide">AI & Automation</h4>
            <div className="space-y-1 text-sm">
              <p>GitHub Mastery • Claude Code</p>
              <p>ChatGPT CLI • Gemini CLI</p>
              <p>Mayan EDMS • NextCloud</p>
              <p>Process Design • Form Creation</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-amber-600 dark:text-amber-400 text-sm uppercase tracking-wide">Leadership & Creative</h4>
            <div className="space-y-1 text-sm">
              <p>Curriculum Design • OBE</p>
              <p>Research • Seminar Speaking</p>
              <p>Adobe Creative Suite</p>
              <p>CAD • 3D Printing</p>
            </div>
          </div>
        </div>
      </section>

      {/* IT Governance & Standards Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8">IT Governance & Standards</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <h3 className="text-lg font-semibold">COBIT Framework</h3>
            </div>
            <p className="text-sm text-muted-foreground">IT Governance and Management</p>
          </div>
          
          <div className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <h3 className="text-lg font-semibold">ITIL 4</h3>
            </div>
            <p className="text-sm text-muted-foreground">IT Service Management</p>
          </div>
          
          <div className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <h3 className="text-lg font-semibold">ISO 9001:2015 QMS</h3>
            </div>
            <p className="text-sm text-muted-foreground">Quality Management Systems</p>
          </div>
          
          <div className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <h3 className="text-lg font-semibold">CMO 87 s. 2017</h3>
            </div>
            <p className="text-sm text-muted-foreground">Educational Standards</p>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Certifications & Qualifications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <h3 className="text-lg font-semibold">ISO Internal Auditor 9001:2015</h3>
            </div>
            <p className="text-sm text-muted-foreground">Quality Management Systems Internal Auditing</p>
          </div>
          
          <div className="p-4 border rounded-lg bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <h3 className="text-lg font-semibold">Certified Computer Engineer (ICpEP)</h3>
            </div>
            <p className="text-sm text-muted-foreground">Institute of Computer Engineers of the Philippines</p>
          </div>
          
          <div className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <h3 className="text-lg font-semibold">Civil Service Professional</h3>
            </div>
            <p className="text-sm text-muted-foreground">Civil Service Commission Philippines</p>
          </div>
          
          <div className="p-4 border rounded-lg bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
              <h3 className="text-lg font-semibold">Licensed Professional Teacher</h3>
            </div>
            <p className="text-sm text-muted-foreground">Professional Regulation Commission • 2020 - Present</p>
          </div>
          
          <div className="p-4 border rounded-lg bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
              <h3 className="text-lg font-semibold">TESDA CSS NCII</h3>
            </div>
            <p className="text-sm text-muted-foreground">Computer System Servicing National Certificate II</p>
          </div>
        </div>
      </section>

      {/* Education & Continuing Studies */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Education & Continuing Studies</h2>
        <div className="space-y-6">
          <div className="p-6 border-l-4 border-purple-600 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold">Juris Doctor</h3>
                <p className="text-lg text-purple-600 font-medium">University of Cagayan Valley</p>
              </div>
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">2024 - Present</span>
            </div>
            <p className="text-sm text-muted-foreground">Legal education program focusing on law, jurisprudence, and legal practice to complement technical expertise with legal knowledge.</p>
          </div>
          
          <div className="p-6 border-l-4 border-blue-600 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold">Master of Science in Computer Engineering</h3>
                <p className="text-lg text-blue-600 font-medium">Mapua University</p>
              </div>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">2020 - Present</span>
            </div>
            <p className="text-sm text-muted-foreground">Advanced studies in computer engineering, focusing on cutting-edge technologies and research methodologies.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                <h3 className="text-lg font-semibold">COBIT Framework</h3>
              </div>
              <p className="text-sm text-muted-foreground">IT Governance and Management Framework</p>
            </div>
            
            <div className="p-4 border rounded-lg bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
                <h3 className="text-lg font-semibold">ITIL 4</h3>
              </div>
              <p className="text-sm text-muted-foreground">IT Service Management Best Practices</p>
            </div>
            
            <div className="p-4 border rounded-lg bg-gradient-to-r from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-violet-600 rounded-full"></div>
                <h3 className="text-lg font-semibold">Education Units</h3>
              </div>
              <p className="text-sm text-muted-foreground">Professional Teaching Development</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Experience</h2>
        <div className="space-y-8">
          <div className="border-l-4 border-orange-500 pl-6">
            <h3 className="text-2xl font-semibold">Computer Engineering Program Coordinator & ICT Head</h3>
            <p className="text-sm text-muted-foreground mb-3">College of Information Technology and Engineering • 2024 - 2025</p>
            <ul className="space-y-1 text-sm">
              <li>• Coordinated Computer Engineering program while serving as ICT Head</li>
              <li>• Balanced dual responsibilities of academic program leadership and ICT management</li>
              <li>• Continued curriculum development and faculty coordination</li>
              <li>• Initiated ICT strategy implementation across the institution</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-green-500 pl-6">
            <h3 className="text-2xl font-semibold">Program Coordinator</h3>
            <p className="text-sm text-muted-foreground mb-3">College of Information Technology and Engineering • 2019 - 2024</p>
            <ul className="space-y-1 text-sm">
              <li>• Coordinated Computer Engineering program (2019-2020, 2021-2024)</li>
              <li>• Managed both IT and Computer Engineering programs simultaneously (2020-2021)</li>
              <li>• Developed comprehensive curricula, managed faculty, and tracked student outcomes</li>
              <li>• Established industry partnerships and led accreditation processes</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-purple-500 pl-6">
            <h3 className="text-2xl font-semibold">Instructor</h3>
            <p className="text-sm text-muted-foreground mb-3">Educational Institutions • 2018 - 2019</p>
            <ul className="space-y-1 text-sm">
              <li>• Taught computer engineering and information technology courses</li>
              <li>• Developed innovative teaching methodologies for technical subjects</li>
              <li>• Mentored students in programming, system design, and project development</li>
              <li>• Contributed to curriculum enhancement and educational technology integration</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-3">ICT Infrastructure Management</h3>
            <p className="text-sm mb-4">
              Comprehensive ICT strategy implementation across multiple educational institutions, 
              including network administration, cybersecurity protocols, and digital learning platforms.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                Network Administration
              </span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                Cybersecurity
              </span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                LMS Implementation
              </span>
            </div>
          </div>
          
          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Academic Program Coordination</h3>
            <p className="text-sm mb-4">
              Flexible leadership in program coordination, managing Computer Engineering exclusively 
              or both IT and Computer Engineering programs simultaneously based on institutional needs.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                Curriculum Design
              </span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                Program Coordination
              </span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                Industry Partnerships
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}