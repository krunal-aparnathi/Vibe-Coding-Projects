import { useResumeStore } from '@/store/useResumeStore';

const colors = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Gray', value: '#4b5563' },
  { name: 'Slate', value: '#0f172a' },
];

const fonts = [
  { name: 'Sans Serif (Inter)', value: 'font-sans' },
  { name: 'Serif (Merriweather)', value: 'font-serif' },
  { name: 'Monospace (Fira Code)', value: 'font-mono' },
];

const templates = ['Modern', 'Creative', 'Executive', 'Minimalist', 'Academic'] as const;

export default function CustomizerSidebar() {
  const { customization, updateCustomization } = useResumeStore();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Customization</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Template</label>
        <div className="grid grid-cols-2 gap-2">
          {templates.map((tpl) => (
            <button
              key={tpl}
              onClick={() => updateCustomization({ template: tpl })}
              className={`p-2 text-sm border rounded-md transition-colors ${
                customization.template === tpl
                  ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-400 dark:text-blue-300'
                  : 'bg-white border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tpl}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => updateCustomization({ primaryColor: color.value })}
              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                customization.primaryColor === color.value ? 'border-gray-800 dark:border-white scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: color.value }}
              aria-label={`Select ${color.name} color`}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Typography</label>
        <div className="space-y-2">
          {fonts.map((font) => (
            <button
              key={font.value}
              onClick={() => updateCustomization({ fontFamily: font.value })}
              className={`w-full text-left p-2 text-sm border rounded-md transition-colors ${
                customization.fontFamily === font.value
                  ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-400 dark:text-blue-300'
                  : 'bg-white border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <span className={font.value}>{font.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Spacing</label>
        <div className="flex gap-2">
          {(['compact', 'normal', 'spacious'] as const).map((spacing) => (
            <button
              key={spacing}
              onClick={() => updateCustomization({ spacing })}
              className={`flex-1 p-2 text-sm border rounded-md capitalize transition-colors ${
                customization.spacing === spacing
                  ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-400 dark:text-blue-300'
                  : 'bg-white border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {spacing}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
