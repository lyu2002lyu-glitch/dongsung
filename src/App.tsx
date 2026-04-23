/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Greeting from './pages/company/Greeting';
import History from './pages/company/History';
import Location from './pages/company/Location';
import Newsroom from './pages/company/Newsroom';
import NewsroomDetail from './pages/company/NewsroomDetail';
import Parent from './pages/business/Parent';
import Subsidiary from './pages/business/Subsidiary';
import Affiliate from './pages/business/Affiliate';
import Foundation from './pages/business/Foundation';
import Recruitment from './pages/careers/Recruitment';
import Financial from './pages/ir/Financial';
import Disclosure from './pages/ir/Disclosure';
import DisclosureDetail from './pages/ir/DisclosureDetail';
import Notice from './pages/ir/Notice';
import NoticeDetail from './pages/ir/NoticeDetail';
import InternalInfo from './pages/ethics/InternalInfo';
import Charter from './pages/ethics/Charter';
import Report from './pages/ethics/Report';
import Privacy from './pages/policy/Privacy';
import CCTV from './pages/policy/CCTV';
import Partnership from './pages/policy/Partnership';
import AdminWrite from './pages/admin/Write';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="company/greeting" element={<Greeting />} />
          <Route path="company/history" element={<History />} />
          <Route path="company/newsroom" element={<Newsroom />} />
          <Route path="company/newsroom/:id" element={<NewsroomDetail />} />
          <Route path="company/location" element={<Location />} />
          <Route path="business/parent" element={<Parent />} />
          <Route path="business/subsidiary" element={<Subsidiary />} />
          <Route path="business/affiliate" element={<Affiliate />} />
          <Route path="business/foundation" element={<Foundation />} />
          <Route path="careers/recruitment" element={<Recruitment />} />
          <Route path="ir/financial" element={<Financial />} />
          <Route path="ir/disclosure" element={<Disclosure />} />
          <Route path="ir/disclosure/:id" element={<DisclosureDetail />} />
          <Route path="ir/notice" element={<Notice />} />
          <Route path="ir/notice/:id" element={<NoticeDetail />} />
          <Route path="ethics/internal-info" element={<InternalInfo />} />
          <Route path="ethics/charter" element={<Charter />} />
          <Route path="ethics/report" element={<Report />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="cctv" element={<CCTV />} />
          <Route path="partnership" element={<Partnership />} />
          <Route path="admin/write" element={<AdminWrite />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
