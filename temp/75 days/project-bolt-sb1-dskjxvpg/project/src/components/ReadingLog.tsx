import React, { useState } from 'react';
import { BookOpen, Plus, Edit, CheckCircle, Clock, Target, TrendingUp } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  totalPages: number;
  currentPage: number;
  completed: boolean;
}

interface ReadingLogProps {
  books: Book[];
  onUpdateBook: (id: string, updates: Partial<Book>) => void;
  onAddBook: (book: Omit<Book, 'id'>) => void;
}

const ReadingLog: React.FC<ReadingLogProps> = ({ books, onUpdateBook, onAddBook }) => {
  const [showAddBook, setShowAddBook] = useState(false);
  const [editingBook, setEditingBook] = useState<string | null>(null);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    totalPages: 0,
    currentPage: 0,
  });

  const handleAddBook = () => {
    if (newBook.title && newBook.author && newBook.totalPages > 0) {
      onAddBook({
        ...newBook,
        completed: false,
      });
      setNewBook({ title: '', author: '', totalPages: 0, currentPage: 0 });
      setShowAddBook(false);
    }
  };

  const handleUpdateProgress = (bookId: string, pages: number) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      const newCurrentPage = Math.min(book.totalPages, Math.max(0, pages));
      const completed = newCurrentPage >= book.totalPages;
      onUpdateBook(bookId, { currentPage: newCurrentPage, completed });
    }
  };

  const getReadingStats = () => {
    const totalBooks = books.length;
    const completedBooks = books.filter(book => book.completed).length;
    const totalPages = books.reduce((sum, book) => sum + book.totalPages, 0);
    const readPages = books.reduce((sum, book) => sum + book.currentPage, 0);
    const averageProgress = totalBooks > 0 ? Math.round((readPages / totalPages) * 100) : 0;

    return { totalBooks, completedBooks, totalPages, readPages, averageProgress };
  };

  const stats = getReadingStats();

  const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
    const percentage = total > 0 ? (current / total) * 100 : 0;
    return (
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center">
          <BookOpen className="w-8 h-8 mr-3 text-yellow-400" />
          Reading Log
        </h2>
        <p className="text-gray-400">Track your daily reading progress</p>
      </div>

      {/* Reading Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-400">{stats.totalBooks}</div>
              <div className="text-gray-400">Total Books</div>
            </div>
            <BookOpen className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-400">{stats.completedBooks}</div>
              <div className="text-gray-400">Completed</div>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-400">{stats.readPages}</div>
              <div className="text-gray-400">Pages Read</div>
            </div>
            <TrendingUp className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-400">{stats.averageProgress}%</div>
              <div className="text-gray-400">Avg Progress</div>
            </div>
            <Target className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Add Book Section */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">My Reading List</h3>
          <button
            onClick={() => setShowAddBook(!showAddBook)}
            className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Book</span>
          </button>
        </div>

        {showAddBook && (
          <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Book Title"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                className="px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Author"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                className="px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="number"
                placeholder="Total Pages"
                value={newBook.totalPages || ''}
                onChange={(e) => setNewBook({ ...newBook, totalPages: parseInt(e.target.value) || 0 })}
                className="px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Current Page"
                value={newBook.currentPage || ''}
                onChange={(e) => setNewBook({ ...newBook, currentPage: parseInt(e.target.value) || 0 })}
                className="px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:outline-none"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleAddBook}
                className="px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-500"
              >
                Add Book
              </button>
              <button
                onClick={() => setShowAddBook(false)}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Books List */}
        <div className="space-y-4">
          {books.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-600" />
              <p>No books in your reading list yet</p>
              <p className="text-sm">Add a book to start tracking your progress!</p>
            </div>
          ) : (
            books.map((book) => {
              const progress = book.totalPages > 0 ? (book.currentPage / book.totalPages) * 100 : 0;
              const isEditing = editingBook === book.id;

              return (
                <div key={book.id} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white">{book.title}</h4>
                      <p className="text-gray-400">by {book.author}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-300">
                        <span>{book.currentPage} / {book.totalPages} pages</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          book.completed 
                            ? 'bg-green-600 text-white' 
                            : 'bg-yellow-600 text-white'
                        }`}>
                          {book.completed ? 'Completed' : 'In Progress'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingBook(isEditing ? null : book.id)}
                        className="p-2 text-gray-400 hover:text-white rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {book.completed && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-sm font-semibold text-yellow-400">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <ProgressBar current={book.currentPage} total={book.totalPages} />
                  </div>

                  {isEditing && (
                    <div className="bg-gray-900/50 p-3 rounded border border-gray-600">
                      <div className="flex items-center space-x-2 mb-3">
                        <label className="text-sm text-gray-400">Current Page:</label>
                        <input
                          type="number"
                          value={book.currentPage}
                          onChange={(e) => handleUpdateProgress(book.id, parseInt(e.target.value) || 0)}
                          className="px-2 py-1 bg-gray-700 rounded text-sm w-20"
                          min="0"
                          max={book.totalPages}
                        />
                        <span className="text-sm text-gray-400">of {book.totalPages}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdateProgress(book.id, book.currentPage + 10)}
                          className="px-3 py-1 bg-yellow-600 rounded text-sm hover:bg-yellow-500"
                        >
                          +10 pages
                        </button>
                        <button
                          onClick={() => handleUpdateProgress(book.id, book.totalPages)}
                          className="px-3 py-1 bg-green-600 rounded text-sm hover:bg-green-500"
                        >
                          Mark Complete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Reading Tips */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-2xl border border-yellow-500/20">
        <h3 className="text-lg font-bold mb-3 text-yellow-400">Reading Tips for 75 Hard</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
          <div>
            <h4 className="font-semibold mb-1">Choose Non-Fiction</h4>
            <p>Focus on self-development, business, or educational books for maximum growth.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Consistent Schedule</h4>
            <p>Read at the same time each day to build a sustainable habit.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Take Notes</h4>
            <p>Write down key insights and actionable takeaways from your reading.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">10 Pages Minimum</h4>
            <p>Remember, 10 pages is the minimum - feel free to read more when motivated!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingLog;