import MobileHeader from './ui/mobileHeader';
import SideNav from './ui/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r md:block'>
        <SideNav />
      </div>
      <div className='flex flex-col'>
        <MobileHeader />
        <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
          {children}
        </main>
      </div>
    </div>
  );
}
