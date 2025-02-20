import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { IntlProvider } from 'react-intl';
import { LanguageProvider } from './components/g11n/LanguageProvider.tsx';
import { useContext } from 'react';
import { LanguageContext } from './components/g11n/LanguageContext.tsx';

const Root = () => {
  const { locale, messages } = useContext(LanguageContext);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <App />
    </IntlProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <Root/>
    </LanguageProvider>
  </StrictMode>,
)
