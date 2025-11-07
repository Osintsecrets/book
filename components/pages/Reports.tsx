
import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import { translations } from '../../utils/translations';
import { analyzeRisks, getMitigations } from '../../utils/riskEngine';
import { DownloadIcon } from '../Icons';

const Reports: React.FC = () => {
    const { state } = useContext(AppContext);
    const t = translations[state.language];
    const [report, setReport] = useState<string | null>(null);

    const analysis = useMemo(() => analyzeRisks(state.auditData.answers), [state.auditData.answers]);
    const mitigations = useMemo(() => getMitigations(state.auditData.answers), [state.auditData.answers]);

    const generateMarkdownReport = () => {
        let content = `# Privacy Self-Audit Report\n\n`;
        content += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
        content += `## Overall Exposure Level: ${analysis.overallLevel}\n\n`;
        
        content += `## Risk Category Summary\n\n`;
        Object.entries(analysis.categoryRisks).forEach(([category, risk]) => {
            content += `### ${category}: ${risk.level}\n`;
            if(risk.findings.length > 0) {
                risk.findings.forEach(f => {
                    content += `- ${f.reason} (Level: ${f.level})\n`;
                });
            } else {
                content += `- No specific risks identified.\n`;
            }
            content += `\n`;
        });

        content += `## Recommended Mitigations\n\n`;
        mitigations.forEach(m => {
            const completed = state.auditData.completedMitigations.includes(m.id) ? '[x]' : '[ ]';
            content += `${completed} **${m.title}**: ${m.description}\n`;
        });

        return content;
    };

    const generateJsonReport = () => {
        const data = {
            generatedAt: new Date().toISOString(),
            analysis,
            mitigations,
            completedMitigations: state.auditData.completedMitigations,
            auditAnswers: state.auditData.answers
        };
        return JSON.stringify(data, null, 2);
    };

    const handleGenerate = () => {
        setReport(generateMarkdownReport());
    };

    const downloadFile = (content: string, filename: string, type: string) => {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-violet-500 text-transparent bg-clip-text">
                {t['reports.title']}
            </h1>
            <p className="text-center text-gray-400 mb-8">{t['reports.intro']}</p>
            
            <div className="text-center mb-8">
                <button
                    onClick={handleGenerate}
                    className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/30 hover:bg-cyan-600 transition-all duration-300"
                >
                    {t['reports.generate']}
                </button>
            </div>

            {report && (
                <div className="p-6 bg-gray-900/50 border border-gray-700/50 rounded-lg">
                    <h2 className="text-2xl font-bold text-cyan-400 mb-4">{t['reports.preview']}</h2>
                    <pre className="bg-gray-900 p-4 rounded-md max-h-96 overflow-auto text-sm text-gray-300 whitespace-pre-wrap">
                        {report}
                    </pre>
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <button 
                            onClick={() => downloadFile(report, 'privacy-audit-report.md', 'text/markdown')}
                            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            <DownloadIcon className="w-5 h-5"/>
                            {t['reports.downloadMD']}
                        </button>
                        <button 
                             onClick={() => downloadFile(generateJsonReport(), 'privacy-audit-report.json', 'application/json')}
                            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
                        >
                             <DownloadIcon className="w-5 h-5"/>
                            {t['reports.downloadJSON']}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reports;
   