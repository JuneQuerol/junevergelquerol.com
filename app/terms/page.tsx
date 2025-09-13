import type { Metadata } from "next"
import Footer from "../components/footer"

export const metadata: Metadata = {
  title: "Terms of Service - June Vergel Querol",
  description: "Terms of Service for junevergelquerol.com - Rules and guidelines for using our website and utilities",
}

export default function TermsPage() {
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
        <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
          <h1>Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <h2>Agreement to Terms</h2>
          <p>
            By accessing and using junevergelquerol.com ("the Website"), you accept and agree to be bound by the 
            terms and provision of this agreement. If you do not agree with any of these terms, you should not 
            use this website.
          </p>

          <h2>Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials on junevergelquerol.com for 
            personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
          </ul>

          <h2>Website Content and Services</h2>
          
          <h3>Personal Portfolio</h3>
          <p>
            This website serves as a personal portfolio showcasing professional experience, skills, and projects. 
            All information is provided for informational purposes.
          </p>

          <h3>Online Utilities</h3>
          <p>
            We provide various online utilities including but not limited to:
          </p>
          <ul>
            <li>QR Code Generator</li>
            <li>Password Generator</li>
            <li>Color Picker</li>
            <li>Unit Converter</li>
            <li>Base64 Encoder/Decoder</li>
          </ul>
          <p>
            These utilities are provided "as is" without any warranties. We do not store or have access to any 
            data you input into these tools, as all processing happens in your browser.
          </p>

          <h2>User Responsibilities</h2>
          <p>As a user of this website, you agree to:</p>
          <ul>
            <li>Use the website and its utilities for lawful purposes only</li>
            <li>Not attempt to gain unauthorized access to any part of the website</li>
            <li>Not use the website to distribute malware or harmful content</li>
            <li>Respect intellectual property rights</li>
            <li>Not interfere with the website's operation or security</li>
          </ul>

          <h2>Privacy and Data Protection</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website, 
            to understand our practices regarding the collection and use of your information.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            The website and its original content, features, and functionality are owned by June Vergel Querol and are 
            protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>

          <h2>Third-Party Links and Services</h2>
          <p>
            Our website may contain links to third-party websites or services that are not owned or controlled by us. 
            We have no control over and assume no responsibility for the content, privacy policies, or practices of any 
            third-party websites or services.
          </p>

          <h2>Advertising</h2>
          <p>
            This website may display advertisements served by Google AdSense or other advertising networks. 
            These advertisements are governed by the respective advertising networks' terms of service.
          </p>

          <h2>Disclaimers</h2>
          <p>
            The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, 
            this website excludes all representations, warranties, conditions and terms, whether express or implied.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            In no event shall June Vergel Querol or its suppliers be liable for any damages (including, without limitation, 
            damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use 
            the materials on this website.
          </p>

          <h2>Modifications</h2>
          <p>
            We may revise these Terms of Service at any time without notice. By using this website, you are agreeing to 
            be bound by the current version of these Terms of Service.
          </p>

          <h2>Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of the Philippines, 
            and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>

          <h2>Contact Information</h2>
          <p>If you have any questions about these Terms of Service, please contact us at:</p>
          <p>
            Email: cpejune@gmail.com<br />
            Website: junevergelquerol.com
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}