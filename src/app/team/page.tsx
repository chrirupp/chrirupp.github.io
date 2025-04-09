import teamData from '@/content/team.json';
import Image from 'next/image';
import { SiGooglescholar } from 'react-icons/si';

interface TeamMember {
  name: string;
  degree: string;
  image: string | null;
  website: string | null;
  googleScholar: string | null;
  startYear?: number;
  coSupervisors: string | null;
}

interface TeamData {
  currentStudents: TeamMember[];
  alumni: TeamMember[];
}

const typedTeamData = teamData as TeamData;

function PlaceholderImage({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
      <span className="text-2xl font-semibold text-gray-600">{initials}</span>
    </div>
  );
}

function WebsiteButton({ url }: { url: string }) {
  return (
    <a
      href={url}
      className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200 transition-colors mt-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
      </svg>
      Website
    </a>
  );
}

function GoogleScholarButton({ url }: { url: string }) {
  const fullUrl = `https://scholar.google.com/citations?user=${url}&hl=en`;
  return (
    <a
      href={fullUrl}
      className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200 transition-colors mt-2 ml-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      <SiGooglescholar className="w-3 h-3 mr-1" />
      Scholar
    </a>
  );
}

function TeamMemberImage({ member }: { member: TeamMember }) {
  if (member.image) {
    return (
      <div className="w-24 h-24 relative rounded-full overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
          sizes="(max-width: 96px) 100vw, 96px"
        />
      </div>
    );
  }

  return <PlaceholderImage name={member.name} />;
}

export default function Team() {
  // Sort current students by startYear (descending) and then by name (alphabetically)
  const sortedCurrentStudents = [...typedTeamData.currentStudents].sort((a, b) => {
    const yearDiff = (b.startYear || 0) - (a.startYear || 0);
    if (yearDiff !== 0) return yearDiff;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Team</h1>

      <div className="prose max-w-none">
        <p className="text-gray-600 mb-6">
          Interested in joining our team as a PhD student? You can apply through one of the following routes:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li>
            <a href="https://www.ox.ac.uk/admissions/graduate/courses/dphil-computer-science" 
               className="text-blue-600 hover:text-blue-800" 
               target="_blank" 
               rel="noopener noreferrer">
              DPhil in Computer Science
            </a>
          </li>
          <li>
            <a href="https://www.ox.ac.uk/admissions/graduate/courses/autonomous-intelligent-machines-and-systems" 
               className="text-blue-600 hover:text-blue-800" 
               target="_blank" 
               rel="noopener noreferrer">
              Autonomous Intelligent Machines and Systems CDT
            </a>
          </li>
          <li>
            <a href="https://www.ox.ac.uk/admissions/graduate/courses/fundamentals-of-ai" 
               className="text-blue-600 hover:text-blue-800" 
               target="_blank" 
               rel="noopener noreferrer">
              Fundamentals of AI CDT
            </a>
          </li>
        </ul>
      </div>

      {/* Current Students */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Current Students</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCurrentStudents.map((student, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <TeamMemberImage member={student} />
                <div>
                  <h3 className="text-xl font-medium mb-1">{student.name}</h3>
                  <p className="text-gray-600">
                    {student.degree} {student.startYear && `(${student.startYear}-)`}
                  </p>
                  {student.coSupervisors && (
                    <p className="text-sm text-gray-500 mt-1">
                      with {student.coSupervisors}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {student.website && <WebsiteButton url={student.website} />}
                    {student.googleScholar && <GoogleScholarButton url={student.googleScholar} />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Alumni */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Alumni</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {typedTeamData.alumni.map((alum, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <TeamMemberImage member={alum} />
                <div>
                  <h3 className="text-xl font-medium mb-1">{alum.name}</h3>
                  <p className="text-gray-600">{alum.degree}</p>
                  {alum.coSupervisors && (
                    <p className="text-sm text-gray-500 mt-1">
                      with {alum.coSupervisors}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {alum.website && <WebsiteButton url={alum.website} />}
                    {alum.googleScholar && <GoogleScholarButton url={alum.googleScholar} />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 