'use client';

import { useResumeStore, Skill } from '@/store/useResumeStore';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableSkillItem({ skill, onUpdate, onRemove }: { skill: Skill, onUpdate: (id: string, data: Partial<Skill>) => void, onRemove: (id: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: skill.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700 z-10 bg-white">
      <div {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-gray-600 focus:outline-none">
        <GripVertical className="w-5 h-5" />
      </div>
      <div className="flex-grow">
        <input
          type="text"
          placeholder="Skill name (e.g., React, Node.js)"
          value={skill.name}
          onChange={(e) => onUpdate(skill.id, { name: e.target.value })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm p-2 border"
        />
      </div>
      <div className="w-1/3">
        <select
          value={skill.level}
          onChange={(e) => onUpdate(skill.id, { level: e.target.value })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm p-2 border"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>
      </div>
      <button
        onClick={() => onRemove(skill.id)}
        className="text-gray-400 hover:text-red-500 p-1"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}

export default function SkillsForm() {
  const { skills, addSkill, updateSkill, removeSkill, reorderSkills } = useResumeStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = skills.findIndex((item) => item.id === active.id);
      const newIndex = skills.findIndex((item) => item.id === over.id);
      reorderSkills(arrayMove(skills, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Skills</h2>
        <button
          onClick={addSkill}
          className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Skill
        </button>
      </div>

      <div className="space-y-4 flex flex-col">
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={skills.map(s => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {skills.map((skill) => (
              <SortableSkillItem 
                key={skill.id} 
                skill={skill} 
                onUpdate={updateSkill} 
                onRemove={removeSkill} 
              />
            ))}
          </SortableContext>
        </DndContext>
        
        {skills.length === 0 && (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
            No skills added yet.
          </div>
        )}
      </div>
    </div>
  );
}
