import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet, Svg, Rect, Path, Line, Circle } from '@react-pdf/renderer';

type MyQRReportPDFProps = {
  qr: any;
  stats: any;
  scanCount: number;
  userName: string;
  scanLocations?: {
    locations: Array<{ city: string; country: string; region: string; scanCount: number; displayName: string }>;
    topLocations: Array<{ city: string; country: string; region: string; scanCount: number; displayName: string }>;
    bottomLocations: Array<{ city: string; country: string; region: string; scanCount: number; displayName: string }>;
    totalScans: number;
  };
};

const COLORS = {
  blue: '#3b82f6',
  green: '#22c55e',
  orange: '#f59e42',
  red: '#ef4444',
  purple: '#6366f1',
  gray: '#6b7280',
  lightGray: '#f3f4f6',
  border: '#e5e7eb',
  black: '#222',
  white: '#fff',
  darkBlue: '#063970',
};

const PIE_COLORS = [COLORS.blue, COLORS.purple, COLORS.orange, COLORS.green, COLORS.red, '#a855f7', '#fbbf24', '#14b8a6', '#eab308', '#f472b6'];

const MyQRReportPDF = ({ qr, stats, scanCount, userName, scanLocations }: MyQRReportPDFProps) => {
  const styles = StyleSheet.create({
    page: { padding: 24, fontSize: 10, fontFamily: 'Helvetica', backgroundColor: COLORS.lightGray },
    card: { backgroundColor: COLORS.white, borderRadius: 10, border: `1pt solid ${COLORS.border}`, padding: 14, marginBottom: 14 },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
    qrInfo: { flexDirection: 'row', alignItems: 'center' },
    qrImg: { width: 75, height: 75, borderRadius: 8, border: `1pt solid ${COLORS.border}`, marginRight: 10 },
    business: { fontSize: 9, color: COLORS.gray, fontWeight: 500 },
    qrType: { fontSize: 9, color: COLORS.orange, fontWeight: 700, marginBottom: 2 },
    qrId: { fontSize: 9, color: COLORS.blue, fontWeight: 700, marginBottom: 2 },
    date: { fontSize: 9, color: COLORS.gray },
    status: { fontSize: 9, color: COLORS.green, fontWeight: 700, marginTop: 2 },
    statCol: { alignItems: 'flex-end', justifyContent: 'flex-start' },
    statNum: { fontSize: 16, color: COLORS.darkBlue, fontWeight: 700 },
    statLabel: { fontSize: 10, color: COLORS.orange, fontWeight: 700 },
    statLabelBlue: { fontSize: 10, color: COLORS.blue, fontWeight: 700 },
    links: { marginBottom: 8 },
    link: { fontSize: 9, color: COLORS.green, fontWeight: 700 },
    prevLink: { marginVertical: 4, fontSize: 9, color: COLORS.gray },
    dynLink: { fontSize: 9, color: COLORS.blue, fontWeight: 700 },
    grid: { flexDirection: 'column', gap: 0 },
    gridRow: { flexDirection: 'row', width: '100%', gap: 10, marginBottom: 0 },
    gridCol: { flex: 1, backgroundColor: COLORS.white, borderRadius: 10, border: `1pt solid ${COLORS.border} gray`, padding: 10, marginBottom: 10 },
    gridTitle: { fontSize: 11, color: COLORS.darkBlue, fontWeight: 700, marginBottom: 6 },
    perfRow: { flexDirection: 'row', justifyContent: 'space-between' },
    perfCol: { flex: 1 },
    perfTop: { color: COLORS.green, fontWeight: 700, fontSize: 9, marginBottom: 2 },
    perfBottom: { color: COLORS.red, fontWeight: 700, fontSize: 9, marginBottom: 2 },
    perfPlace: { fontSize: 9, marginBottom: 1 },
    perfPlaceRed: { fontSize: 9, color: COLORS.red, marginBottom: 1 },
    perfPlaceGreen: { fontSize: 9, color: COLORS.green, marginBottom: 1 },
    deviceLegend: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
    deviceDot: { width: 8, height: 8, borderRadius: 4, marginRight: 4, marginLeft: 2 },
    deviceTable: { marginTop: 4 },
    deviceTableHeader: { flexDirection: 'row', borderBottom: `1pt solid ${COLORS.border}` },
    deviceTableCell: { fontSize: 8, padding: 2, minWidth: 40 },
    deviceTableCellBold: { fontSize: 8, padding: 2, fontWeight: 700, minWidth: 40 },
    userHeader: { color: COLORS.white, fontSize: 10, marginTop: 2 },
    reportDate: { color: COLORS.white, fontSize: 9, marginTop: 2, marginBottom: 8 },
  });
  // Validate and sanitize device data
  const deviceEntries = Object.entries(stats.devices || {}).filter(([key, value]) => 
    typeof key === 'string' && typeof value === 'number' && !isNaN(value)
  ) as [string, number][];
  const totalDevices = deviceEntries.reduce((a, b) => a + b[1], 0);
  
  // Use real location data if available, otherwise fallback to mock data
  const performance = {
    top: scanLocations?.topLocations?.slice(0, 3).map(loc => ({
      place: loc.displayName || 'Unknown Location',
      count: typeof loc.scanCount === 'number' ? loc.scanCount : 0
    })) || [],
    bottom: scanLocations?.bottomLocations?.slice(0, 3).map(loc => ({
      place: loc.displayName || 'Unknown Location',
      count: typeof loc.scanCount === 'number' ? loc.scanCount : 0
    })) || [],
  };
  const barData = Object.entries(stats.last7Days || {}) as [string, number][];
  const barMax = Math.max(...barData.map(([, v]) => v), 1);
  const lineData = Object.entries(stats.last6Months || {}) as [string, number][];
  const lineMax = Math.max(...lineData.map(([, v]) => v), 1);
  const lineMin = Math.min(...lineData.map(([, v]) => v), 0);
  const today = new Date();
  const reportDate = `${String(today.getDate()).padStart(2,'0')}-${String(today.getMonth()+1).padStart(2,'0')}-${today.getFullYear()}`;
  return (
    <Document>
      <Page style={styles.page}>
        {/* Header */}
        <View style={{ backgroundColor: COLORS.darkBlue, padding: 16, borderRadius: 10, marginBottom: 8 }}>
          <Text style={{ color: COLORS.white, fontSize: 20, fontWeight: 'bold' }}>QR Code Analytics Report</Text>
          <Text style={styles.userHeader}>User: {userName}</Text>
          <Text style={styles.reportDate}>Report generated on: {reportDate}</Text>
        </View>
        
        {/* Card: QR Info and Stats */}
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <View style={styles.qrInfo}>
              <Image src={qr.qrCodeImagePath || '/placeholder.png'} style={styles.qrImg} />
              <View>
                <Text style={styles.qrId}>QR Code ID: {qr.id}</Text>
                <Text style={styles.business}>{qr.qrData.type}</Text>
                <Text style={styles.qrType}>Dynamic QR</Text>
                <Text style={styles.date}>Created: {new Date(qr.createdAt).toLocaleDateString()}</Text>
                <Text style={styles.date}>Modified: {new Date(qr.updatedAt).toLocaleDateString()}</Text>
                <Text style={styles.status}>Status: {qr.qrStatus ? 'Active' : 'Inactive'}</Text>
              </View>
            </View>
            <View style={styles.statCol}>
              <Text style={styles.statNum}>{scanCount}</Text>
              <Text style={styles.statLabel}>Scans</Text>
              <Text style={styles.statNum}>{qr.updateCount}</Text>
              <Text style={styles.statLabelBlue}>Updates</Text>
            </View>
          </View>
          {/* Links */}
          <View style={styles.links}>
            <Text style={styles.link}>Active Link: {qr.qrData.data.url}</Text>
            <Text style={styles.prevLink}>Previous Link: {qr.lastLink}</Text>
          </View>
        </View>
        {/* Analytics Grid */}
        <View style={styles.grid}>
          {/* First row: Scan Activity & Yearly */}
          <View style={styles.gridRow}>
            <View style={styles.gridCol}>
              <Text style={styles.gridTitle}>Scan Activity (Last 7 Days)</Text>
              <Svg width={235} height={60}>
                {barData.map(([date, value], i) => (
                  <Rect
                    key={date}
                    x={i * (235 / barData.length) + 10}
                    y={60 - (value / barMax) * 40 - 10}
                    width={Math.max(12, (235 / barData.length) - 8)}
                    height={(value / barMax) * 40}
                    fill={COLORS.blue}
                    rx={3}
                  />
                ))}
                {/* X axis */}
                <Line x1={10} y1={50} x2={225} y2={50} stroke={COLORS.gray} strokeWidth={1} />
              </Svg>
              <View style={{ flexDirection: 'row', marginTop: 2 }}>
                {barData.map(([date], i) => (
                  <Text key={date} style={{ width: (235 / barData.length), textAlign: 'center', fontSize: 8 }}>{date.slice(5)}</Text>
                ))}
              </View>
              <View style={{ flexDirection: 'row', marginTop: 2 }}>
                {barData.map(([, value], i) => (
                  <Text key={i} style={{ width: (235 / barData.length), textAlign: 'center', fontSize: 8, color: COLORS.black, fontWeight: 700 }}>{value}</Text>
                ))}
              </View>
            </View>
            <View style={styles.gridCol}>
              <Text style={styles.gridTitle}>Yearly (Last 6 Months)</Text>
              <Svg width={250} height={60}>
                {/* Line chart */}
                {lineData.length > 1 && (
                  <Path
                    d={lineData.map(([month, v], i) => {
                      const x = 10 + (i * 210) / (lineData.length - 1);
                      const y = 50 - ((v - lineMin) / (lineMax - lineMin || 1)) * 40;
                      return i === 0 ? `M${x},${y}` : `L${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke={COLORS.green}
                    strokeWidth={2}
                  />
                )}
                {/* Dots */}
                {lineData.map(([month, v], i) => {
                  const x = 10 + (i * 210) / (lineData.length - 1);
                  const y = 50 - ((v - lineMin) / (lineMax - lineMin || 1)) * 40;
                  return <Circle key={month} cx={x} cy={y} r={3} fill={COLORS.green} />;
                })}
                {/* X axis */}
                <Line x1={10} y1={50} x2={230} y2={50} stroke={COLORS.gray} strokeWidth={1} />
              </Svg>
              <View style={{ flexDirection: 'row', marginTop: 2 }}>
                {lineData.map(([month], i) => (
                  <Text key={month} style={{ width: (250 / lineData.length), textAlign: 'center', fontSize: 8 }}>{month}</Text>
                ))}
              </View>
            </View>
          </View>
          {/* Second row: Performance & Device Analytics */}
          <View style={styles.gridRow}>
            <View style={styles.gridCol}>
              <Text style={styles.gridTitle}>Performance (scans)</Text>
              <View style={styles.perfRow}>
                <View style={styles.perfCol}>
                  <Text style={styles.perfTop}>Top 3 Places</Text>
                  {performance.top.map((item, i) => (
                    <Text key={i} style={styles.perfPlaceGreen}>{item.place} <Text style={{ color: COLORS.gray }}>({item.count})</Text></Text>
                  ))}
                </View>
                <View style={styles.perfCol}>
                  <Text style={styles.perfBottom}>Bottom 3 Places</Text>
                  {performance.bottom.map((item, i) => (
                    <Text key={i} style={styles.perfPlaceRed}>{item.place} <Text style={{ color: COLORS.gray }}>({item.count})</Text></Text>
                  ))}
                </View>
              </View>
            </View>
            <View style={styles.gridCol}>
              <Text style={styles.gridTitle}>Device Analytics</Text>
              <View style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start' }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  {/* Pie chart (proportional arcs) */}
                  <Svg width={100} height={100} viewBox="0 0 100 100">
                    {(() => {
                      let startAngle = 0;
                      return deviceEntries.map(([os, count], i) => {
                        const angle = (count / (totalDevices || 1)) * 360;
                        const endAngle = startAngle + angle;
                        const largeArc = angle > 180 ? 1 : 0;
                        const x1 = 50 + 45 * Math.cos((Math.PI * startAngle) / 180);
                        const y1 = 50 + 45 * Math.sin((Math.PI * startAngle) / 180);
                        const x2 = 50 + 45 * Math.cos((Math.PI * endAngle) / 180);
                        const y2 = 50 + 45 * Math.sin((Math.PI * endAngle) / 180);
                        const d = `M50,50 L${x1},${y1} A45,45 0 ${largeArc} 1 ${x2},${y2} Z`;
                        const color = PIE_COLORS[i % PIE_COLORS.length];
                        const path = <Path key={os} d={d} fill={color} />;
                        startAngle += angle;
                        return path;
                      });
                    })()}
                  </Svg>
                  <View style={{ flexDirection: 'row', marginVertical: 4 }}>
                    {deviceEntries.map(([os, count], i) => (
                      <View key={os} style={styles.deviceLegend}>
                        <View style={[styles.deviceDot, { backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }]} />
                        <Text>{os}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  {/* Table */}
                  <View style={styles.deviceTable}>
                    <View style={styles.deviceTableHeader}>
                      <Text style={styles.deviceTableCellBold}>Device</Text>
                      <Text style={styles.deviceTableCellBold}>Scans</Text>
                      <Text style={styles.deviceTableCellBold}>%</Text>
                    </View>
                    {deviceEntries.map(([os, count], i) => (
                      <View key={os} style={{ flexDirection: 'row' }}>
                        <Text style={styles.deviceTableCell}>{os}</Text>
                        <Text style={styles.deviceTableCell}>{count}</Text>
                        <Text style={styles.deviceTableCell}>{totalDevices > 0 ? ((count / totalDevices) * 100).toFixed(1) : '0.0'}%</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MyQRReportPDF; 