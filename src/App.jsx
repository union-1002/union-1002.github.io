import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import LoginPage from './pages/LoginPage';
import HelloPage from './pages/HelloPage';
import TimelinePage from './pages/TimelinePage';
import TeamIntroPage from './pages/TeamIntroPage';
import MemberIntroPage from './pages/MemberIntroPage';
import NoticePage from './pages/NoticePage';
import SchedulePage from './pages/SchedulePage';
import CareerPage from './pages/CareerPage';
import NojoPage from './pages/NojoPage';
import MinwonListPage from './pages/MinwonListPage';
import MinwonSubmitPage from './pages/MinwonSubmitPage';
import { UserProvider } from './shared/user';

function AppProvider({ children }) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/hello" element={<HelloPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/teamIntro" element={<TeamIntroPage />} />
        <Route path="/memberIntro" element={<MemberIntroPage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/nojo" element={<NojoPage />} />
        <Route path="/minwonList" element={<MinwonListPage />} />
        <Route path="/minwonSubmit" element={<MinwonSubmitPage />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
