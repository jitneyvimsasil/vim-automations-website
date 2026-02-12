import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#e0ff4f] transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <article className="prose-custom">{children}</article>
        </div>
      </div>
      <Footer />
    </div>
  );
}
