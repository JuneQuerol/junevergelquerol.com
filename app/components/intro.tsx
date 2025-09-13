import Image from "next/image"

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <div className="flex flex-col md:flex-row items-center gap-8 w-full">
        <div className="flex-shrink-0">
          <Image
            src="/professional-id.png"
            alt="June Vergel Querol - Technology Leader & Computer Engineer"
            width={200}
            height={200}
            className="rounded-full object-cover shadow-lg border-4 border-gray-100 dark:border-gray-800"
            priority
          />
        </div>
        <div className="flex-grow">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-tight text-center md:text-left">
            June Vergel Querol
          </h1>
          <div className="text-center md:text-left mt-5 space-y-2">
            <p className="text-xl font-medium text-muted-foreground">
              Technology Leader & Computer Engineer
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                📍 Tuguegarao City, Cagayan
              </span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              <a
                href="https://github.com/JuneQuerol"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                GitHub
              </a>
              <a
                href="mailto:cpejune@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
