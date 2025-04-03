/*
  Composant react :
      capitaliser le nom du composant
      fonction JS/TS qui renvoie du HTML
*/

import './reset.css';
import './styles/variables.css';
import './styles/global.css';
import './style.css';
import { UserProvider } from './provider/UserProvider';
import { RouterProvider } from "react-router-dom";
import router from './service/router';



const App = () => {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider >
  );
}
export default App