import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  onSnapshot,
  arrayUnion,
  arrayRemove,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './useAuth';

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

interface UserData {
  currentDay: number;
  dailyProgress: DailyProgress[];
  books: Book[];
  photos: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const useFirestore = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setUserData(null);
      setLoading(false);
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);
    
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        setUserData(doc.data() as UserData);
      } else {
        // Initialize user data if it doesn't exist
        const initialData: UserData = {
          currentDay: 1,
          dailyProgress: [],
          books: [],
          photos: [],
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        };
        setDoc(userDocRef, initialData);
        setUserData(initialData);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const updateUserData = async (updates: Partial<UserData>) => {
    if (!user) return;

    const userDocRef = doc(db, 'users', user.uid);
    await updateDoc(userDocRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  };

  const updateDailyProgress = async (dayIndex: number, progress: DailyProgress) => {
    if (!user || !userData) return;

    const updatedProgress = [...userData.dailyProgress];
    updatedProgress[dayIndex] = progress;

    await updateUserData({ dailyProgress: updatedProgress });
  };

  const updateCurrentDay = async (day: number) => {
    if (!user) return;
    await updateUserData({ currentDay: day });
  };

  const addBook = async (book: Omit<Book, 'id'>) => {
    if (!user || !userData) return;

    const newBook: Book = {
      ...book,
      id: Date.now().toString()
    };

    await updateUserData({ 
      books: [...userData.books, newBook] 
    });
  };

  const updateBook = async (bookId: string, updates: Partial<Book>) => {
    if (!user || !userData) return;

    const updatedBooks = userData.books.map(book => 
      book.id === bookId ? { ...book, ...updates } : book
    );

    await updateUserData({ books: updatedBooks });
  };

  const addPhoto = async (photoUrl: string) => {
    if (!user || !userData) return;

    await updateUserData({ 
      photos: [...userData.photos, photoUrl] 
    });
  };

  return {
    userData,
    loading,
    updateDailyProgress,
    updateCurrentDay,
    addBook,
    updateBook,
    addPhoto
  };
};