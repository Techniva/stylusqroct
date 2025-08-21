import React, { useEffect, useState } from "react";
import { ResponsiveLine } from '@nivo/line';

interface TopQrCode {
  id: number;
  scanCount: number;
  topLocation: string;
  topDevice: string;
  qrCodeImagePath?: string | null;
  uniqueCode?: string | null;
  activeLink?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

interface SubscriptionData {
  planName: string;
  planDescription: string;
  priceMonthly: number;
  priceYearly: number;
  qrCodesLimit: number;
  qrCodesUsed: number;
  features: string[];
  isActive: boolean;
  subscriptionStart?: string;
  subscriptionEnd?: string;
}

const DashboardMainContent: React.FC = () => {
  const [last7Days, setLast7Days] = useState<{ [date: string]: number }>({});
  const [topQrCode, setTopQrCode] = useState<TopQrCode | null>(null);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [monthlyScanCount, setMonthlyScanCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch user from API (cookie/session-based)
        const userRes = await fetch('/api/auth/user');
        if (!userRes.ok) {
          setError('User not found');
          setLoading(false);
          return;
        }
        const userData = await userRes.json();
        const userId = userData?.user?.id;
        if (!userId) {
          setError('User not found');
          setLoading(false);
          return;
        }

        // Fetch dashboard stats
        const res = await fetch(`/api/qr/dashboard-stats?userId=${userId}`);
        if (!res.ok) throw new Error('Failed to fetch dashboard stats');
        const data = await res.json();
        setLast7Days(data.last7Days || {});
        setTopQrCode(data.topQrCode || null);

        // Fetch monthly scan count
        const monthlyRes = await fetch(`/api/qr/scan-counts?userId=${userId}&period=month`);
        if (monthlyRes.ok) {
          const monthlyData = await monthlyRes.json();
          console.log('Monthly scan count:', monthlyData.scanCount);
          setMonthlyScanCount(monthlyData.scanCount || 0);
        }

        // Fetch subscription data
        const subscriptionRes = await fetch('/api/subscription/user-data?t=' + Date.now());
        if (subscriptionRes.ok) {
          const subscriptionData = await subscriptionRes.json();
          console.log('Dashboard subscription data:', subscriptionData);
          console.log(subscriptionData.qrCodesLimit);
          setSubscriptionData(subscriptionData);
        }
      } catch (e: any) {
        setError(e.message || 'Error loading dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Prepare Nivo chart data - show all 7 days regardless of scan count
  const chartData = Object.entries(last7Days)
    .map(([date, count], index) => ({
      id: `scan-${index}`, // Unique key for each data point
      x: new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }),
      y: count,
    }));

  // Calculate max value for Y-axis ticks
  const maxValue = Math.max(...chartData.map(d => d.y), 0);
  
  // Generate tick values based on the range
  let tickValues;
  if (maxValue <= 10) {
    // For small ranges, show every number
    tickValues = Array.from({ length: maxValue + 1 }, (_, i) => i);
  } else if (maxValue <= 100) {
    // For medium ranges, show every 10th number
    tickValues = Array.from({ length: Math.ceil(maxValue / 10) + 1 }, (_, i) => i * 10);
  } else {
    // For large ranges, show every 50th or 100th number
    const step = maxValue <= 500 ? 50 : 100;
    tickValues = Array.from({ length: Math.ceil(maxValue / step) + 1 }, (_, i) => i * step);
  }

  // Debug: Log chart data to see what values we have
  console.log('Chart data:', chartData);
  console.log('Last 7 days data:', last7Days);

  const nivoData = [
    {
      id: 'Scans',
      color: 'hsl(262, 70%, 50%)',
      data: chartData,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Scan Trends Chart */}
        <div className="md:col-span-2 bg-white rounded-xl shadow p-4">
          <div >
            <span className="font-semibold text-gray-800 mb-2">Scan Activity (Last 7 Days)  </span>
            <span className="text-xs text-gray-500 mb-4">(Shows daily scan counts)</span>
          </div>
          
          <div className="h-64 w-full">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center text-gray-400">Loading...</div>
            ) : error ? (
              <div className="w-full h-full flex items-center justify-center text-red-400">{error}</div>
            ) : nivoData[0].data.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-400 text-lg mb-2">No scan activity</div>
                  <div className="text-gray-300 text-sm">Create and share QR codes to see scan data here</div>
                </div>
              </div>
            ) : (
              <ResponsiveLine
                data={nivoData}
                margin={{ top: 40, right: 30, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ 
                  type: 'linear', 
                  min: 0, 
                  max: Math.max(...chartData.map(d => d.y), 3), 
                  stacked: false, 
                  reverse: false,
                  nice: true,
                  clamp: false
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: '',
                  legendOffset: 36,
                  legendPosition: 'middle',
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Number of scans',
                  legendOffset: -40,
                  legendPosition: 'middle',
                  tickValues: tickValues
                }}
                pointSize={8}
                pointColor="#063970"
                pointBorderWidth={2}
                pointBorderColor="#063970"
                pointLabelYOffset={-12}
                useMesh={true}
                enableGridX={false}
                enableGridY={true}
                colors={['#063970']}
                theme={{
                  axis: {
                    ticks: {
                      text: { fontSize: 12, fill: '#555' },
                    },
                    legend: {
                      text: { fontSize: 14, fill: '#222' },
                    },
                  },
                  grid: {
                    line: { stroke: '#e5e7eb', strokeWidth: 1 },
                  },
                  tooltip: {
                    container: { fontSize: 14 },
                  },
                }}
                enablePoints={true}
                enableArea={true}
                areaOpacity={0.3}
                
                lineWidth={2}
                enableSlices="x"
              />
            )}
          </div>
        </div>
        {/* Account Details & Subscriptions */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow p-4">
            <div className="font-semibold text-gray-800 mb-3">Your Subscriptions</div>
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-6 h-6 text-[#063970]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/></svg>
              <span className="font-medium">Plan: {subscriptionData?.planName || 'Free'}</span>
              <span className={`ml-auto text-xs font-semibold ${subscriptionData?.isActive ? 'text-green-600' : 'text-red-600'}`}>
                {subscriptionData?.isActive ? 'Active' : 'Suspended'}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              <div className="flex items-center gap-4 justify-between">
                <span>
                  Subscribed on: <span className="font-semibold text-gray-700">
                    {subscriptionData?.subscriptionStart ? new Date(subscriptionData.subscriptionStart).toLocaleDateString() : 'N/A'}
                  </span>
                </span>
                <span>
                  Valid until: <span className="font-semibold text-gray-700">
                    {subscriptionData?.subscriptionEnd ? new Date(subscriptionData.subscriptionEnd).toLocaleDateString() : 'N/A'}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <div className="font-semibold text-gray-800 mb-3">QR Code Scanning Details</div>
            <div className="text-xs text-gray-500 mb-2">Static QR Codes({subscriptionData?.qrCodesUsed}/{subscriptionData?.qrCodesLimit === -1 ? 'Unlimited' : subscriptionData?.qrCodesLimit})</div>
            <div className="w-full h-2 bg-gray-200 rounded mb-3 overflow-hidden">
              <div 
                className="h-2 bg-[#063970] rounded transition-all duration-300"
                style={{ 
                  width: `${subscriptionData?.qrCodesLimit ? Math.min((subscriptionData.qrCodesUsed / subscriptionData.qrCodesLimit) * 100, 100) : 0}%` 
                }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mb-2">Dynamic QR Codes({subscriptionData?.qrCodesUsed}/{subscriptionData?.qrCodesLimit === -1 ? 'Unlimited' : subscriptionData?.qrCodesLimit})</div>
            <div className="w-full h-2 bg-gray-200 rounded mb-3 overflow-hidden">
              <div 
                className="h-2 bg-[#063970] rounded transition-all duration-300"
                style={{ 
                  width: `${subscriptionData?.qrCodesLimit ? Math.min((subscriptionData.qrCodesUsed / subscriptionData.qrCodesLimit) * 100, 100) : 0}%` 
                }}
              ></div>
              
            </div>
            <div className="text-xs text-gray-500 mb-1">QR Code scans for this month: {monthlyScanCount}</div>
            

          </div>
        </div>
      </div>
      {/* Top Performing QR Code */}
      <div className="mt-8 bg-white rounded-xl shadow p-4">
        <div className="font-semibold text-gray-800 mb-2">Top Performing QR Code
          <span className="text-xs text-gray-500 mb-2"> (Data from last 7 days)</span>
        </div>
        
        {loading ? (
          <div className="w-full text-center text-gray-400">Loading...</div>
        ) : error ? (
          <div className="w-full text-center text-red-400">{error}</div>
        ) : !topQrCode ? (
          <div className="w-full text-center text-gray-400">No data</div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 border border-dashed border-gray-200 overflow-hidden">
              {topQrCode.qrCodeImagePath ? (
                <img src={topQrCode.qrCodeImagePath} alt="QR" className="w-full h-full object-contain" />
              ) : (
                '[QR]'
              )}
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-700">QR Code Scans: <span className="font-bold">{topQrCode.scanCount}</span></div>
              <div className="text-xs text-gray-500">Top Location: {topQrCode.topLocation}</div>
              <div className="text-xs text-gray-500">Top Device: {topQrCode.topDevice}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardMainContent;