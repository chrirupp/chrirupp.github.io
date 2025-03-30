import teachingData from '@/content/teaching.json';

interface PastYear {
  year: string;
  link: string;
}

interface Course {
  name: string;
  code: string;
  description: string;
  semester: string;
  link: string;
  "past years"?: PastYear[];
}

interface TeachingData {
  currentCourses: Course[];
  pastCourses: Course[];
}

const typedTeachingData = teachingData as TeachingData;

export default function Teaching() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Teaching</h1>

      {/* Current Courses */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Current Courses</h2>
        <div className="grid gap-6">
          {typedTeachingData.currentCourses.map((course, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">
                <a href={course.link} className="hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                  {course.name}
                </a>
              </h3>
              <p className="text-gray-600 mb-4">
                {course.code} - {course.description}
              </p>
              <div className="text-sm text-gray-500">
                Semester: {course.semester}
              </div>
              {course["past years"] && course["past years"].length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Past Years:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {course["past years"].map((year, yearIndex) => (
                      <li key={yearIndex}>
                        <a href={year.link} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                          {year.year}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Past Courses */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Past Courses</h2>
        <div className="grid gap-6">
          {typedTeachingData.pastCourses.map((course, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">
                <a href={course.link} className="hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                  {course.name}
                </a>
              </h3>
              <p className="text-gray-600 mb-4">
                {course.code} - {course.description}
              </p>
              <div className="text-sm text-gray-500">
                Semester: {course.semester}
              </div>
              {course["past years"] && course["past years"].length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Past Years:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {course["past years"].map((year, yearIndex) => (
                      <li key={yearIndex}>
                        <a href={year.link} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                          {year.year}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 