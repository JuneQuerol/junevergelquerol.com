interface StructuredDataProps {
  type: 'person' | 'website' | 'article' | 'organization' | 'software' | 'utility'
  data: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  let schema = {}

  switch (type) {
    case 'person':
      schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "June Vergel Querol",
        "jobTitle": "Technology Leader & Computer Engineer",
        "description": "Technology leader and educator specializing in educational technology, web development, and digital transformation",
        "url": "https://junevergelquerol.com",
        "email": "cpejune@gmail.com",
        "alumniOf": [
          {
            "@type": "EducationalOrganization",
            "name": "Mapua University"
          },
          {
            "@type": "EducationalOrganization", 
            "name": "University of Cagayan Valley"
          }
        ],
        "knowsAbout": [
          "Computer Engineering",
          "Information Technology",
          "Web Development",
          "Educational Technology",
          "Digital Transformation",
          "React",
          "Next.js",
          "TypeScript"
        ],
        "sameAs": [
          "https://github.com/JuneQuerol"
        ],
        ...data
      }
      break

    case 'website':
      schema = {
        "@context": "https://schema.org",
        "@type": "Website",
        "name": "June Vergel Querol Portfolio",
        "url": "https://junevergelquerol.com",
        "description": "Professional portfolio and utilities by June Vergel Querol - ICT Head, Part-time Instructor, and technology leader",
        "author": {
          "@type": "Person",
          "name": "June Vergel Querol"
        },
        "publisher": {
          "@type": "Person",
          "name": "June Vergel Querol"
        },
        ...data
      }
      break

    case 'article':
      schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "author": {
          "@type": "Person",
          "name": "June Vergel Querol"
        },
        "publisher": {
          "@type": "Person",
          "name": "June Vergel Querol"
        },
        ...data
      }
      break

    case 'organization':
      schema = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        ...data
      }
      break

    case 'software':
      schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "applicationCategory": "WebApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "author": {
          "@type": "Person",
          "name": "June Vergel Querol"
        },
        "publisher": {
          "@type": "Person",
          "name": "June Vergel Querol"
        },
        ...data
      }
      break

    case 'utility':
      schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "author": {
          "@type": "Person",
          "name": "June Vergel Querol",
          "url": "https://junevergelquerol.com"
        },
        "publisher": {
          "@type": "Person",
          "name": "June Vergel Querol"
        },
        "isAccessibleForFree": true,
        "url": "https://junevergelquerol.com",
        ...data
      }
      break
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}