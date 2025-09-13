export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-5">
        <div className="py-16">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/utilities" className="text-muted-foreground hover:text-foreground transition-colors">
                    Utilities
                  </a>
                </li>
                <li>
                  <a href="/journal" className="text-muted-foreground hover:text-foreground transition-colors">
                    Journal
                  </a>
                </li>
              </ul>
            </div>

            {/* Utilities Links */}
            <div>
              <h4 className="font-semibold mb-4">Utilities</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/utilities/qr-generator" className="text-muted-foreground hover:text-foreground transition-colors">
                    QR Generator
                  </a>
                </li>
                <li>
                  <a href="/utilities/color-picker" className="text-muted-foreground hover:text-foreground transition-colors">
                    Color Picker
                  </a>
                </li>
                <li>
                  <a href="/utilities/password-generator" className="text-muted-foreground hover:text-foreground transition-colors">
                    Password Generator
                  </a>
                </li>
                <li>
                  <a href="/utilities/unit-converter" className="text-muted-foreground hover:text-foreground transition-colors">
                    Unit Converter
                  </a>
                </li>
                <li>
                  <a href="/utilities/base64-converter" className="text-muted-foreground hover:text-foreground transition-colors">
                    Base64 Converter
                  </a>
                </li>
                <li>
                  <a href="/utilities/json-formatter" className="text-muted-foreground hover:text-foreground transition-colors">
                    JSON Formatter
                  </a>
                </li>
                <li>
                  <a href="/utilities/url-encoder" className="text-muted-foreground hover:text-foreground transition-colors">
                    URL Encoder
                  </a>
                </li>
                <li>
                  <a href="/utilities/hash-generator" className="text-muted-foreground hover:text-foreground transition-colors">
                    Hash Generator
                  </a>
                </li>
                <li>
                  <a href="/utilities/word-counter" className="text-muted-foreground hover:text-foreground transition-colors">
                    Word Counter
                  </a>
                </li>
                <li>
                  <a href="/utilities/case-converter" className="text-muted-foreground hover:text-foreground transition-colors">
                    Case Converter
                  </a>
                </li>
                <li>
                  <a href="/utilities/text-cleaner" className="text-muted-foreground hover:text-foreground transition-colors">
                    Text Cleaner
                  </a>
                </li>
                <li>
                  <a href="/utilities/lorem-generator" className="text-muted-foreground hover:text-foreground transition-colors">
                    Lorem Generator
                  </a>
                </li>
                <li>
                  <a href="/utilities/grade-calculator" className="text-muted-foreground hover:text-foreground transition-colors">
                    Grade Calculator
                  </a>
                </li>
                <li>
                  <a href="/utilities/study-timer" className="text-muted-foreground hover:text-foreground transition-colors">
                    Study Timer
                  </a>
                </li>
                <li>
                  <a href="/utilities/research-helper" className="text-muted-foreground hover:text-foreground transition-colors">
                    Research Helper
                  </a>
                </li>
                <li>
                  <a href="/utilities/citation-generator" className="text-muted-foreground hover:text-foreground transition-colors">
                    Citation Generator
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>

              <h4 className="font-semibold mt-6 mb-4">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://github.com/JuneQuerol" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:cpejune@gmail.com"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} June Vergel Querol. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
