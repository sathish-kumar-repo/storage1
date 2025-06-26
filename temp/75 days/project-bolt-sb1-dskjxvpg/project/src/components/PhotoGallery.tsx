import React, { useState } from 'react';
import { Camera, Upload, Download, Trash2, Eye, Plus } from 'lucide-react';

interface PhotoGalleryProps {
  photos: string[];
  onAddPhoto: (photo: string) => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, onAddPhoto }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  // Sample photos for demonstration
  const samplePhotos = [
    'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/2383009/pexels-photo-2383009.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400',
  ];

  const allPhotos = [...samplePhotos, ...photos];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onAddPhoto(e.target.result as string);
          setShowUpload(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const PhotoModal = ({ photo, onClose }: { photo: string; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-4xl max-h-full">
        <img src={photo} alt="Progress" className="max-w-full max-h-full rounded-lg" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-900/80 text-white p-2 rounded-full hover:bg-gray-800"
        >
          ×
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center">
          <Camera className="w-8 h-8 mr-3 text-pink-400" />
          Progress Gallery
        </h2>
        <p className="text-gray-400">Document your transformation journey</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-pink-400">{allPhotos.length}</div>
              <div className="text-gray-400">Total Photos</div>
            </div>
            <Camera className="w-8 h-8 text-pink-400" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-400">75</div>
              <div className="text-gray-400">Days Goal</div>
            </div>
            <Eye className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-400">
                {Math.round((allPhotos.length / 75) * 100)}%
              </div>
              <div className="text-gray-400">Progress</div>
            </div>
            <Download className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Add Today's Progress Photo</h3>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 bg-gray-700 rounded-2xl border-2 border-dashed border-gray-600 flex items-center justify-center hover:border-pink-400 transition-colors cursor-pointer"
                 onClick={() => setShowUpload(true)}>
              <div className="text-center">
                <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Add Photo</p>
              </div>
            </div>
            
            {showUpload && (
              <div className="w-full max-w-md">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-sm"
                />
                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={() => setShowUpload(false)}
                    className="flex-1 px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-pink-600 rounded-lg hover:bg-pink-500">
                    Upload
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
        <h3 className="text-xl font-bold mb-4">Your Journey</h3>
        
        {allPhotos.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Camera className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p className="text-lg">No photos yet</p>
            <p className="text-sm">Start documenting your transformation!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allPhotos.map((photo, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-700">
                  <img
                    src={photo}
                    alt={`Progress Day ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedPhoto(photo)}
                      className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    >
                      <Eye className="w-4 h-4 text-white" />
                    </button>
                    <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                      <Download className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
                
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  Day {index + 1}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Before/After Comparison */}
      {allPhotos.length >= 2 && (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
          <h3 className="text-xl font-bold mb-4">Before & After Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-3 text-blue-400">Day 1</h4>
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-700">
                <img
                  src={allPhotos[0]}
                  alt="Before"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-3 text-green-400">Latest</h4>
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-700">
                <img
                  src={allPhotos[allPhotos.length - 1]}
                  alt="Latest"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-6 rounded-2xl border border-pink-500/20">
        <h3 className="text-lg font-bold mb-3 text-pink-400">Photo Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
          <div>
            <h4 className="font-semibold mb-1">Consistency</h4>
            <p>Take photos at the same time each day, preferably in the morning.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Lighting</h4>
            <p>Use natural lighting when possible for the most accurate representation.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Angles</h4>
            <p>Take photos from multiple angles: front, side, and back views.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Clothing</h4>
            <p>Wear the same or similar fitted clothing to track changes accurately.</p>
          </div>
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      )}
    </div>
  );
};

export default PhotoGallery;