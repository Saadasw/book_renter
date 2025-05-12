import React from 'react';
import { BookImage } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface BookImageGalleryProps {
  images?: BookImage[];
  title: string;
}

const BookImageGallery: React.FC<BookImageGalleryProps> = ({ images, title }) => {
  if (!images || images.length === 0) {
    return (
      <div className="text-center p-4 border rounded-md bg-gray-50">
        <p className="text-gray-500">No condition images available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Book Condition Images</h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {images.map((image) => (
          <Dialog key={image.id}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:opacity-90 transition-opacity">
                <CardContent className="p-2">
                  <div className="aspect-square overflow-hidden rounded-md">
                    <img
                      src={image.imageUrl}
                      alt={`${title} condition`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <div className="aspect-auto max-h-[80vh] overflow-hidden">
                <img
                  src={image.imageUrl}
                  alt={`${title} condition`}
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Uploaded: {new Date(image.uploadedAt).toLocaleDateString()}
              </p>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default BookImageGallery;
