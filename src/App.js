import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import Gallery2 from "./components/Galley2";
import Gallery3 from "./components/Gallery3";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Gallery title="Galactic Wars" searchMovie="Star Wars" />
      <Gallery2 title="Stan Lee's Story" searchMovie="Marvel" />
      <Gallery3 title="Wizard's movie" searchMovie="Harry Potter" />

      <Footer />
    </>
  );
}

export default App;
