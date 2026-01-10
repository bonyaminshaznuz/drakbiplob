import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './routes/Home';
import Appointment from './routes/Appointment';
import AppointmentManage from './routes/AppointmentManage';
import AppointmentEdit from './routes/AppointmentEdit';
import ScrollToTop from './components/ScrollToTop';

function App() {
  useEffect(() => {
    // Load dynamic favicon, title and description from API
    const loadSiteSettings = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        console.log('Loading site settings from:', `${apiUrl}/api/portfolio/site-settings/`);
        
        const response = await fetch(`${apiUrl}/api/portfolio/site-settings/`);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Site settings data received:', data);
          
          // Update site title (always update, even if empty)
          if (data.site_title && data.site_title.trim()) {
            document.title = data.site_title.trim();
            console.log('Site title updated to:', data.site_title);
          } else {
            // Use default if not set
            document.title = 'Dr. Abul Khayer (Biplob)';
            console.log('Using default site title');
          }
          
          // Update meta description
          let metaDescription = document.querySelector('meta[name="description"]');
          if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
            console.log('Created new meta description tag');
          }
          
          if (data.site_description && data.site_description.trim()) {
            metaDescription.content = data.site_description.trim();
            console.log('Meta description updated to:', data.site_description);
          } else {
            // Set default description if not provided
            metaDescription.content = 'Expert care in Anaesthesiology, ICU, and Pain Management. Dedicated to providing compassionate tailored medical services.';
            console.log('Using default meta description');
          }
          
          // Update Open Graph meta tags for better SEO
          let ogTitle = document.querySelector('meta[property="og:title"]');
          if (!ogTitle) {
            ogTitle = document.createElement('meta');
            ogTitle.setAttribute('property', 'og:title');
            document.head.appendChild(ogTitle);
          }
          ogTitle.content = data.site_title && data.site_title.trim() ? data.site_title.trim() : 'Dr. Abul Khayer (Biplob)';
          
          let ogDescription = document.querySelector('meta[property="og:description"]');
          if (!ogDescription) {
            ogDescription = document.createElement('meta');
            ogDescription.setAttribute('property', 'og:description');
            document.head.appendChild(ogDescription);
          }
          ogDescription.content = data.site_description && data.site_description.trim() ? data.site_description.trim() : 'Expert care in Anaesthesiology, ICU, and Pain Management.';
          
          // Update favicon
          const faviconUrl = data.favicon_url;
          if (faviconUrl) {
            // Remove existing favicon links
            const existingLinks = document.querySelectorAll("link[rel*='icon']");
            existingLinks.forEach(link => link.remove());
            
            // Detect favicon type from URL extension
            const getFaviconType = (url) => {
              const extension = url.split('.').pop().toLowerCase().split('?')[0]; // Remove query params
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
        } else {
          console.error('Failed to fetch site settings. Status:', response.status);
        }
      } catch (error) {
        console.error('Error loading site settings:', error);
        // Set defaults on error
        document.title = 'Dr. Abul Khayer (Biplob)';
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
