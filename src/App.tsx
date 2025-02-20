import { FormattedMessage, FormattedNumber, FormattedDate, FormattedTime, FormattedRelativeTime, FormattedTimeParts } from 'react-intl';
import './App.css';
import { useContext, Fragment } from 'react';
import { LanguageContext } from './components/g11n/LanguageContext';
import { Listbox, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { ChevronDownIcon, CheckIcon, GlobeAltIcon } from '@heroicons/react/20/solid';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'ca', name: 'Català' },
];

function App() {
  const { changeLanguage, locale } = useContext(LanguageContext);
  const language = locale;
  const numero = 12345678.9;
  const precio = 23.56;
  const fecha = new Date();

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12'>
      <div className='container mx-auto p-6 max-w-2xl bg-white rounded-xl shadow-lg'>
        <div className="flex items-center gap-2 mb-8 pb-6 border-b border-gray-100">
          <GlobeAltIcon className="h-6 w-6 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">
            <FormattedMessage id="app.title" defaultMessage="g11n" />
          </h1>
        </div>

        <div className="w-72 mb-12">
          <Listbox value={locale} onChange={(value) => changeLanguage(value)}>
            <div className="relative mt-1">
              <Listbox.Label className="block text-sm font-semibold text-gray-700 mb-2">
                <FormattedMessage id="app.languageSelector" defaultMessage="Select language:" />
              </Listbox.Label>
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-3 pl-4 pr-10 text-left border border-gray-300 hover:border-indigo-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm">
                <span className="block truncate">{languages.find(lang => lang.code === locale)?.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {languages.map((lang) => (
                    <ListboxOption
                      key={lang.code}
                      value={lang.code}
                      className={({ active }) =>
                        `relative cursor-default select-none py-3 pl-10 pr-4 ${active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {lang.name}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                              <CheckIcon className="h-5 w-5" />
                            </span>
                          )}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </Listbox>
        </div>

        <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
          <p className="flex items-center justify-between text-gray-700 p-3 bg-white rounded-md shadow-sm">
            <span className="font-medium"><FormattedMessage id="app.label.language" />:</span>
            <span className="text-indigo-600">{language}</span>
          </p>
          <p className="flex items-center justify-between text-gray-700 p-3 bg-white rounded-md shadow-sm">
            <span className="font-medium"><FormattedMessage id="app.label.number" />:</span>
            <span className="text-indigo-600"><FormattedNumber value={numero} style="decimal" /></span>
          </p>
          <p className="flex items-center justify-between text-gray-700 p-3 bg-white rounded-md shadow-sm">
            <span className="font-medium"><FormattedMessage id="app.label.amount" />:</span>
            <span className="text-indigo-600"><FormattedNumber value={precio} style="currency" currency="EUR" /></span>
          </p>
          <p className="flex items-center justify-between text-gray-700 p-3 bg-white rounded-md shadow-sm">
            <span className="font-medium"><FormattedMessage id="app.label.date" />:</span>
            <span className="text-indigo-600">
              <FormattedDate value={fecha} year="numeric" month="long" day="2-digit" />,{' '}
              <FormattedTime value={fecha} />h
            </span>
          </p>
          <p className="flex items-center justify-between text-gray-700 p-3 bg-white rounded-md shadow-sm">
            <span className="font-medium"><FormattedMessage id="app.label.date" />:</span>
            <span className="text-indigo-600">
              <FormattedRelativeTime value={0} numeric='auto' style='long' updateIntervalInSeconds={1}></FormattedRelativeTime>
            </span>
          </p>
          <p className="flex items-center justify-between text-gray-700 p-3 bg-white rounded-md shadow-sm">
            <span className="font-medium"><FormattedMessage id="app.label.date" />:</span>
            <span className="text-indigo-600">
              <FormattedTimeParts value={new Date()}>
                {parts => (
                  <>
                    <b>{parts[0].value}</b>
                    {parts[1].value}
                    <small>{parts[2].value}</small>
                  </>
                )}
              </FormattedTimeParts>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
