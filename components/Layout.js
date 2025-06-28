import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Menu, Search, Bell, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
export default function Layout({ children, title = 'Brand Asset Management' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{`Native Union - ${title}`}</title>
        <meta name="description" content="Native Union Brand Asset Management Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Top Navigation */}
      <header className="bg-white shadow-sm z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-gray-500 lg:hidden"
              >
                <Menu size={24} />
              </button>
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-brand-primary ml-2 sm:ml-4">NATIVE UNION</span>
              </Link>
            </div>
            <div className="hidden sm:flex sm:items-center sm:ml-6 space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search assets..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>
              <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
                <Bell size={20} />
              </button>
              <HeadlessMenu as="div" className="relative inline-block text-left">
                <HeadlessMenu.Button className="flex items-center space-x-2 p-2 rounded-full text-gray-700 hover:bg-gray-100">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={18} className="text-gray-600" />
                  </div>
                  <span className="hidden md:block">Fabien Nauroy</span>
                  <ChevronDown size={16} />
                </HeadlessMenu.Button>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <HeadlessMenu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <HeadlessMenu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } flex items-center px-4 py-2 text-sm text-gray-700`}
                          >
                            <User size={16} className="mr-2" />
                            Profile
                          </a>
                        )}
                      </HeadlessMenu.Item>
                      <HeadlessMenu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } flex items-center px-4 py-2 text-sm text-gray-700`}
                          >
                            <Settings size={16} className="mr-2" />
                            Settings
                          </a>
                        )}
                      </HeadlessMenu.Item>
                      <HeadlessMenu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } flex items-center px-4 py-2 text-sm text-gray-700`}
                          >
                            <LogOut size={16} className="mr-2" />
                            Sign out
                          </a>
                        )}
                      </HeadlessMenu.Item>
                    </div>
                  </HeadlessMenu.Items>
                </Transition>
              </HeadlessMenu>
            </div>
          </div>
        </div>
      </header>
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-auto`}
        >
          <div className="h-16 flex items-center px-6 lg:hidden">
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-500"
            >
              <Menu size={24} />
            </button>
            <span className="text-xl font-bold text-brand-primary ml-2">NATIVE UNION</span>
          </div>
          <nav className="px-4 py-6 space-y-1">
            <Link href="/" className="flex items-center px-2 py-2 text-gray-700 rounded-md hover:bg-gray-100">
              <span className="ml-3">Dashboard</span>
            </Link>
            <Link href="/logos" className="flex items-center px-2 py-2 text-gray-700 rounded-md hover:bg-gray-100">
              <span className="ml-3">Logos</span>
            </Link>
            <Link href="/images" className="flex items-center px-2 py-2 text-gray-700 rounded-md hover:bg-gray-100">
              <span className="ml-3">Images</span>
            </Link>
            <Link href="/templates" className="flex items-center px-2 py-2 text-gray-700 rounded-md hover:bg-gray-100">
              <span className="ml-3">Templates</span>
            </Link>
            <Link href="/guidelines" className="flex items-center px-2 py-2 text-gray-700 rounded-md hover:bg-gray-100">
              <span className="ml-3">Brand Guidelines</span>
            </Link>
            <Link href="/team" className="flex items-center px-2 py-2 text-gray-700 rounded-md hover:bg-gray-100">
              <span className="ml-3">Team</span>
            </Link>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}