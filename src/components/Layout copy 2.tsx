
import Navbar from "@components/Navbar-2";
import Drawer from "@components/Drawer";
import Footer from "@components/Footer";

interface LayoutProps {
    children: JSX.Element
  }

  const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="bg-base-300 drawer">
            <input id="drawer" type="checkbox" className="drawer-toggle"></input>
            <div className="drawer-content" style={{scrollBehavior: 'smooth', scrollPaddingTop: '5rem'}}>
                <Navbar/>
                <main>{children}</main>
                <Footer />
            </div>
            <Drawer />
        </div>
    )
  }
  
  export default Layout