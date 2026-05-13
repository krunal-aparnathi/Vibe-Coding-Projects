import { useResumeStore, Project } from '@/store/useResumeStore';
import { Plus, Trash2 } from 'lucide-react';

export default function ProjectsForm() {
  const { projects, addProject, updateProject, removeProject } = useResumeStore();

  const handleChange = (id: string, field: keyof Project, value: string) => {
    updateProject(id, { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Projects</h2>
        <button
          onClick={addProject}
          className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Project
        </button>
      </div>

      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700 relative group">
            <button
              onClick={() => removeProject(project.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Project Name</label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => handleChange(project.id, 'name', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Project Link</label>
                <input
                  type="text"
                  placeholder="e.g., github.com/username/project"
                  value={project.link}
                  onChange={(e) => handleChange(project.id, 'link', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm p-2 border"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea
                rows={3}
                value={project.description}
                onChange={(e) => handleChange(project.id, 'description', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm p-2 border"
              />
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
            No projects added yet.
          </div>
        )}
      </div>
    </div>
  );
}
