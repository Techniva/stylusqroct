import React from 'react';

interface QRAnalyticsReportProps {
  logoUrl?: string;
  qrImage: string;
  businessType: string;
  qrType: string;
  createdAt: string;
  updatedAt: string;
  activeLink: string;
  lastLink?: string;
  dynamicLink?: string;
  scans: number;
  updates: number;
  status: boolean;
  scanActivity: { [date: string]: number };
  yearlyActivity: { [month: string]: number };
  performance: {
    top: { place: string; count: number }[];
    bottom: { place: string; count: number }[];
  };
  deviceAnalytics: { [os: string]: number };
}

const PIE_COLORS = ["#3b82f6", "#6366f1", "#f59e42", "#10b981", "#ef4444", "#a855f7", "#fbbf24", "#14b8a6", "#eab308", "#f472b6"];

const QRAnalyticsReport: React.FC<QRAnalyticsReportProps> = ({
  logoUrl = '/file.svg',
  qrImage,
  businessType,
  qrType,
  createdAt,
  updatedAt,
  activeLink,
  lastLink,
  dynamicLink,
  scans,
  updates,
  status,
  scanActivity,
  yearlyActivity,
  performance,
  deviceAnalytics,
}) => {
  // Pie chart logic (reuse from DevicePieChart)
  const totalDevices = Object.values(deviceAnalytics).reduce((a, b) => a + b, 0);
  const deviceEntries = Object.entries(deviceAnalytics);
  let startAngle = 0;
  const slices = deviceEntries.length > 1 ? deviceEntries.map(([os, count], i) => {
    const angle = (count / totalDevices) * 360;
    const large = angle > 180 ? 1 : 0;
    const endAngle = startAngle + angle;
    const start = polarToCartesian(100, 90, 80, startAngle);
    const end = polarToCartesian(100, 90, 80, endAngle);
    const d = [
      `M 100 90`,
      `L ${start.x} ${start.y}`,
      `A 80 80 0 ${large} 1 ${end.x} ${end.y}`,
      `Z`
    ].join(' ');
    const color = PIE_COLORS[i % PIE_COLORS.length];
    startAngle += angle;
    return { d, color, os, count };
  }) : [];

  function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
    const rad = (angle - 90) * Math.PI / 180.0;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    };
  }

  return (
    <div style={{ width: 800, background: '#fff', padding: 32, borderRadius: 16, fontFamily: 'sans-serif', color: '#222' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <img src={logoUrl} alt="Logo" style={{ width: 48, height: 48, marginRight: 16 }} />
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>QR Code Analytics Report</h1>
          <div style={{ fontSize: 14, color: '#666' }}>Generated on {new Date().toLocaleDateString()}</div>
        </div>
      </div>
      {/* QR Card Info */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24, borderBottom: '1px solid #eee', paddingBottom: 16 }}>
        <img src={qrImage} alt="QR Code" style={{ width: 80, height: 80, borderRadius: 8, border: '1px solid #eee', marginRight: 24 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{businessType}</div>
          <div style={{ fontSize: 14, color: '#e67e22', fontWeight: 600 }}>{qrType}</div>
          <div style={{ fontSize: 12, color: '#888' }}>Created: {createdAt}</div>
          <div style={{ fontSize: 12, color: '#888' }}>Modified: {updatedAt}</div>
          <div style={{ fontSize: 12, color: status ? '#27ae60' : '#c0392b', fontWeight: 600 }}>{status ? 'Active' : 'Inactive'}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#063970' }}>{scans}</div>
          <div style={{ fontSize: 12, color: '#e67e22' }}>Scans</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#063970' }}>{updates}</div>
          <div style={{ fontSize: 12, color: '#2980b9' }}>Updates</div>
        </div>
      </div>
      {/* Links */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: '#27ae60', fontWeight: 600 }}>Active Link: <span style={{ color: '#063970' }}>{activeLink}</span></div>
        {lastLink && <div style={{ fontSize: 13, color: '#888' }}>Previous Link: <span style={{ color: '#063970' }}>{lastLink}</span></div>}
        {dynamicLink && <div style={{ fontSize: 13, color: '#2980b9' }}>Dynamic Link: <span style={{ color: '#063970' }}>{dynamicLink}</span></div>}
      </div>
      {/* Analytics Sections */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        {/* Scan Activity (Last 7 Days) */}
        <div style={{ flex: 1, border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#063970', marginBottom: 8 }}>Scan Activity (Last 7 Days)</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: 80, gap: 4 }}>
            {Object.entries(scanActivity).map(([label, value], idx, arr) => {
              const max = Math.max(...Object.values(scanActivity), 1);
              return (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <div style={{ width: 12, height: `${Math.min((value / max) * 60, 60)}px`, background: '#3b82f6', borderRadius: 4 }}></div>
                  <span style={{ fontSize: 10, color: '#888', marginTop: 2 }}>{label.slice(5)}</span>
                  <span style={{ fontSize: 10, color: '#222', fontWeight: 600 }}>{value}</span>
                </div>
              );
            })}
          </div>
        </div>
        {/* Yearly (Last 6 Months) */}
        <div style={{ flex: 1, border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#063970', marginBottom: 8 }}>Yearly (Last 6 Months)</div>
          <svg width={180} height={80} viewBox="0 0 180 80">
            <polyline
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              points={
                Object.values(yearlyActivity)
                  .map((v, i, arr) => {
                    const max = Math.max(...Object.values(yearlyActivity), 1);
                    const min = Math.min(...Object.values(yearlyActivity));
                    const y = 70 - ((v - min) / (max - min || 1)) * 50;
                    const x = 20 + i * 30;
                    return `${x},${y}`;
                  })
                  .join(' ')
              }
            />
            {Object.values(yearlyActivity).map((v, i, arr) => {
              const max = Math.max(...Object.values(yearlyActivity), 1);
              const min = Math.min(...Object.values(yearlyActivity));
              const y = 70 - ((v - min) / (max - min || 1)) * 50;
              const x = 20 + i * 30;
              return (
                <circle key={i} cx={x} cy={y} r="4" fill="#22c55e" stroke="#fff" strokeWidth="2" />
              );
            })}
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#888', marginTop: 4 }}>
            {Object.keys(yearlyActivity).map(month => (
              <span key={month} style={{ width: 24, textAlign: 'center' }}>{month}</span>
            ))}
          </div>
        </div>
      </div>
      {/* Performance (scans) */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <div style={{ flex: 1, border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#063970', marginBottom: 8 }}>Performance (scans)</div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#27ae60', marginBottom: 4 }}>Top 3 Places</div>
              <ul style={{ fontSize: 12, color: '#27ae60', margin: 0, padding: 0, listStyle: 'none' }}>
                {performance.top.map((item, i) => (
                  <li key={i}>{item.place} <span style={{ color: '#888' }}>({item.count})</span></li>
                ))}
              </ul>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#c0392b', marginBottom: 4 }}>Bottom 3 Places</div>
              <ul style={{ fontSize: 12, color: '#c0392b', margin: 0, padding: 0, listStyle: 'none' }}>
                {performance.bottom.map((item, i) => (
                  <li key={i}>{item.place} <span style={{ color: '#888' }}>({item.count})</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Device Analytics */}
        <div style={{ flex: 1, border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#063970', marginBottom: 8 }}>Device Analytics</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Pie Chart */}
            {deviceEntries.length === 1 ? (
              <svg width={120} height={100} viewBox="0 0 100 90" style={{ marginBottom: 8 }}>
                <circle cx={50} cy={45} r={40} fill={PIE_COLORS[0]} />
              </svg>
            ) : (
              <svg width={120} height={100} viewBox="0 0 100 90" style={{ marginBottom: 8 }}>
                {slices.map((slice, i) => (
                  <path key={i} d={slice.d.replace(/100 90/g, '50 45').replace(/80/g, '40')} fill={slice.color} />
                ))}
              </svg>
            )}
            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 8 }}>
              {deviceEntries.map(([os, count], i) => (
                <div key={os} style={{ display: 'flex', alignItems: 'center', fontSize: 11, marginRight: 8 }}>
                  <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 5, background: PIE_COLORS[i % PIE_COLORS.length], marginRight: 4 }} />
                  <span>{os}</span>
                </div>
              ))}
            </div>
            {/* Table */}
            <table style={{ width: '100%', fontSize: 11, background: '#f9fafb', borderRadius: 4 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: 4 }}>Device</th>
                  <th style={{ textAlign: 'left', padding: 4 }}>Scans</th>
                  <th style={{ textAlign: 'left', padding: 4 }}>%</th>
                </tr>
              </thead>
              <tbody>
                {deviceEntries.map(([os, count], i) => {
                  const percent = totalDevices > 0 ? ((count / totalDevices) * 100).toFixed(1) : '0.0';
                  return (
                    <tr key={os}>
                      <td style={{ padding: 4 }}>{os}</td>
                      <td style={{ padding: 4 }}>{count}</td>
                      <td style={{ padding: 4 }}>{percent}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRAnalyticsReport; 