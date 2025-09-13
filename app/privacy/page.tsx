import type { Metadata } from "next"
import Footer from "../components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy - June Vergel Querol",
  description: "Privacy Policy for junevergelquerol.com - How we collect, use, and protect your information",
}

export default function PrivacyPage() {
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
          <h1>Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <h2>Introduction</h2>
          <p>
            Welcome to junevergelquerol.com ("we," "our," or "us"). This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you visit our website and use our online utilities.
          </p>

          <h2>Information We Collect</h2>
          
          <h3>Automatically Collected Information</h3>
          <p>When you visit our website, we may automatically collect certain information about your device, including:</p>
          <ul>
            <li>Your web browser type and version</li>
            <li>Your operating system</li>
            <li>Your IP address</li>
            <li>The pages you visit on our site</li>
            <li>The time and date of your visit</li>
            <li>The time spent on each page</li>
            <li>Referring website addresses</li>
          </ul>

          <h3>Information You Provide</h3>
          <p>We may collect information you voluntarily provide when you:</p>
          <ul>
            <li>Use our online utilities (QR Code Generator, Password Generator, etc.)</li>
            <li>Contact us through email or contact forms</li>
            <li>Subscribe to our newsletter or updates</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the collected information for various purposes:</p>
          <ul>
            <li>To provide and maintain our website and utilities</li>
            <li>To improve user experience and website functionality</li>
            <li>To analyze website usage and optimize performance</li>
            <li>To respond to your inquiries and provide customer support</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and store certain information. 
            Cookies are files with small amounts of data that may include an anonymous unique identifier.
          </p>
          <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>

          <h2>Third-Party Services</h2>
          
          <h3>Google AdSense & Consent Management</h3>
          <p>
            We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads 
            based on your prior visits to our website or other websites.
          </p>
          <p>
            <strong>For visitors from the European Economic Area (EEA), UK, and Switzerland:</strong> We use Google's 
            certified Consent Management Platform (CMP) to collect your consent before processing personal data for 
            advertising purposes. You can:
          </p>
          <ul>
            <li>Give consent to personalized advertising</li>
            <li>Decline consent and see non-personalized ads</li>
            <li>Manage your advertising preferences at any time</li>
          </ul>
          <p>
            You may also opt out of personalized advertising by visiting Google's Ads Settings or aboutads.info.
          </p>

          <h3>Analytics</h3>
          <p>
            We may use third-party analytics services to monitor and analyze web traffic and user behavior to improve our services.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against unauthorized access, 
            alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic 
            storage is 100% secure.
          </p>

          <h2>Your Privacy Rights</h2>
          <p>Depending on your location, you may have the following rights:</p>
          <ul>
            <li>The right to access your personal information</li>
            <li>The right to rectify inaccurate personal information</li>
            <li>The right to erase your personal information</li>
            <li>The right to restrict processing of your personal information</li>
            <li>The right to data portability</li>
          </ul>

          <h2>Children's Privacy</h2>
          <p>
            Our website is not intended for children under the age of 13. We do not knowingly collect personal 
            information from children under 13.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
            the new Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
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