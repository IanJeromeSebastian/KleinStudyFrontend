/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Sparkles, BookOpen, Lightbulb } from "lucide-react";
import aiService from "../../services/aiService";
import toast from "react-hot-toast";
import MarkdownRenderer from "../common/MarkdownRenderer";
import Modal from "../common/Modal";

const AIActions = () => {

    const { id: documentId } = useParams();
    const [loadingAction, setLoadingAction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [concept, setConcept] = useState("");

    const handleGenerateSummary = async () => {
        setLoadingAction("summary");
        try {
            const { summary } = await aiService.generateSummary(documentId);
            setModalTitle("Generated Summary");
            setModalContent(summary);
            setIsModalOpen(true);
        } catch (error) {
            toast.error("Failed to generate summary.");
        } finally {
            setLoadingAction(null);
        }
    };

    const handleExplainConcept = async (e) => {
        e.preventDefault();
        if (!concept.trim()) {
            toast.error("Please enter a concept to explain.");
            return;
        }
        setLoadingAction("explain");
        try {
            const { explanation } = await aiService.explainConcept(
                documentId,
                concept
            );
            setModalTitle(`Explanation of "${concept}"`);
            setModalContent(explanation);
            setIsModalOpen(true);
            setConcept("");
        } catch (error) {
            toast.error("Failed to explain concept.");
        } finally {
            setLoadingAction(null);
        }
    };

    return (
        <>
            <div className="bg-[#faf4f1]/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200/60 bg-linear-to-br from-slate-50/50 to-white/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#FFC84D] to-[#FFAE00] shadow-lg shadow-[#FFC84D] flex items-center justify-center">
                            <Sparkles className="w-5 h-5" strokeWidth={2} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900">
                                AI Assistant
                            </h3>
                            <p className="text-xs text-slate-500">
                                Powered by advanced AI
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div className="group p-5 bg-linear-to-br from-[#E4DCD7]/50 to-[#C7B9B0]/50 rounded-xl border border-slate-200/60 hover:border-slate-300/60 hover:shadow-md transition-all duration-200">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#ffab91] to-[#ffccbc] flex items-center justify-center">
                                        <BookOpen
                                            className="w-4 h-4"
                                            strokeWidth={2} />
                                    </div>
                                    <h4 className="font-semibold text-slate-900">
                                        Generate Summary
                                    </h4>
                                </div>
                                <p className="font-sm text-slate-600 leading-relaxed">
                                    Get the summary of the entire document.
                                </p>
                            </div>
                            <button
                                onClick={handleGenerateSummary}
                                disabled={loadingAction === "summary"}
                                className="shrink-0 h-10 px-5 bg-linear-to-br from-[#FFC84D] to-[#FFAE00] hover:from-[#FFAE00] hover:to-[#FFAE00] text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[#FFAE00]/25 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95">
                                {loadingAction === "summary" ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Loading...
                                    </span>
                                ) : (
                                    "Summarize"
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="group p-5 bg-linear-to-br from-[#E4DCD7]/50 to-[#C7B9B0]/50 rounded-xl border border-slate-200/60 hover:border-slate-300/60 hover:shadow-md transition-all duration-200">
                        <form onSubmit={handleExplainConcept}>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-200 to-blue-400 flex items-center justify-center">
                                    <Lightbulb
                                        className="w-4 h-4"
                                        strokeWidth={2} />
                                </div>
                                <h4 className="font-semibold text-slate-900">
                                    Explain a Concept
                                </h4>
                            </div>
                            <p className="font-sm text-slate-600 leading-relaxed mb-4">
                                Enter a topic or concept from the document to get detailed explanation.
                            </p>
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={concept}
                                    onChange={(e) => setConcept(e.target.value)}
                                    placeholder="Topic or Concept here"
                                    className="flex-1 h-12 px-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-[#FFAE00] focus:bg-[#faf4f1] focus:shadow-lg focus:shadow-[#FFAE00]/10"
                                    disabled={loadingAction === "explain"} />
                                <button
                                    type="submit"
                                    disabled={loadingAction === "explain" || !concept.trim()}
                                    className="shrink-0 h-10 px-5 bg-linear-to-br from-[#FFC84D] to-[#FFAE00] hover:from-[#FFAE00] hover:to-[#FFAE00] text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[#FFAE00]/25 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95">
                                    {loadingAction === "explain" ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Loading...
                                        </span>
                                    ) : (
                                        "Explain"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalTitle}>
                <div className="max-h-[60vh] overflow-y-auto prose prose-sm max-w-none prose-slate">
                    <MarkdownRenderer content={modalContent}/>
                </div>
            </Modal>
        </>
    )
}

export default AIActions
