import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="text-center mt-10">Home Page Content</div>
    </BrowserRouter>
  );
}

export default App;

// function App() {
//   return (
//     <div className="text-3xl text-center mt-20 text-green-600">
//       App is rendering ✅
//     </div>
//   );
// }

// export default App;
