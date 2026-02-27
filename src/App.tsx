/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Greeting from './pages/company/Greeting';
import History from './pages/company/History';
import Location from './pages/company/Location';
import Parent from './pages/business/Parent';
import Subsidiary from './pages/business/Subsidiary';
import Affiliate from './pages/business/Affiliate';
import Recruitment from './pages/careers/Recruitment';
import Financial from './pages/ir/Financial';
import Disclosure from './pages/ir/Disclosure';
import Notice from './pages/ir/Notice';
import Privacy from './pages/policy/Privacy';
import CCTV from './pages/policy/CCTV';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="company/greeting" element={<Greeting />} />
          <Route path="company/history" element={<History />} />
          <Route path="company/location" element={<Location />} />
          <Route path="business/parent" element={<Parent />} />
          <Route path="business/subsidiary" element={<Subsidiary />} />
          <Route path="business/affiliate" element={<Affiliate />} />
          <Route path="careers/recruitment" element={<Recruitment />} />
          <Route path="ir/financial" element={<Financial />} />
          <Route path="ir/disclosure" element={<Disclosure />} />
          <Route path="ir/notice" element={<Notice />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="cctv" element={<CCTV />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
