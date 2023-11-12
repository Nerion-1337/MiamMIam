import ReactDOM from 'react-dom/client'
import App from '#App.tsx'
import '#css/_map.scss'
//
//REDUX
import { Provider } from 'react-redux'
import { store } from '#/reducers/store'
//
//
// RENDER
//
//
const rootElement = document.getElementById('root');
if (rootElement)
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <App />
    </Provider>
  );