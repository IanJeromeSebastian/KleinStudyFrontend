/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Plus, Upload, Trash2, FileText, X } from 'lucide-react';
import toast from 'react-hot-toast';
import documentService from '../../services/documentService.js';
import Spinner from '../../components/common/Spinner.jsx';
import Button from '../../components/common/Button.jsx';
import DocumentCard from '../../components/documents/DocumentCard.jsx';

const DocumentListPage = () => {

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const fetchDocuments = async () => {
    try {
      const data = await documentService.getDocuments();
      console.log("data", data)
      setDocuments(data);
    } catch (error) {
      toast.error("Failed to fetch documents.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("fetching documents list")
    fetchDocuments();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
      setUploadTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile || !uploadTitle) {
      toast.error("Please provide a title and select a file.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("title", uploadTitle);

    try {
      await documentService.uploadDocument(formData);
      toast.success("Document uploaded successfully!");
      setIsUploadModalOpen(false);
      setUploadFile(null);
      setUploadTitle("");
      setLoading(true);
      fetchDocuments();
    } catch (error) {
      toast.error(error.message || 'Upload failed.');
      console.log(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteRequest = (doc) => {
    setSelectedDoc(doc);
    setIsDeleteModalOpen(true);
  }

  const handleConfirmDelete = async () => {
    if (!selectedDoc) return;
    setDeleting(true);
    try {
      await documentService.deleteDocument(selectedDoc._id);
      toast.success(`'${selectedDoc.title}' deleted.`);
      setIsDeleteModalOpen(false);
      setSelectedDoc(null);
      setDocuments(documents.filter((d) => d._id !== selectedDoc._id));
    } catch (error) {
      toast.error(error.message || "Failed to delete document.");
    } finally {
      setDeleting(false);
    }
  };

  const renderContent = () =>{
    if (loading) {
      return(
        <div className='flex items-center justify-center min-h-[400px]'>
          <Spinner/>
        </div>
      );
    }

    if (documents.length === 0){
      return(
        <div className='flex items-center justify-center min-h-[400px]'>
          <div className='text-center max-w-md'>
            <div className='inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-slate-300 to-slate-400 shadow-lg shadow-slate-200/50 mb-6'>
              <FileText
                className='w-10 h-10 text-slate-400'
                strokeWidth={1.5}/>
            </div>
            <h3 className='text-xl font-medium text-slate-900 tracking-tight mb-2'>
              No Documents Yet
            </h3>
            <p className='text-sm text-slate-500 mb-6'>
              Upload your first PDF to start learning.
            </p>
            <button className='inline-flex items-center gap-2 px-6 py-3 bg-linear-to-br from-[#ffd700] to-[#ffae00] text-black text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[#ffd700]/25 hover:shadow-xl hover:shadow-[#ffd700]/30 active:scale-[0.98]'
              onClick={()=>setIsUploadModalOpen(true)}>
                <Plus className='w-4 h-4' strokeWidth={2.5}/>
                Upload Document
              </button>
          </div>
        </div>
      );
    }

    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'> 
        {documents?.map((doc)=>(
          <DocumentCard
            key={doc._id}
            document={doc}
            onDelete={handleDeleteRequest}/>
        ))}
      </div>
    );
  };

  return (
    <div className='min-h-screen'>
      <div className='absolute inset-0 bg-[radial-gradient(#e5e7eb_1px, transparent_1px)] bg-size-[16px_16px] opacity-30 pointer-events-none'/>

      <div className='relative max-w-7xl mx-auto'>
        <div className='flex items-center justify-between mb-10'>
          <div>
            <h1 className='text-2xl font-medium text-slate-900 tracking-tight mb-2'>
              My Documents
            </h1>
            <p className='text-slate-500 text-sm'>
              Manage and organize your learning materials
            </p>
          </div>
          {documents.length > 0 && (
            <Button onClick={()=> setIsUploadModalOpen(true)}>
              <Plus className='w-4 h-4' strokeWidth={2.5}/>
              Upload Document
            </Button>
          )}
        </div>

        {renderContent()}
      </div>
    </div>
  )
}

export default DocumentListPage