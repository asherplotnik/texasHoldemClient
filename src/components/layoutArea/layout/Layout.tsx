import "./Layout.css";
import Header from "../Header/Header";
import { BrowserRouter } from "react-router-dom";
import Routing from "../routing/Routing";
import { CssBaseline } from "@material-ui/core";
function Layout(): JSX.Element {
    return (
        <BrowserRouter>
        <CssBaseline />
       <div className="Layout">
			<header>
                <Header />
            </header>
            <main>
                <Routing />
            </main>
            <footer>

            </footer>
        </div>
        </BrowserRouter>
    );
}

export default Layout;
