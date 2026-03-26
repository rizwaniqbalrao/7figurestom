import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import Header from "./components/feature/Header";
import Footer from "./components/feature/Footer";
import LanguageBanner from "./components/feature/LanguageBanner";

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <Header />
      <AppRoutes />
      <Footer />
      <LanguageBanner />
    </BrowserRouter>
  );
}

export default App;