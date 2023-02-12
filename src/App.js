import Router from "./router/Router";
import { BrowserRouter } from "react-router-dom";
import ProviderLayout from "./context/ProviderLayout";

function App() {
  return (
    <div>
      <ProviderLayout>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ProviderLayout>
    </div>
  );
}

export default App;
