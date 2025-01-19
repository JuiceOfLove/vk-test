import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "./components/ui/provider"
import './assets/styles/global.css'
import App from './components/screen/App.tsx'
import Store from './store/index.ts'

const store = new Store();

export const Context = createContext({
  store,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Context.Provider value={{
      store
    }}>
      <Provider>
        <App />
      </Provider>
    </Context.Provider>
  </StrictMode>,
)
