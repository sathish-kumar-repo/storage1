import React, { useState, useEffect } from 'react';
import { Flame, Calendar, Camera, BookOpen, Droplets, Dumbbell, Trophy, Target, CheckCircle } from 'lucide-react';
import Header from './components/Header';
import DashboardStats from './components/DashboardStats';
import DailyTracker from './components/DailyTracker';
import ProgressCalendar from './components/ProgressCalendar';
import PhotoGallery from './components/PhotoGallery';
import ReadingLog from './components/ReadingLog';
import { useAuth } from './hooks/useAuth';
import { useFirestore } from './hooks/useFirestore';

interface DailyProgress {
  date: string;
  diet: boolean;
  workout1: boolean;
  workout2: boolean;
  water: boolean;
  reading: boolean;
  photo: boolean;
}

interface Book {
  id: string;
  title: string;
  author: string;
  totalPages: number;
  currentPage: number;
  completed: boolean;
}

function App() {
  const { user, loading: authLoading } = useAuth();
  const { userData, loading: firestoreLoading, updateDailyProgress, updateCurrentDay, addBook, updateBook, addPhoto } = useFirestore();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Local state for non-authenticated users
  const [localCurrentDay, setLocalCurrentDay] = useState(1);
  const [localDailyProgress, setLocalDailyProgress] = useState<DailyProgress[]>([]);
  const [localBooks, setLocalBooks] = useState<Book[]>([]);
  const [localPhotos, setLocalPhotos] = useState<string[]>([]);

  // Use Firebase data if authenticated, otherwise use local state
  const currentDay = user && userData ? userData.currentDay : localCurrentDay;
  const dailyProgress = user && userData ? userData.dailyProgress : localDailyProgress;
  const books = user && userData ? userData.books : localBooks;
  const photos = user && userData ? userData.photos : localPhotos;

  useEffect(() => {
    // Initialize local data for non-authenticated users
    if (!user) {
      const sampleProgress: DailyProgress[] = [];
      for (let i = 1; i <= 75; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (75 - i));
        sampleProgress.push({
          date: date.toISOString().split('T')[0],
          diet: i <= localCurrentDay - 1 ? Math.random() > 0.2 : false,
          workout1: i <= localCurrentDay - 1 ? Math.random() > 0.3 : false,
          workout2: i <= localCurrentDay - 1 ? Math.random() > 0.4 : false,
          water: i <= localCurrentDay - 1 ? Math.random() > 0.1 : false,
          reading: i <= localCurrentDay - 1 ? Math.random() > 0.2 : false,
          photo: i <= localCurrentDay - 1 ? Math.random() > 0.5 : false,
        });
      }
      setLocalDailyProgress(sampleProgress);

      // Sample books for non-authenticated users
      setLocalBooks([
        {
          id: '1',
          title: 'Atomic Habits',
          author: 'James Clear',
          totalPages: 320,
          currentPage: 45,
          completed: false,
        },
        {
          id: '2',
          title: 'Can\'t Hurt Me',
          author: 'David Goggins',
          totalPages: 366,
          currentPage: 366,
          completed: true,
        },
      ]);
    }
  }, [user, localCurrentDay]);

  const getTodayProgress = () => {
    return dailyProgress[currentDay - 1] || {
      date: new Date().toISOString().split('T')[0],
      diet: false,
      workout1: false,
      workout2: false,
      water: false,
      reading: false,
      photo: false,
    };
  };

  const updateTodayProgress = async (key: keyof DailyProgress, value: boolean) => {
    const todayProgress = getTodayProgress();
    const updatedProgress = { ...todayProgress, [key]: value };

    if (user && userData) {
      // Update in Firebase
      await updateDailyProgress(currentDay - 1, updatedProgress);
    } else {
      // Update local state
      setLocalDailyProgress(prev => {
        const updated = [...prev];
        if (updated[currentDay - 1]) {
          updated[currentDay - 1] = updatedProgress;
        }
        return updated;
      });
    }
  };

  const getCompletedDays = () => {
    return dailyProgress.slice(0, currentDay - 1).filter(day => 
      day.diet && day.workout1 && day.workout2 && day.water && day.reading && day.photo
    ).length;
  };

  const getCurrentStreak = () => {
    let streak = 0;
    for (let i = currentDay - 2; i >= 0; i--) {
      const day = dailyProgress[i];
      if (day && day.diet && day.workout1 && day.workout2 && day.water && day.reading && day.photo) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const handleUpdateBook = async (id: string, updates: Partial<Book>) => {
    if (user && userData) {
      await updateBook(id, updates);
    } else {
      setLocalBooks(prev => prev.map(book => 
        book.id === id ? { ...book, ...updates } : book
      ));
    }
  };

  const handleAddBook = async (book: Omit<Book, 'id'>) => {
    if (user && userData) {
      await addBook(book);
    } else {
      setLocalBooks(prev => [...prev, { ...book, id: Date.now().toString() }]);
    }
  };

  const handleAddPhoto = async (photo: string) => {
    if (user && userData) {
      await addPhoto(photo);
    } else {
      setLocalPhotos(prev => [...prev, photo]);
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Target },
    { id: 'today', label: 'Today', icon: CheckCircle },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'photos', label: 'Photos', icon: Camera },
    { id: 'reading', label: 'Reading', icon: BookOpen },
  ];

  if (authLoading || (user && firestoreLoading)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Loading your 75 Hard journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Header />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-gray-800/80 backdrop-blur-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!user && (
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-4 rounded-lg border border-yellow-500/20 mb-8">
            <p className="text-center text-yellow-400">
              <strong>Sign in to save your progress!</strong> Your data will be synced across all devices.
            </p>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <DashboardStats
            currentDay={currentDay}
            completedDays={getCompletedDays()}
            currentStreak={getCurrentStreak()}
            dailyProgress={dailyProgress.slice(0, currentDay - 1)}
          />
        )}

        {activeTab === 'today' && (
          <DailyTracker
            day={currentDay}
            progress={getTodayProgress()}
            onUpdate={updateTodayProgress}
          />
        )}

        {activeTab === 'calendar' && (
          <ProgressCalendar
            dailyProgress={dailyProgress}
            currentDay={currentDay}
          />
        )}

        {activeTab === 'photos' && (
          <PhotoGallery
            photos={photos}
            onAddPhoto={handleAddPhoto}
          />
        )}

        {activeTab === 'reading' && (
          <ReadingLog
            books={books}
            onUpdateBook={handleUpdateBook}
            onAddBook={handleAddBook}
          />
        )}
      </main>
    </div>
  );
}

export default App;