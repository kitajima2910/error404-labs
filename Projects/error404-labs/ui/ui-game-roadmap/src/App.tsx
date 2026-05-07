/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import RightPanel from './components/RightPanel';

export default function App() {
  return (
    <div className="flex flex-col h-screen bg-[#f8f9fa] font-sans overflow-hidden text-slate-800 selection:bg-pink-100 selection:text-pink-900">
      <Header />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        <div className="flex-1 overflow-y-auto min-w-0 custom-scrollbar relative z-0">
          <MainContent />
        </div>
        <RightPanel />
      </div>
    </div>
  );
}

