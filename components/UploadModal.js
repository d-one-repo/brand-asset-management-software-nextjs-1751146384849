import { useState, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Upload, Image, FileText } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
export default function UploadModal({ isOpen, onClose, onUpload }) {
  const [files, setFiles] = useState([]);
  const [assetType, setAssetType] = useState('image');
  const [assetName, setAssetName] = useState('');
  const [tags, setTags] = useState('');
  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
    if (acceptedFiles.length > 0 && !assetName) {
      // Set the asset name to the file name without extension
      const fileName = acceptedFiles[0].name.split('.').slice(0, -1).join('.');
      setAssetName(fileName);
    }
  }, [assetName]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.svg'],
    }
  });
  const handleSubmit = () => {
    if (files.length === 0 || !assetName) return;
    // Simulate upload
    onUpload({
      name: assetName,
      type: assetType,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      files
    });
    // Reset form
    setFiles([]);
    setAssetName('');
    setTags('');
    onClose();
  };
  return (
    <Transition show={isOpen} as="div">
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>
          <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              <div className="flex justify-between items-center">
                <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
                  Upload New Asset
                </Dialog.Title>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                  onClick={onClose}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="mt-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Type</label>
                    <div className="mt-1 flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setAssetType('image')}
                        className={`flex-1 py-2 px-3 border rounded-md flex items-center justify-center ${
                          assetType === 'image' 
                            ? 'border-brand-primary bg-brand-secondary text-brand-primary' 
                            : 'border-gray-300 text-gray-700'
                        }`}
                      >
                        <Image size={18} className="mr-2" />
                        Image
                      </button>
                      <button
                        type="button"
                        onClick={() => setAssetType('logo')}
                        className={`flex-1 py-2 px-3 border rounded-md flex items-center justify-center ${
                          assetType === 'logo' 
                            ? 'border-brand-primary bg-brand-secondary text-brand-primary' 
                            : 'border-gray-300 text-gray-700'
                        }`}
                      >
                        <FileText size={18} className="mr-2" />
                        Logo
                      </button>
                      <button
                        type="button"
                        onClick={() => setAssetType('template')}
                        className={`flex-1 py-2 px-3 border rounded-md flex items-center justify-center ${
                          assetType === 'template' 
                            ? 'border-brand-primary bg-brand-secondary text-brand-primary' 
                            : 'border-gray-300 text-gray-700'
                        }`}
                      >
                        <FileText size={18} className="mr-2" />
                        Template
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Name</label>
                    <input
                      type="text"
                      value={assetName}
                      onChange={(e) => setAssetName(e.target.value)}
                      className="input mt-1"
                      placeholder="Enter asset name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="input mt-1"
                      placeholder="product, marketing, social media"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
                    <div 
                      {...getRootProps()} 
                      className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer ${
                        isDragActive ? 'border-brand-primary bg-brand-secondary' : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input {...getInputProps()} />
                      {files.length > 0 ? (
                        <div className="space-y-2">
                          {files.map(file => (
                            <div key={file.name} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                              {file.type.startsWith('image/') && (
                                <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden mr-2">
                                  <img src={file.preview} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                              )}
                              <div className="flex-1 truncate text-sm text-left">
                                <div className="font-medium">{file.name}</div>
                                <div className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</div>
                              </div>
                              <button 
                                type="button" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFiles(files.filter(f => f !== file));
                                }}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                          <p className="text-sm text-gray-500">Click or drag to replace</p>
                        </div>
                      ) : (
                        <div>
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-600">
                            Drag and drop files here, or click to select files
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            PNG, JPG, SVG, PDF, AI, PSD up to 10MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={files.length === 0 || !assetName}
                >
                  Upload
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}