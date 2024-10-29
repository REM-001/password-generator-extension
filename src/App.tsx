import  { useState, useEffect } from 'react';
import { Copy, Save, Shield, Trash } from 'lucide-react';
import './index.css'


interface SavedPassword {
  password: string;
  timestamp: number;
}

function App() {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [savedPasswords, setSavedPasswords] = useState<SavedPassword[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('savedPasswords');
    if (saved) {
      setSavedPasswords(JSON.parse(saved));
    }
  }, []);

  const generatePassword = () => {
    const charset = {
      letters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    let chars = charset.letters;
    if (includeNumbers) chars += charset.numbers;
    if (includeSymbols) chars += charset.symbols;

    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const savePassword = () => {
    if (!password) return;
    const newSavedPasswords = [...savedPasswords, { password, timestamp: Date.now() }];
    setSavedPasswords(newSavedPasswords);
    localStorage.setItem('savedPasswords', JSON.stringify(newSavedPasswords));
  };

  const deletePassword = (index: number) => {
    const newSavedPasswords = savedPasswords.filter((_, i) => i !== index);
    setSavedPasswords(newSavedPasswords);
    localStorage.setItem('savedPasswords', JSON.stringify(newSavedPasswords));
  };

  return (
    <div className="w-[350px] min-h-[400px] bg-gray-900 text-white p-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-6 h-6 text-red-500" />
        <h1 className="text-xl font-bold">Secure Pass Generator</h1>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-2">Password Length: {length}</label>
          <input
            type="range"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
          />
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="rounded bg-gray-700 border-gray-600 text-red-500 focus:ring-red-500"
            />
            <span className="text-sm">Numbers</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="rounded bg-gray-700 border-gray-600 text-red-500 focus:ring-red-500"
            />
            <span className="text-sm">Symbols</span>
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Generate Password
        </button>

        {password && (
          <div className="relative mt-4">
            <div className="bg-gray-800 p-3 rounded-lg break-all">
              {password}
            </div>
            <div className="absolute right-2 top-2 flex gap-2">
              <button
                onClick={copyToClipboard}
                className="p-1 hover:text-red-500 transition-colors"
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={savePassword}
                className="p-1 hover:text-red-500 transition-colors"
                title="Save password"
              >
                <Save className="w-4 h-4" />
              </button>
            </div>
            {copied && (
              <div className="absolute -top-8 right-0 bg-green-500 text-white text-sm py-1 px-2 rounded">
                Copied!
              </div>
            )}
          </div>
        )}

        {savedPasswords.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Saved Passwords</h2>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {savedPasswords.map((saved, index) => (
                <div key={saved.timestamp} className="flex items-center justify-between bg-gray-800 p-2 rounded-lg">
                  <span className="text-sm truncate mr-2">{saved.password}</span>
                  <button
                    onClick={() => deletePassword(index)}
                    className="p-1 hover:text-red-500 transition-colors"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;