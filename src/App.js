import React from "react";

import Header from "./containers/Header/Header";
import PagesRouter from "./containers/PagesRouter/PagesRouter";
import SideBar from "./containers/Sidebar/Sidebar";

function App() {
    return (
        <div>
            <Header/>
            <SideBar/>
            <div id="page-wrap">
                <PagesRouter/>
            </div>
        </div>
    );
}

export default App;
