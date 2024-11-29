'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FirebaseConfig, initializeFirebase } from '@/lib/firebase';

const formSchema = z.object({
  apiKey: z.string().min(1, 'API Key is required'),
  authDomain: z.string().min(1, 'Auth Domain is required'),
  projectId: z.string().min(1, 'Project ID is required'),
  storageBucket: z.string().min(1, 'Storage Bucket is required'),
  messagingSenderId: z.string().min(1, 'Messaging Sender ID is required'),
  appId: z.string().min(1, 'App ID is required'),
  databaseURL: z.string().optional(),
});

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      databaseURL: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      initializeFirebase(values as FirebaseConfig);
      toast({
        title: 'Success',
        description: 'Firebase configuration saved successfully',
      });
      router.push('/builder');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to initialize Firebase',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Firebase Settings</CardTitle>
          <CardDescription>
            Configure your Firebase project credentials to enable workflow functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="apiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Key</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Firebase API Key" {...field} />
                    </FormControl>
                    <FormDescription>
                      Found in your Firebase project settings under Web API Key
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="authDomain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Auth Domain</FormLabel>
                    <FormControl>
                      <Input placeholder="project-id.firebaseapp.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project ID</FormLabel>
                    <FormControl>
                      <Input placeholder="your-project-id" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="storageBucket"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Storage Bucket</FormLabel>
                    <FormControl>
                      <Input placeholder="project-id.appspot.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="messagingSenderId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Messaging Sender ID</FormLabel>
                    <FormControl>
                      <Input placeholder="123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="appId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>App ID</FormLabel>
                    <FormControl>
                      <Input placeholder="1:123456789:web:abcdef" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="databaseURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Database URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://project-id.firebaseio.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Required only if you&apos;re using Realtime Database
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Configuration'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}