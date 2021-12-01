import './App.css';
import AppGlobalProvider from './context/AppContext';
import AppNavigation from './navigation/AppNavigation';

const App = () => {
  return (
    <>
      <AppGlobalProvider>
        <AppNavigation>

        </AppNavigation>
      </AppGlobalProvider>

    </>
  );
}

export default App;
