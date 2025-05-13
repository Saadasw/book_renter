import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookImage } from '@/types';
import { useToast } from '@/components/ui/use-toast';

interface BookImageUploaderProps {
  bookId: string;
  onImageUpload: (image: BookImage) => void;
}

const BookImageUploader: React.FC<BookImageUploaderProps> = ({ bookId, onImageUpload }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // In a real app, you would upload to a storage service like Cloudinary or Supabase Storage
  const handleUpload = () => {
    if (!imageUrl) {
      toast({
        title: 'Error',
        description: 'Please enter an image URL',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newImage: BookImage = {
        id: uuidv4(),
        bookId,
        imageUrl,
        uploadedAt: new Date().toISOString(),
      };
      
      onImageUpload(newImage);
      setImageUrl('');
      setIsUploading(false);
      
      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="image-url">Image URL</Label>
        <Input
          id="image-url"
          type="url"
          placeholder="https://example.com/image.jpg"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <Button 
        onClick={handleUpload} 
        disabled={isUploading || !imageUrl}
        className="w-full"
      >
        {isUploading ? 'Uploading...' : 'Upload Image'}
      </Button>
      <p className="text-xs text-gray-500">
        Upload images showing the condition of your book (covers, pages, etc.)
      </p>
    </div>
  );
};

export default BookImageUploader;
