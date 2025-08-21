import React, { useState, useEffect } from 'react';
import { X, Key, Shield, Download } from 'lucide-react';

interface TwoFactorAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TwoFactorAuthModal: React.FC<TwoFactorAuthModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [qrCodeDataURL, setQrCodeDataURL] = useState('');
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && step === 1) {
      const generateSecret = async () => {
        try {
          const response = await fetch('/api/user/2fa/generate-secret', { method: 'POST' });
          const data = await response.json();
          if (response.ok) {
            setQrCodeDataURL(data.qrCodeDataURL);
            setRecoveryCodes(data.recoveryCodes);
          } else {
            setError(data.error);
          }
        } catch (err) {
          setError('Failed to generate 2FA secret.');
        }
      };
      generateSecret();
    }
  }, [isOpen, step]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/user/2fa/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (response.ok) {
        setStep(3); // Success step
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to verify token.');
    }
  };

  const downloadRecoveryCodes = () => {
    const blob = new Blob([recoveryCodes.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stylusqr-recovery-codes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Two-Factor Authentication Setup</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Step 1: Scan QR Code</h3>
            <p className="text-sm text-gray-600 mb-4">Scan this QR code with your authenticator app (e.g., Google Authenticator).</p>
            <div className="flex justify-center my-4">
              {qrCodeDataURL ? <img src={qrCodeDataURL} alt="2FA QR Code" /> : <p>Loading QR code...</p>}
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full px-6 py-2 bg-[#063970] text-white rounded-lg hover:bg-[#052c5c] transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Step 2: Verify Token & Save Recovery Codes</h3>
            <p className="text-sm text-gray-600 mb-4">Enter the 6-digit code from your authenticator app.</p>
            <form onSubmit={handleVerify} className="space-y-4">
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063970]"
                required
              />
              <button
                type="submit"
                className="w-full px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Verify & Enable 2FA
              </button>
            </form>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Recovery Codes</h4>
              <p className="text-sm text-gray-600 mb-4">Save these recovery codes in a safe place. They can be used to access your account if you lose your device.</p>
              <div className="bg-gray-100 p-4 rounded-lg grid grid-cols-2 gap-2">
                {recoveryCodes.map((code, i) => <p key={i} className="font-mono text-sm">{code}</p>)}
              </div>
              <button
                onClick={downloadRecoveryCodes}
                className="mt-4 flex items-center gap-2 text-sm text-[#063970] hover:underline"
              >
                <Download className="w-4 h-4" />
                Download Codes
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="flex flex-col items-center text-center">
              <Shield className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Two-Factor Authentication Enabled!</h3>
              <p className="text-gray-600">You have successfully enabled 2FA. You will be asked for a token the next time you log in.</p>
              <button
                onClick={onClose}
                className="mt-6 w-full px-6 py-2 bg-[#063970] text-white rounded-lg hover:bg-[#052c5c] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TwoFactorAuthModal;
