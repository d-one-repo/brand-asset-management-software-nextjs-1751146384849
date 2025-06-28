import { useState } from 'react';
import Image from 'next/image';
import { Download, Star, MoreVertical, Share2, Trash2, Edit } from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { format } from 'date-fns';
export default function AssetCard({ asset }) {
  const [isFavorite, setIsFavorite] = useState(asset.isFavorite);
  return (
    <div className="card group">
      <div className="relative aspect-square bg-gray-100">
        {asset.type === 'image' && (
          <Image
            src={asset.url}
            alt={asset.name}
            fill
            className="object-cover"
          />
        )}
        {asset.type === 'logo' && (
          <div className="w-full h-full flex items-center justify-center p-6">
            <Image
              src={asset.url}
              alt={asset.name}
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
        )}
        {asset.type === 'template' && (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <Image
              src={asset.url}
              alt={asset.name}
              fill
              className="object-contain p-4"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button className="btn btn-primary mx-1">
            <Download size={18} className="mr-1" />
            Download
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900 truncate">{asset.name}</h3>
            <p className="text-sm text-gray-500">{asset.format} • {format(new Date(asset.updatedAt), 'MMM d, yyyy')}</p>
          </div>
          <div className="flex items-center space-x-1">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-1.5 rounded-full ${isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Star size={18} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            <Menu as="div" className="relative">
              <Menu.Button className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                <MoreVertical size={18} />
              </Menu.Button>
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } flex items-center px-4 py-2 text-sm text-gray-700`}
                        >
                          <Download size={16} className="mr-2" />
                          Download
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } flex items-center px-4 py-2 text-sm text-gray-700`}
                        >
                          <Share2 size={16} className="mr-2" />
                          Share
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } flex items-center px-4 py-2 text-sm text-gray-700`}
                        >
                          <Edit size={16} className="mr-2" />
                          Edit
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } flex items-center px-4 py-2 text-sm text-gray-700`}
                        >
                          <Trash2 size={16} className="mr-2" />
                          Delete
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <div className="mt-2 flex items-center">
          <div className="flex -space-x-1">
            {asset.collaborators.map((collaborator, index) => (
              <div 
                key={index}
                className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600"
                title={collaborator.name}
              >
                {collaborator.initial}
              </div>
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">
            {asset.version && `v${asset.version}`}
          </span>
        </div>
      </div>
    </div>
  );
}