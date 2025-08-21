import React, { useEffect, useState } from "react";
import { BarChart3, TrendingUp, Users, QrCode, Calendar, Download, Eye, Smartphone } from "lucide-react";

interface AnalyticsProps {
  totalScans: number;
  qrCodesCreated: number;
  qrCodeId?: number; // Add qrCodeId prop for filtering
  userId?: number; // Add userId prop for user filtering
}

const Analytics: React.FC<AnalyticsProps> = ({ totalScans, qrCodesCreated, qrCodeId, userId }) => {
  const [last7Days, setLast7Days] = useState<{ [date: string]: number }>({});
  const [last6Months, setLast6Months] = useState<{ [month: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [mobileScans, setMobileScans] = useState<number>(0);
  const [downloads, setDownloads] = useState<number>(0);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        let url = '/api/qr/stats';
        const params = new URLSearchParams();
        
        if (qrCodeId) {
          params.append('qr_code_id', qrCodeId.toString());
        }
        
        if (userId) {
          params.append('user_id', userId.toString());
        }
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
        
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setLast7Days(data.last7Days || {});
          setLast6Months(data.last6Months || {});
        }
      } catch (e) {
        setLast7Days({});
        setLast6Months({});
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [qrCodeId, userId]);

  useEffect(() => {
    const fetchMobileScans = async () => {
      try {
        const userRes = await fetch('/api/auth/user');
        if (!userRes.ok) return;
        const userData = await userRes.json();
        const userId = userData?.user?.id;
        if (!userId) return;
        const res = await fetch(`/api/qr/mobile-scan-counts?userId=${userId}`);
        if (res.ok) {
          const data = await res.json();
          setMobileScans(data.mobileScans || 0);
        }
      } catch {}
    };
    fetchMobileScans();
  }, []);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const userRes = await fetch('/api/auth/user');
        if (!userRes.ok) return;
        const userData = await userRes.json();
        const userId = userData?.user?.id;
        if (!userId) return;
        const res = await fetch(`/api/qr/downloads-count?userId=${userId}`);
        if (res.ok) {
          const data = await res.json();
          setDownloads(data.downloads || 0);
        }
      } catch {}
    };
    fetchDownloads();
  }, []);

  useEffect(() => {
    const fetchActivity = async () => {
      const userRes = await fetch('/api/auth/user');
      const userData = await userRes.json();
      const userId = userData?.user?.id;
      if (!userId) return;
      const res = await fetch(`/api/qr/recent-activity?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        setRecentActivity(data.activities || []);
      }
    };
    fetchActivity();
  }, []);

  // Prepare chart data
  const last7DaysLabels = Object.keys(last7Days);
  const last7DaysData = Object.values(last7Days);
  const max7 = Math.max(...last7DaysData, 1);

  // Calculate Y-axis max value with better scaling
  const yAxisMax = Math.max(Math.ceil(max7 * 1.2), 5); // Add 20% padding and ensure minimum of 5

  // Debug: Log chart data to see what values we have
  console.log('Analytics - Last 7 days data:', last7Days);
  console.log('Analytics - Last 7 days labels:', last7DaysLabels);
  console.log('Analytics - Last 7 days data values:', last7DaysData);
  console.log('Analytics - Max value:', max7);
  console.log('Analytics - Y-axis max:', yAxisMax);

  const last6MonthsLabels = Object.keys(last6Months);
  const last6MonthsData = Object.values(last6Months);
  const max6 = Math.max(...last6MonthsData, 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-8 h-8 text-[#063970]" />
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Scans</p>
              <p className="text-2xl font-bold text-gray-900">{totalScans}</p>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +12.5%
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">QR Codes Created</p>
              <p className="text-2xl font-bold text-gray-900">{qrCodesCreated}</p>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +8.2%
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <QrCode className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Downloads</p>
              <p className="text-2xl font-bold text-gray-900">{downloads}</p>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +15.3%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Mobile Scans</p>
              <p className="text-2xl font-bold text-gray-900">{mobileScans}</p>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +18.7%
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scan Activity Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Scan Activity (Last 7 Days)</h3>
          <div className="h-64 relative">
            {/* Y-axis title */}
            <div className="absolute -left-8 top-1/2 transform -rotate-90 origin-center text-xs text-gray-500 font-medium pointer-events-none z-10">
              Number of Scans
            </div>
            {loading ? (
              <div className="w-full text-center text-gray-400">Loading...</div>
            ) : last7DaysLabels.length === 0 ? (
              <div className="w-full text-center text-gray-400">No data</div>
            ) : (
              <div className="flex h-full">
                {/* Y-axis labels */}
                <div className="flex flex-col justify-between text-xs text-gray-500 pr-2 w-12 pb-4">
                  {Array.from({ length: yAxisMax + 1 }, (_, i) => {
                    const value = yAxisMax - i;
                    return (
                      <div key={i} className="text-right font-medium text-gray-600">
                        {value}
                      </div>
                    );
                  })}
                </div>
                
                {/* Chart area */}
                <div className="flex-1 flex flex-col relative">
                  {/* Chart bars area */}
                  <div className="flex items-end justify-between gap-2 relative" style={{ height: '232px' }}>
                    {/* Y-axis line */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300"></div>
                   {/* Y-axis line */}
                   <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-300"></div>
                    
                    {/* Y-axis grid lines - only at 0 and 5 */}
                    <div className="absolute inset-0 flex flex-col justify-between">
                      {/* Grid line at 0 (bottom) */}
                      <div className="border-t border-gray-300" style={{ height: '1px' }}></div>
                      {/* Grid line at 5 (top) */}
                      <div className="border-t border-gray-300" style={{ height: '1px' }}></div>
                    </div>
                    
                    {/* Bars */}
                    {last7DaysLabels.map((label, index) => (
                      <div key={label} className="flex-1 flex flex-col items-center relative z-10 group">
                        <div
                          className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t cursor-pointer transition-all duration-200 hover:from-blue-600 hover:to-blue-400"
                          style={{ height: `${(last7DaysData[index] / yAxisMax) * 232}px` }}
                ></div>
                        
                        {/* Hover tooltip */}
                        <div className="absolute bottom-full mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                          {last7DaysData[index]} scans
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* X-axis labels positioned at the 0 Y-level line */}
                  <div className="flex justify-between gap-2 mt-2">
                    {last7DaysLabels.map((label, index) => (
                      <span key={label} className="text-xs text-gray-500 font-medium flex-1 text-center">
                  {label.slice(5)}
                </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Yearly (Last 6 Months) Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Yearly (Last 6 Months)</h3>
          <div className="flex flex-col items-center">
            {loading ? (
              <div className="w-full text-center text-gray-400">Loading...</div>
            ) : last6MonthsLabels.length === 0 ? (
              <div className="w-full text-center text-gray-400">No data</div>
            ) : (
              <svg width="500" height="240" viewBox="0 0 500 245" className="">
                {/* Line */}
                <polyline
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="3"
                  points={
                    last6MonthsData
                      .map((v, i, arr) => {
                        const y = 220 - ((v - Math.min(...arr)) / (max6 - Math.min(...arr) || 1)) * 180;
                        const x = 36 + i * 85;
                        return `${x},${y}`;
                      })
                      .join(' ')
                  }
                />
                {/* Dots */}
                {last6MonthsData.map((v, i, arr) => {
                  const y = 220 - ((v - Math.min(...arr)) / (max6 - Math.min(...arr) || 1)) * 180;
                  const x = 36 + i * 85;
                  return (
                    <circle key={i} cx={x} cy={y} r="5" fill="#22c55e" stroke="#fff" strokeWidth="2" />
                  );
                })}
              </svg>
            )}
            <div className="flex justify-between" style={{ width: '500px' }}>
              {last6MonthsLabels.map((label, idx) => (
                <span key={label} className="text-xs text-gray-500 text-center" style={{ width: '75px' }}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-1">
          {recentActivity.length === 0 ? (
            <div className="text-gray-400">No recent activity</div>
          ) : recentActivity.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                {item.type === 'scanned' && <Eye className="w-5 h-5 text-blue-600" />}
                {item.type === 'created' && <QrCode className="w-5 h-5 text-green-600" />}
                {item.type === 'updated' && <Calendar className="w-5 h-5 text-orange-600" />}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {item.type === 'scanned' && 'QR Code scanned'}
                  {item.type === 'created' && 'New QR Code created'}
                  {item.type === 'updated' && 'QR Code updated'}
                </p>
                <p className="text-sm text-gray-600">
                  QR id: {item.qrId} - {new Date(item.date).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics; 