import { Route, Routes } from 'react-router';
import { UserProvider } from './shared/user';
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
import SitePage from './pages/SitePage';
import HackerLoginPage from './pages/HackerLoginPage';
import GoodPage from './pages/GoodPage';
import WellPage from './pages/WellPage';
import MonthPage from './pages/MonthPage';
import AdminPage from './pages/AdminPasswordReset';
import PartEPage from './pages/PartEPage';
import PartDPage from './pages/PartDPage';
import PartUPage from './pages/PartUPage';
import PartHPage from './pages/PartHPage';
import PartWPage from './pages/PartWPage';

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
        <Route path="/hackerLogin" element={<HackerLoginPage />} />
        <Route path="/hello" element={<HelloPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/teamIntro" element={<TeamIntroPage />} />
        <Route path="/memberIntro" element={<MemberIntroPage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/wellfare" element={<WellPage/>} />
        <Route path="/good" element={<GoodPage />} />
        <Route path="/nojo" element={<NojoPage />} />
        <Route path="/minwonList" element={<MinwonListPage />} />
        <Route path="/minwonSubmit" element={<MinwonSubmitPage />} />
        <Route path="/siteIntro" element={<SitePage />} />
        <Route path="/monthlyMember" element={<MonthPage/>} />
        <Route path="/unionAdmin" element={<AdminPage/>} />
        <Route path="/eagleEye" element={<PartEPage/>} />
        <Route path="/dracal" element={<PartDPage/>} />
        <Route path="/underground" element={<PartUPage/>} />
        <Route path="/hunters" element={<PartHPage/>} />
        <Route path="/wolfdog" element={<PartWPage/>} />
      </Routes>
    </AppProvider>
  );
}

export default App;
