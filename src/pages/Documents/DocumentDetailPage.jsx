/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import documentService from '../../services/documentService';
import Spinner from '../../components/common/Spinner';
import toast from 'react-hot-toast';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Tabs from '../../components/common/Tabs';
import ChatInterface from '../../components/chat/ChatInterface';
import AIActions from '../../components/ai/AIActions';
import FlashcardManager from '../../components/flashcards/FlashcardManager';
import QuizManager from '../../components/quizzes/QuizManager';
import { BASE_URL } from '../../utils/apiPaths';

const DocumentDetailPage = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Content');
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    const fetchDocumentDetails = async () => {
      try {
        setLoading(true);
        const response = await documentService.getDocumentById(id);
        
        // Assuming your backend returns { success: true, data: { ... } }
        const docData = response.data || response; 
        setDocument(response);

        // Calculate PDF URL immediately upon fetching
        if (docData && docData.filePath) {
          const path = docData.filePath;
          
          // Logic: If it starts with http, it's Cloudinary. 
          // Otherwise, it's a local path from your backend.
          if (path.startsWith('http')) {
            setPdfUrl(path);
            console.log("cleanpath")
          } else {
            const baseUrl = BASE_URL || 'http://localhost:8000';
            const cleanPath = path.startsWith('/') ? path : `/${path}`;
            setPdfUrl(`${cleanPath}`);
            console.log(cleanPath, "cleanpath")
          }
        }
      } catch (error) {
        toast.error('Failed to fetch document details.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDocumentDetails();
    }
  }, [id]);

  const renderContent = () => {
    if (loading) return <Spinner />;

    if (!document || !pdfUrl) {
      return (
        <div className="text-center p-8">
          <p className="text-gray-500">PDF not available or could not be loaded.</p>
        </div>
      );
    }

    return (
      <div className='bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm'>
        <div className='flex items-center justify-between p-4 bg-gray-50 border-b border-gray-300'>
          <span className='text-sm font-medium text-gray-700'>Document Viewer</span>
          <a
            href={pdfUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors'>
            <ExternalLink size={16} />
            Open in new Tab
          </a>
        </div>
        <div className='bg-gray-100 p-1'>
          <iframe
            src={pdfUrl}
            className='w-full h-[70vh] bg-white rounded border border-gray-300'
            title='PDF Viewer'
            style={{ colorScheme: 'light' }}
          />
        </div>
      </div>
    );
  };

  const tabs = [
    { name: 'Content', label: 'Content', content: renderContent() },
    { name: 'Chat', label: 'Chat', content: <ChatInterface /> },
    { name: 'AI Actions', label: 'AI Actions', content: <AIActions /> },
    { name: 'Flashcards', label: 'Flashcards', content: <FlashcardManager documentId={id} /> },
    { name: 'Quizzes', label: 'Quizzes', content: <QuizManager documentId={id} /> },
  ];

  if (loading) return <Spinner />;

  if (!document) {
    return (
      <div className='text-center p-8'>
        <p>Document not found.</p>
        <Link to="/documents" className="text-blue-500 underline">Go back</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className='mb-4'>
        <Link to="/documents" className='inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors'>
          <ArrowLeft size={16} />
          Back to Documents
        </Link>
      </div>
      
      <PageHeader title={document.data?.title || "Document Details"} />
      
      <div className="mt-6">
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default DocumentDetailPage;