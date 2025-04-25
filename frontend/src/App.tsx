import { Navigate, Route, Routes } from 'react-router-dom';
import { Banner } from './components/Banner';

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/welcome" />} />
        <Route
          path="/welcome"
          element={<h1>Welcome, please send an user id as parameter</h1>}
        />
        <Route path="/welcome/:id" element={<Banner />} />
      </Routes>
    </>
  );
}

export default App;
