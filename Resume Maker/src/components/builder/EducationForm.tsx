import { useResumeStore, Education } from '@/store/useResumeStore';
import { Plus, Trash2 } from 'lucide-react';

export default function EducationForm() {
  const { education, addEducation, updateEducation, removeEducation } = useResumeStore();

  const handleChange = (id: string, field: keyof Education, value: string) => {
    updateEducation(id, { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Education</h2>
        <button
          onClick={addEducation}
          className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Education
        </button>
      </div>

      <div className="space-y-6">
        {education.map((edu) => (
          <div key={edu.id} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700 relative group">
            <button
              onClick={() => removeEducation(edu.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Institution</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleChange(edu.id, 'institution', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
                <input
                  type="text"
                  placeholder="e.g., Aug 2015"
                  value={edu.startDate}
                  onChange={(e) => handleChange(edu.id, 'startDate', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
                <input
                  type="text"
                  placeholder="e.g., May 2019"
                  value={edu.endDate}
                  onChange={(e) => handleChange(edu.id, 'endDate', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm p-2 border"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description / Honors</label>
              <textarea
                rows={3}
                value={edu.description}
                onChange={(e) => handleChange(edu.id, 'description', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm p-2 border"
              />
            </div>
          </div>
        ))}
        {education.length === 0 && (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
            No education added yet.
          </div>
        )}
      </div>
    </div>
  );
}
