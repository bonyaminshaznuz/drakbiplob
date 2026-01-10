import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './routes/Home';
import Appointment from './routes/Appointment';
import AppointmentManage from './routes/AppointmentManage';
import AppointmentEdit from './routes/AppointmentEdit';
import ScrollToTop from './components/ScrollToTop';

function App() {
  useEffect(() => {
    // Load dynamic favicon and title from API
    const loadSiteSettings = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/api/portfolio/site-settings/`);
        if (response.ok) {
          const data = await response.json();
          
          // Update title
          if (data.site_title) {
            document.title = data.site_title;
            // Also update meta description if available
            if (data.site_description) {
              let metaDescription = document.querySelector('meta[name="description"]');
              if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.name = 'description';
                document.head.appendChild(metaDescription);
              }
              metaDescription.content = data.site_description;
            }
          }
          
          // Update favicon
          const faviconUrl = data.favicon_url;
          if (faviconUrl) {
            // Remove existing favicon links
            const existingLinks = document.querySelectorAll("link[rel*='icon']");
            existingLinks.forEach(link => link.remove());
            
            // Detect favicon type from URL extension
            const getFaviconType = (url) => {
              const extension = url.split('.').pop().toLowerCase();
              if (extension === 'svg') return 'image/svg+xml';
              if (extension === 'ico') return 'image/x-icon';
              if (extension === 'png') return 'image/png';
              if (extension === 'jpg' || extension === 'jpeg') return 'image/jpeg';
              return 'image/png'; // default
            };
            
            // Create new favicon link
            const link = document.createElement('link');
            link.rel = 'icon';
            link.type = getFaviconType(faviconUrl);
            link.href = faviconUrl;
            document.head.appendChild(link);
            
            // Also add apple-touch-icon for better mobile support
            const appleLink = document.createElement('link');
            appleLink.rel = 'apple-touch-icon';
            appleLink.href = faviconUrl;
            document.head.appendChild(appleLink);
            
            console.log('Favicon loaded successfully:', faviconUrl);
          } else {
            console.log('No favicon URL found in site settings');
          }
        }
      } catch (error) {
        console.error('Error loading site settings:', error);
      }
    };
    
    loadSiteSettings();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/appointment-manage" element={<AppointmentManage />} />
        <Route path="/appointment-edit" element={<AppointmentEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
