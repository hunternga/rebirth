import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Process from './pages/Process.jsx';
import Services from './pages/Services.jsx';
import Team from './pages/Team.jsx';
import Fees from './pages/Fees.jsx';
import Contact from './pages/Contact.jsx';
import Testimonials from './pages/Testimonials.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="process" element={<Process />} />
        <Route path="services" element={<Services />} />
        <Route path="team" element={<Team />} />
        <Route path="fees" element={<Fees />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
