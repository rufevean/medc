
// Import the necessary modules
import Navbar from './navbar';
import HomeMain from './homemain';
import HomeFooter from './homefooter';
import Features from './features';
import About from './about';
import Faq from './faq';
import '../styles/main.css';

// Define the Home component
export default function Home() {
  return (
    <main className="main">
      <Navbar />
      <HomeMain />
      <HomeFooter />
      <Features />
      <About />
      <Faq />
    </main>
  );
}

