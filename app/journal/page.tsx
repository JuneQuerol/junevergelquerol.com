import Link from "next/link"
import type { Metadata } from "next"

/*
 * JOURNAL WORKFLOW SYSTEM
 * =======================
 * 
 * This journal follows a structured workflow for consistent daily entries:
 * 
 * 1. DAILY STRUCTURE:
 *    - Current Focus: Today's main activities and achievements
 *    - Recent Achievements: Weekly/ongoing accomplishments  
 *    - Learning & Development: Current skill development areas
 *    - Daily Reflections: Today's insights and key takeaways
 *    - Past Journal Entries: Historical chronological entries
 * 
 * 2. ENTRY CREATION WORKFLOW:
 *    Step 1: Update "Current Focus" section with today's date and activities
 *    Step 2: Add specific tasks, challenges, and technical achievements
 *    Step 3: Update "Daily Reflections" with insights and key takeaways
 *    Step 4: Move previous day's "Current Focus" to "Past Journal Entries"
 *    Step 5: Update "Recent Achievements" if new weekly accomplishments exist
 * 
 * 3. CONTENT CATEGORIES:
 *    - Technical: Development, debugging, system administration
 *    - Professional: Training, meetings, leadership activities
 *    - Academic: Coursework, research, studies
 *    - Personal Development: Skills, certifications, learning
 * 
 * 4. ENTRY COMPONENTS:
 *    - Date and activity type badge
 *    - Main activity description with bullet points
 *    - Technical challenges/achievements (color-coded boxes)
 *    - Daily reflection with key insights
 * 
 * 5. ARCHIVAL SYSTEM:
 *    - Past entries maintain chronological order (newest first)
 *    - Each entry preserves: date, activities, challenges, reflections
 *    - Categories: Training Day, Development Sprint, Research Day, etc.
 * 
 * 6. MAINTENANCE SCHEDULE:
 *    - Daily: Update Current Focus and Reflections
 *    - Weekly: Review and update Recent Achievements
 *    - Monthly: Archive older entries, update Learning & Development
 * 
 * 7. CONTENT GUIDELINES:
 *    - Be specific about technical implementations
 *    - Include measurable achievements
 *    - Note key learnings and insights
 *    - Maintain professional tone while being personal
 *    - Link activities to broader professional goals
 */

export const metadata: Metadata = {
  title: "Daily Journal - June Vergel Querol",
  description: "Daily reflections, achievements, and learning journey of June Vergel Querol",
  generator: "v0.dev",
  openGraph: {
    title: "Daily Journal - June Vergel Querol",
    description: "Daily reflections, achievements, and learning journey",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Journal - June Vergel Querol",
    description: "Daily reflections, achievements, and learning journey",
  },
}

