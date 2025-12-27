'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import ClassForm from '@/components/admin/ClassForm';

interface ClassSchedule {
  id: string;
  type: string;
  titleEn: string;
  titleRu: string;
  descEn?: string | null;
  descRu?: string | null;
  dayOfWeek?: number | null;
  startTime: string;
  duration: number;
  capacity: number;
  isActive: boolean;
}

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function AdminDashboard() {
  const router = useRouter();
  const [classes, setClasses] = useState<ClassSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingClass, setEditingClass] = useState<ClassSchedule | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Check auth
    const isAuth = sessionStorage.getItem('admin_auth');
    if (!isAuth) {
      router.push('/en/admin');
      return;
    }

    loadClasses();
  }, [router]);

  const loadClasses = async () => {
    try {
      const res = await fetch('/api/classes');
      const data = await res.json();
      setClasses(data);
    } catch (error) {
      console.error('Error loading classes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this class?')) return;

    try {
      const res = await fetch(`/api/admin/classes/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        loadClasses();
      }
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    router.push('/en/admin');
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingClass(null);
    loadClasses();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-calm-50 to-beige-50 flex items-center justify-center">
        <div className="text-calm-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-calm-50 to-beige-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-calm-900">Admin Dashboard</h1>
              <p className="text-calm-600 mt-1">Manage your class schedule</p>
            </div>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Add Class Button */}
        {!showForm && (
          <div className="mb-6">
            <Button
              variant="primary"
              onClick={() => {
                setEditingClass(null);
                setShowForm(true);
              }}
            >
              + Add New Class
            </Button>
          </div>
        )}

        {/* Class Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-calm-900">
                {editingClass ? 'Edit Class' : 'Add New Class'}
              </h2>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowForm(false);
                  setEditingClass(null);
                }}
              >
                Cancel
              </Button>
            </div>
            <ClassForm classData={editingClass} onSuccess={handleFormSuccess} />
          </div>
        )}

        {/* Classes List */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-calm-100">
            <h2 className="text-xl font-bold text-calm-900">Current Classes</h2>
          </div>
          <div className="divide-y divide-calm-100">
            {classes.length === 0 ? (
              <div className="p-8 text-center text-calm-600">
                No classes yet. Add your first class above!
              </div>
            ) : (
              classes.map((classItem) => (
                <div key={classItem.id} className="p-6 hover:bg-calm-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-calm-900">
                          {classItem.titleEn}
                        </h3>
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-calm-100 text-calm-800">
                          {classItem.type}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-calm-600">
                        <div>
                          <span className="font-medium">Day:</span>{' '}
                          {classItem.dayOfWeek !== null && classItem.dayOfWeek !== undefined ? dayNames[classItem.dayOfWeek] : 'Flexible'}
                        </div>
                        <div>
                          <span className="font-medium">Time:</span> {classItem.startTime}
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span> {classItem.duration} min
                        </div>
                        <div>
                          <span className="font-medium">Capacity:</span> {classItem.capacity} spots
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setEditingClass(classItem);
                          setShowForm(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleDelete(classItem.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
