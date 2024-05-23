import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="app-layout">
        <Sidebar />
      <div>
      <Navbar />
        
          {children} {/* This will be the area where your main content renders */}
       
      </div>
      <style jsx>{`
        .app-layout {
            display: grid;
            grid-template-columns: auto 1fr;
        }
      `}</style>
    </div>
  );
}