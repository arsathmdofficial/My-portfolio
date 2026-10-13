import React from 'react';
import { X, Award, Building2, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CertificateItem } from '../types';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  if (!certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-900 flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-label={`${certificate.title} Certificate Details`}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold block">
                {certificate.category}
              </span>
              <h3 className="text-xl font-bold tracking-tight text-slate-900">
                {certificate.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Credential Card Layout */}
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col gap-4 text-center">
          <div className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit mx-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            {certificate.verificationBadge}
          </div>

          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-mono">Issued for participation & achievement to</div>
            <div className="text-lg font-bold text-slate-900 mt-1">MOHAMED ARSATH H</div>
            <div className="text-xs text-slate-600 mt-0.5">BCA · Mohamed Sathak College of Arts and Science</div>
          </div>

          <div className="h-px bg-slate-200 w-full my-1" />

          <div className="flex flex-col sm:flex-row items-center justify-around gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-slate-800">{certificate.college}</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{certificate.location}</span>
            </div>
          </div>
        </div>

        {/* Description & Disciplines */}
        <div className="space-y-3 text-xs">
          <p className="text-slate-600 leading-relaxed">
            {certificate.description}
          </p>

          <div>
            <span className="font-semibold text-slate-800 block mb-2 font-mono uppercase text-[11px]">
              Recognized Event Disciplines:
            </span>
            <div className="flex flex-wrap gap-2">
              {certificate.disciplines.map((item, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200/80 text-blue-800 font-medium text-xs flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Inter-collegiate competitive activity</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
