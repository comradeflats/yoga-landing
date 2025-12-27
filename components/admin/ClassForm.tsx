'use client';

import { useState, FormEvent } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface ClassFormProps {
  classData?: any;
  onSuccess: () => void;
}

export default function ClassForm({ classData, onSuccess }: ClassFormProps) {
  const [formData, setFormData] = useState({
    type: classData?.type || 'group',
    titleEn: classData?.titleEn || '',
    titleRu: classData?.titleRu || '',
    descEn: classData?.descEn || '',
    descRu: classData?.descRu || '',
    dayOfWeek: classData?.dayOfWeek?.toString() || '',
    startTime: classData?.startTime || '',
    duration: classData?.duration?.toString() || '60',
    capacity: classData?.capacity?.toString() || '15',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const url = classData
        ? `/api/admin/classes/${classData.id}`
        : '/api/admin/classes';
      const method = classData ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        dayOfWeek: formData.dayOfWeek ? parseInt(formData.dayOfWeek) : null,
        duration: parseInt(formData.duration),
        capacity: parseInt(formData.capacity),
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to save class');
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Class Type */}
        <div>
          <label className="block text-sm font-medium text-calm-700 mb-2">
            Class Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-4 py-2 border border-calm-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-calm-500"
            required
          >
            <option value="group">Group Class</option>
            <option value="private">Private Session</option>
            <option value="recurring">Drop-in Class</option>
          </select>
        </div>

        {/* Day of Week */}
        <div>
          <label className="block text-sm font-medium text-calm-700 mb-2">
            Day of Week (leave empty for flexible)
          </label>
          <select
            value={formData.dayOfWeek}
            onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
            className="w-full px-4 py-2 border border-calm-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-calm-500"
          >
            <option value="">Flexible / By Appointment</option>
            <option value="0">Sunday</option>
            <option value="1">Monday</option>
            <option value="2">Tuesday</option>
            <option value="3">Wednesday</option>
            <option value="4">Thursday</option>
            <option value="5">Friday</option>
            <option value="6">Saturday</option>
          </select>
        </div>

        {/* Title (English) */}
        <div>
          <label className="block text-sm font-medium text-calm-700 mb-2">
            Title (English) *
          </label>
          <Input
            value={formData.titleEn}
            onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
            placeholder="Morning Flow"
            required
          />
        </div>

        {/* Title (Russian) */}
        <div>
          <label className="block text-sm font-medium text-calm-700 mb-2">
            Title (Russian) *
          </label>
          <Input
            value={formData.titleRu}
            onChange={(e) => setFormData({ ...formData, titleRu: e.target.value })}
            placeholder="Утренняя практика"
            required
          />
        </div>

        {/* Start Time */}
        <div>
          <label className="block text-sm font-medium text-calm-700 mb-2">
            Start Time *
          </label>
          <Input
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-calm-700 mb-2">
            Duration (minutes) *
          </label>
          <Input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="60"
            min="15"
            max="180"
            required
          />
        </div>

        {/* Capacity */}
        <div>
          <label className="block text-sm font-medium text-calm-700 mb-2">
            Max Capacity *
          </label>
          <Input
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            placeholder="15"
            min="1"
            max="50"
            required
          />
        </div>
      </div>

      {/* Description (English) */}
      <div>
        <label className="block text-sm font-medium text-calm-700 mb-2">
          Description (English)
        </label>
        <textarea
          value={formData.descEn}
          onChange={(e) => setFormData({ ...formData, descEn: e.target.value })}
          placeholder="Energizing vinyasa flow to start your day"
          className="w-full px-4 py-2 border border-calm-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-calm-500 min-h-[80px]"
        />
      </div>

      {/* Description (Russian) */}
      <div>
        <label className="block text-sm font-medium text-calm-700 mb-2">
          Description (Russian)
        </label>
        <textarea
          value={formData.descRu}
          onChange={(e) => setFormData({ ...formData, descRu: e.target.value })}
          placeholder="Бодрящая виньяса-флоу для начала дня"
          className="w-full px-4 py-2 border border-calm-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-calm-500 min-h-[80px]"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Saving...' : classData ? 'Update Class' : 'Add Class'}
      </Button>
    </form>
  );
}
