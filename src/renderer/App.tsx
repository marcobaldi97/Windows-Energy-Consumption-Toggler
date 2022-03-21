import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import { Content } from './Content/Content';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function App(props: unknown) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Content />} />
      </Routes>
    </Router>
  );
}
