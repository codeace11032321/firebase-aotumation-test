import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Workflow } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="flex-1 w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Build Powerful Workflows with
                <span className="text-blue-600 dark:text-blue-400"> Firebase</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Create, automate, and deploy workflows visually. Connect Firebase services seamlessly
                and bring your ideas to life.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/signup">
                <Button size="lg" className="h-11">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="h-11">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-blue-100 rounded-full dark:bg-blue-900">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold">Real-time Processing</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Build workflows that respond instantly to Firebase events and data changes.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-blue-100 rounded-full dark:bg-blue-900">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold">Secure Integration</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Your Firebase credentials are encrypted and securely stored.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-blue-100 rounded-full dark:bg-blue-900">
                <Workflow className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold">Visual Builder</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Drag and drop modules to create complex workflows without coding.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}