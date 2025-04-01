import profileData from '@/content/profile.json';
import newsData from '@/content/news.json';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';

export default function Home() {
  // Get the 5 most recent news items
  const latestNews = newsData.newsItems.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-gray-200">
            <Image
              src="/images/profile.jpg"
              alt={profileData.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{profileData.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{profileData.title}</p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {profileData.department}<br />
              {profileData.university}
            </p>
            <div className="flex justify-center space-x-6 mt-4">
              <a
                href={profileData.socialLinks.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                title="Google Scholar"
              >
                <SiGooglescholar className="w-6 h-6" />
              </a>
              <a
                href={profileData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                title="GitHub"
              >
                <FaGithub className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
        <div className="space-y-4">
          {latestNews.map((news, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{news.title}</h3>
                  <p className="text-gray-600 mt-1">{news.description}</p>
                  {news.links && (
                    <div className="mt-2 space-x-2">
                      {news.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          {link.text} →
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-sm text-gray-500">{news.date}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-right">
          <a href="/news" className="text-blue-600 hover:text-blue-800">
            View all news →
          </a>
        </div>
      </section>

      {/* Research Interests */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Research Interests</h2>
        <p className="text-gray-600 mb-6">
          My research focuses on computer vision and machine learning, with particular emphasis on unsupervised learning, 3D reconstruction, and visual understanding. I am part of the Visual Geometry Group <a href="http://www.robots.ox.ac.uk/~vgg/">(VGG)</a>   at the University of Oxford.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Primary Areas</h3>
            <ul className="list-disc list-inside text-gray-600">
              {profileData.researchAreas.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
