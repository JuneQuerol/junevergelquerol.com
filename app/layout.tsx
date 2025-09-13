import type React from "react"
import Footer from "./components/footer"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import StructuredData from "./components/structured-data"


export const metadata = {
  title: {
    default: "June Vergel Querol - Technology Leader & Computer Engineer",
    template: "%s - June Vergel Querol"
  },
  description: "Professional portfolio of June Vergel Querol - Technology leader and computer engineer specializing in educational technology, web development, and digital transformation.",
  keywords: ["June Vergel Querol", "ICT Head", "Part-time Instructor", "Educational Technology", "Web Development", "Digital Transformation", "Computer Engineering", "Philippines", "Tuguegarao"],
  authors: [{ name: "June Vergel Querol", url: "https://junevergelquerol.com" }],
  creator: "June Vergel Querol",
  publisher: "June Vergel Querol",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://junevergelquerol.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://junevergelquerol.com",
    title: "June Vergel Querol - Technology Leader & Computer Engineer",
    description: "Professional portfolio and utilities by June Vergel Querol - Technology leader and computer engineer.",
    siteName: "June Vergel Querol Portfolio",
    images: [
      {
        url: "https://junevergelquerol.com/professional-id.png",
        width: 1200,
        height: 630,
        alt: "June Vergel Querol - Professional Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@JuneQuerol",
    creator: "@JuneQuerol",
    title: "June Vergel Querol - Technology Leader & Computer Engineer",
    description: "Professional portfolio and utilities by June Vergel Querol - Technology leader and computer engineer.",
    images: ["https://junevergelquerol.com/professional-id.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "ca-pub-4225764258903216",
  },
}


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical resources to prevent FOUC */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          as="style"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />

        {/* Prevent Flash of Incorrect Theme and FOUC */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Apply theme immediately to prevent flash
              var theme = localStorage.getItem('theme') || 'system';
              var isDark = theme === 'dark' || (theme === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
              if (isDark) {
                document.documentElement.classList.add('dark');
              }
              // Remove any no-js classes if they exist
              document.documentElement.classList.remove('no-js');
            })()
          `
        }} />
        {/* Google Funding Choices (Consent Management Platform) */}
        <script
          async
          src="https://fundingchoicesmessages.google.com/i/pub-4225764258903216?ers=1"
          nonce="cChcWwqLzr2g5Elo-1sClA"
        ></script>
        <script
          nonce="cChcWwqLzr2g5Elo-1sClA"
          dangerouslySetInnerHTML={{
            __html: `(function() {
              function signalGooglefcPresent() {
                if (!window.frames['googlefcPresent']) {
                  if (document.body) {
                    const iframe = document.createElement('iframe');
                    iframe.style.cssText = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;';
                    iframe.style.display = 'none';
                    iframe.name = 'googlefcPresent';
                    document.body.appendChild(iframe);
                  } else {
                    setTimeout(signalGooglefcPresent, 0);
                  }
                }
              }
              signalGooglefcPresent();
            })()`
          }}
        />

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `
          }}
        />
        
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4225764258903216"
          crossOrigin="anonymous"
        ></script>
        
        {/* Structured Data */}
        <StructuredData 
          type="website" 
          data={{}} 
        />
        <StructuredData 
          type="person" 
          data={{}} 
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
