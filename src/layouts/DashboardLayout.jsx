import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../index.css"

function DashboardLayout(props){
    return(
        <div className="app-layout">
            <Sidebar/>

            <div className="main-section">
                <Navbar/>
            
                <main className="page-content">
                    {props.children}
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout;