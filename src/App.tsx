import Home from "./pages";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <main className="border border-red-900 min-h-screen w-full">
      <Home />{" "}
      <ToastContainer/>
    </main>
  );
}

export default App;
