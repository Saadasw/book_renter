import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  imageUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  listingType: z.enum(['rent', 'sale', 'both'], {
    required_error: 'Please select a listing type',
  }),
  rentalPrice: z.string().optional().transform(val => val ? Number(val) : undefined),
  salePrice: z.string().optional().transform(val => val ? Number(val) : undefined),
}).refine(data => {
  if (data.listingType === 'rent' || data.listingType === 'both') {
    return !!data.rentalPrice;
  }
  return true;
}, {
  message: 'Rental price is required when listing for rent',
  path: ['rentalPrice'],
}).refine(data => {
  if (data.listingType === 'sale' || data.listingType === 'both') {
    return !!data.salePrice;
  }
  return true;
}, {
  message: 'Sale price is required when listing for sale',
  path: ['salePrice'],
});

type BookFormValues = z.infer<typeof bookSchema>;

const AddBookForm: React.FC = () => {
  const { addBook, currentUser } = useAppContext();

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      author: '',
      imageUrl: '',
      listingType: 'rent',
      rentalPrice: '',
      salePrice: '',
    },
  });

  const listingType = form.watch('listingType');

  const onSubmit = (data: BookFormValues) => {
    if (!currentUser) return;
    
    addBook({
      title: data.title,
      author: data.author,
      ownerId: currentUser.id,
      imageUrl: data.imageUrl || undefined,
      listingType: data.listingType,
      rentalPrice: data.rentalPrice,
      salePrice: data.salePrice,
      status: 'available',
    });
    
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Book title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Book author" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                This is for the main cover image. You can add condition images after creating the book.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="listingType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Listing Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="rent" />
                    </FormControl>
                    <FormLabel className="font-normal">Rent Only</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="sale" />
                    </FormControl>
                    <FormLabel className="font-normal">Sale Only</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="both" />
                    </FormControl>
                    <FormLabel className="font-normal">Both Rent and Sale</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {(listingType === 'rent' || listingType === 'both') && (
          <FormField
            control={form.control}
            name="rentalPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rental Price ($)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="19.99" 
                    min="0" 
                    step="0.01" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {(listingType === 'sale' || listingType === 'both') && (
          <FormField
            control={form.control}
            name="salePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sale Price ($)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="49.99" 
                    min="0" 
                    step="0.01" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-full">Add Book</Button>
      </form>
    </Form>
  );
};

export default AddBookForm;