export default function JournalPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-5 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-orange-500 transition-colors mb-6"
          >
            ← Back to Portfolio
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-4">
            Daily Journal
          </h1>
          <p className="text-lg text-muted-foreground">
            Reflections, achievements, and continuous learning journey
          </p>
        </div>

        {/* 
          JOURNAL ENTRIES STRUCTURE
          ========================
          1. Current Focus - TODAY'S ACTIVITIES (Update daily)
          2. Recent Achievements - WEEKLY/ONGOING (Update weekly) 
          3. Learning & Development - CURRENT SKILLS (Update monthly)
          4. Daily Reflections - TODAY'S INSIGHTS (Update daily)
          5. Past Journal Entries - ARCHIVED ENTRIES (Move from Current Focus)
        */}
        <div className="space-y-8">
          {/* 
            CURRENT FOCUS SECTION
            ====================
            WORKFLOW: Update daily with today's main activities
            - Change date to current date
            - Update activity badge (Training Day, Development Sprint, etc.)
            - Replace main activity description
            - Update bullet points with specific tasks
            - Update technical challenge/achievement box
          */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Current Focus</h2>
            <div className="p-6 border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Today's Activities</h3>
                  <p className="text-sm text-muted-foreground">September 13, 2025</p>
                </div>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">Website Optimization</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  <p><strong>Comprehensive SEO Optimization</strong> - Complete search engine optimization overhaul for enhanced visibility</p>
                </div>
                <div className="pl-5 space-y-2 text-sm text-muted-foreground">
                  <p>• <strong>Sitemap Enhancement:</strong> Expanded XML sitemap with all 16 utility tools and proper metadata</p>
                  <p>• <strong>Robots.txt Optimization:</strong> Enhanced with bot-specific directives and crawler management</p>
                  <p>• <strong>Structured Data Implementation:</strong> Added JSON-LD schemas for software, utilities, and personal information</p>
                  <p>• <strong>Metadata Optimization:</strong> Updated OpenGraph and Twitter Card metadata across all pages</p>
                  <p>• <strong>Content SEO:</strong> Keyword-optimized titles, descriptions, and professional positioning</p>
                  <p>• <strong>Portfolio Content Update:</strong> Removed current job references for professional flexibility</p>
                </div>
                
                <div className="mt-6 p-4 border-l-4 border-green-500 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Technical Achievements</h4>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    <p className="text-sm">Successfully implemented comprehensive website optimization using Claude Code - demonstrating advanced AI-assisted development capabilities for rapid SEO implementation and content management</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 
            RECENT ACHIEVEMENTS SECTION
            ===========================
            WORKFLOW: Update weekly with significant accomplishments
            - Add new achievements to appropriate category (Technical/Academic)
            - Keep 4-6 most recent items in each category
            - Remove older items or move to Past Entries if historically significant
            - Update timeframe labels (This Week, Last Week, etc.)
          */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Recent Achievements</h2>
            <div className="space-y-4">
              <div className="p-6 border rounded-lg bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">Technical Accomplishments</h3>
                  <span className="text-xs text-green-600 dark:text-green-400">This Week</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    <p className="text-sm">Successfully deployed portfolio website using Next.js and Cloudflare tunnels</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    <p className="text-sm">Reorganized technical skills section for better visual hierarchy and user experience</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    <p className="text-sm">Enhanced professional summary with comprehensive skill coverage</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    <p className="text-sm">Implemented responsive design improvements across all portfolio sections</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300">Academic & Professional</h3>
                  <span className="text-xs text-purple-600 dark:text-purple-400">Ongoing</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                    <p className="text-sm">Advanced progress in MS Computer Engineering coursework at Mapua University</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                    <p className="text-sm">Continued legal studies in Juris Doctor program at University of Cagayan Valley</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                    <p className="text-sm">Successfully coordinated ICT infrastructure upgrades across multiple institutions</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 
            LEARNING & DEVELOPMENT SECTION
            ==============================
            WORKFLOW: Update monthly with current focus areas
            - Review and update skill categories (Technical, Governance)
            - Add new learning areas or remove completed ones
            - Keep descriptions current and relevant
            - Align with professional development goals
          */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Learning & Development</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-lg bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
                <h3 className="text-lg font-semibold mb-4 text-amber-700 dark:text-amber-300">Technical Skills</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <p className="text-sm font-medium">Advanced Next.js Optimization</p>
                      <p className="text-xs text-muted-foreground">Performance improvements and best practices</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <p className="text-sm font-medium">AI Integration Strategies</p>
                      <p className="text-xs text-muted-foreground">Educational platform enhancement with AI tools</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <p className="text-sm font-medium">Cloud Infrastructure Scaling</p>
                      <p className="text-xs text-muted-foreground">Enterprise-level deployment strategies</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border rounded-lg bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20">
                <h3 className="text-lg font-semibold mb-4 text-teal-700 dark:text-teal-300">Governance & Management</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <p className="text-sm font-medium">COBIT Framework Implementation</p>
                      <p className="text-xs text-muted-foreground">IT governance best practices</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <p className="text-sm font-medium">ITIL 4 Service Management</p>
                      <p className="text-xs text-muted-foreground">Modern IT service delivery approaches</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <p className="text-sm font-medium">Educational Technology Integration</p>
                      <p className="text-xs text-muted-foreground">Curriculum enhancement through technology</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 
            DAILY REFLECTIONS SECTION
            =========================
            WORKFLOW: Update daily with insights and takeaways
            - Update "Today's Insights" with current date
            - Replace reflection content with today's learnings
            - Keep "Looking Ahead" goals current (review weekly)
            - Focus on actionable insights and professional growth
          */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Daily Reflections</h2>
            <div className="space-y-4">
              <div className="p-6 border rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900/20 dark:to-slate-800/20">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold">Today's Insights</h3>
                  <span className="text-xs text-muted-foreground">September 13, 2025</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Today's comprehensive SEO optimization work demonstrated the powerful synergy between technical expertise 
                  and AI-assisted development. Using Claude Code for systematic website enhancement showcased how modern 
                  development workflows can achieve professional-grade results efficiently while maintaining attention to detail.
                </p>
                <p className="text-sm text-muted-foreground">
                  Key takeaway: Strategic portfolio positioning requires both technical optimization and content flexibility. 
                  Removing current job references while highlighting expertise creates professional adaptability. The SEO 
                  implementation covering sitemap, structured data, and metadata optimization positions the website for 
                  enhanced search visibility and professional discovery.
                </p>
              </div>

              <div className="p-6 border rounded-lg bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">Looking Ahead</h3>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400">Goals</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></span>
                    <p className="text-sm">Complete advanced optimization of the portfolio website architecture</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></span>
                    <p className="text-sm">Develop comprehensive ICT strategy document for institutional review</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></span>
                    <p className="text-sm">Advance thesis research with new methodological approaches</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></span>
                    <p className="text-sm">Explore AI integration opportunities in educational technology platforms</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 
            PAST JOURNAL ENTRIES SECTION
            ============================
            WORKFLOW: Archive completed daily entries here
            - Move yesterday's "Current Focus" content here as new entry
            - Maintain chronological order (newest entries first)
            - Preserve complete entry: date, activities, challenges, reflections
            - Use consistent structure: header, activities, technical boxes, reflection
            - Archive older entries (keep ~10-15 most recent)
            
            ENTRY TEMPLATE:
            - Header: Title, Date, Activity Badge
            - Activities: Main activity + bullet points
            - Technical Box: Challenge/Achievement with color coding
            - Reflection: Key insights and learnings
          */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Past Journal Entries</h2>
            <div className="space-y-6">
              {/* September 5, 2025 Entry */}
              <div className="p-6 border rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900/20 dark:to-slate-800/20">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Leadership Training & Technical Challenges</h3>
                    <p className="text-sm text-muted-foreground">September 5, 2025</p>
                  </div>
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">Training Day</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                    <p><strong>Middle Manager Leadership Training</strong> - Attended comprehensive leadership development program</p>
                  </div>
                  <div className="pl-5 space-y-2 text-sm text-muted-foreground">
                    <p>• <strong>Responsibility:</strong> Understanding accountability frameworks and leadership responsibilities</p>
                    <p>• <strong>Accountability:</strong> Building systems for transparent and effective management</p>
                    <p>• <strong>Mindfulness:</strong> Developing awareness and intentional decision-making practices</p>
                    <p>• <strong>Spirituality:</strong> Integrating values-based leadership approaches</p>
                    <p>• <strong>Bridges through Dialog:</strong> Enhanced communication and conflict resolution skills</p>
                    <p>• <strong>Internal Auditor ISO 9001:2015 Reorientation:</strong> Quality management systems audit refresher</p>
                  </div>
                  
                  <div className="mt-4 p-4 border-l-4 border-amber-500 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-lg">
                    <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">Technical Challenge Addressed</h4>
                    <div className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                      <p className="text-sm">Investigated FontAwesome loading issues in institutional Moodle LMS - identified theme compatibility problems affecting icon rendering across multiple educational platforms</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <h4 className="font-semibold mb-2">Daily Reflection</h4>
                  <p className="text-sm text-muted-foreground">
                    The leadership training provided valuable insights into balancing technical expertise with management responsibilities. 
                    The combination of soft skills development and technical problem-solving reinforced the importance of holistic 
                    professional development. Key learning: effective leaders must bridge technical solutions with human-centered approaches.
                  </p>
                </div>
              </div>

              {/* August 28-30, 2025 Entry */}
              <div className="p-6 border rounded-lg bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Portfolio Development & Deployment</h3>
                    <p className="text-sm text-muted-foreground">August 28-30, 2025</p>
                  </div>
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">Development Sprint</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                    <p><strong>Portfolio Website Launch</strong> - Complete development and deployment of professional portfolio</p>
                  </div>
                  <div className="pl-5 space-y-2 text-sm text-muted-foreground">
                    <p>• <strong>Technology Stack:</strong> Next.js 15.2.4, TypeScript, Tailwind CSS</p>
                    <p>• <strong>Infrastructure:</strong> Cloudflare tunnels for secure access</p>
                    <p>• <strong>Features:</strong> 16 utility tools, responsive design, dark mode support</p>
                    <p>• <strong>Content:</strong> Comprehensive professional experience and skills showcase</p>
                    <p>• <strong>Performance:</strong> Optimized for speed and SEO best practices</p>
                  </div>
                  
                  <div className="mt-4 p-4 border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Technical Achievement</h4>
                    <div className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <p className="text-sm">Successfully integrated 16 utility tools including QR Generator, JSON Formatter, Password Generator, and educational calculators - creating a comprehensive developer and productivity toolkit</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-green-100 dark:bg-green-800 rounded-lg">
                  <h4 className="font-semibold mb-2">Project Reflection</h4>
                  <p className="text-sm text-muted-foreground">
                    This portfolio project demonstrated the power of modern web development workflows. The integration of utility tools 
                    with professional showcase content creates value for both personal branding and community service. 
                    Key insight: combining technical demonstration with practical utility enhances portfolio impact and user engagement.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

/*
 * QUICK REFERENCE - DAILY JOURNAL UPDATE PROCESS
 * ===============================================
 * 
 * DAILY UPDATE CHECKLIST:
 * □ 1. Update "Current Focus" date to today
 * □ 2. Change activity badge to match today's work
 * □ 3. Replace main activity description
 * □ 4. Update bullet points with specific tasks
 * □ 5. Update technical challenge/achievement box
 * □ 6. Update "Daily Reflections" date and content
 * □ 7. Move yesterday's "Current Focus" to "Past Journal Entries"
 * 
 * WEEKLY UPDATE CHECKLIST:
 * □ 1. Review and update "Recent Achievements"
 * □ 2. Update timeframe labels (This Week, Last Week)
 * □ 3. Review "Looking Ahead" goals
 * 
 * MONTHLY UPDATE CHECKLIST:
 * □ 1. Update "Learning & Development" focus areas
 * □ 2. Archive older entries (keep 10-15 recent)
 * □ 3. Review and update professional development goals
 * 
 * ACTIVITY BADGE OPTIONS:
 * - Website Optimization, Training Day, Development Sprint
 * - Research Day, Meeting Day, Academic Work
 * - System Administration, Debugging Session, Planning Day
 * 
 * TECHNICAL BOX COLOR CODES:
 * - Green: Achievements, Successes, Completed Features
 * - Amber: Challenges, Issues, Work in Progress  
 * - Blue: Technical Implementations, New Features
 * - Red: Critical Issues, Urgent Problems
 * - Purple: Research, Learning, Documentation
 */