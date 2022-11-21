
import Navbar from "@components/Navbar-2";
import Footer from "@components/Footer";

interface LayoutProps {
    children: JSX.Element
  }

  const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="bg-base-100 ">
            <div className="drawer-content" style={{scrollBehavior: 'smooth', scrollPaddingTop: '5rem'}}>
                <Navbar/>
                <main>{children}</main>
                <Footer />
            </div>
        </div>
    )
  }
  
  export default Layout