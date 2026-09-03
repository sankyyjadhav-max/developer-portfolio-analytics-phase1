"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

import {
  Download,
  RefreshCw,
  Users,
  MousePointerClick,
  Eye,
  Activity,
} from "lucide-react";

// API URL
const RAW = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const BASE = RAW.endsWith("/api")
  ? RAW
  : `${RAW}/api`;

type Data = any;

const ranges = [7, 30, 90, 365];

export default function AnalyticsPage() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState<Data>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");

    try {
      // IMPORTANT:
      // BASE already contains /api
      // Correct URL:
      // http://localhost:5000/api/analytics/dashboard
      const response = await fetch(
        `${BASE}/analytics/dashboard?days=${days}`,
        {
          credentials: "include",
        }
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Unable to load analytics");
      }

      setData(json.data);
    } catch (err: any) {
      setError(err.message || "Unable to load analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [days]);

  const exportReport = () => {
    if (!data) return;

    const w = window.open("", "_blank");

    if (!w) return;

    const o = data.overview;

    w.document.write(`
      <html>
        <head>
          <title>Devfolio Analytics Report</title>

          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              color: #171717;
            }

            h1 {
              color: #E41159;
            }

            table {
              border-collapse: collapse;
              width: 100%;
              margin: 20px 0;
            }

            td,
            th {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
          </style>
        </head>

        <body>

          <h1>Devfolio Analytics Report</h1>

          <p>
            Period:
            ${new Date(data.period.start).toLocaleDateString()}
            –
            ${new Date(data.period.end).toLocaleDateString()}
          </p>

          <h2>Overview</h2>

          <ul>
            <li>Total visitors: ${o.totalVisitors}</li>
            <li>Unique visitors: ${o.uniqueVisitors}</li>
            <li>Page views: ${o.pageViews}</li>
            <li>Project clicks: ${o.projectClicks}</li>
          </ul>

          ${section(
            "Top projects",
            data.topProjects,
            "name",
            "clicks"
          )}

          ${section(
            "Traffic sources",
            data.sources,
            "name",
            "count"
          )}

          ${section(
            "Geography",
            data.geography,
            "country",
            "count"
          )}

          ${section(
            "Devices",
            data.devices,
            "name",
            "count"
          )}

          ${section(
            "Browsers",
            data.browsers,
            "name",
            "count"
          )}

        </body>
      </html>
    `);

    w.document.close();

    setTimeout(() => {
      w.print();
    }, 300);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-64 animate-pulse rounded bg-black/5" />

        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-2xl bg-white"
            />
          ))}
        </div>

        <div className="h-80 animate-pulse rounded-2xl bg-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-white p-8">
        <h1 className="text-xl font-semibold">
          Analytics unavailable
        </h1>

        <p className="mt-2 text-sm text-black/50">
          {error}
        </p>

        <button
          onClick={load}
          className="mt-5 rounded-xl bg-[#171717] px-4 py-2 text-sm text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  const o = data.overview;

  const total = (arr: any[]) =>
    arr.reduce((a, x) => a + x.count, 0);

  const cards = [
    ["Total Visitors", o.totalVisitors, Users],
    ["Unique Visitors", o.uniqueVisitors, Users],
    ["Page Views", o.pageViews, Eye],
    ["Project Clicks", o.projectClicks, MousePointerClick],
  ];

  return (
    <div className="space-y-7">

      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#E41159]">
            Analytics
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Portfolio insights
          </h1>

          <p className="mt-2 text-sm text-black/45">
            Privacy-first visitor analytics for your public portfolio.
          </p>

        </div>

        <div className="flex gap-2">

          <button
            onClick={load}
            className="rounded-xl border px-3 py-2"
          >
            <RefreshCw size={16} />
          </button>

          <button
            onClick={exportReport}
            className="inline-flex items-center gap-2 rounded-xl bg-[#E41159] px-4 py-2 text-sm font-semibold text-white"
          >
            <Download size={16} />
            Export PDF
          </button>

        </div>

      </div>


      {/* DATE FILTERS */}

      <div className="flex flex-wrap gap-2">

        {ranges.map((r) => (

          <button
            key={r}
            onClick={() => setDays(r)}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${
              days === r
                ? "bg-[#171717] text-white"
                : "border bg-white"
            }`}
          >
            {r === 365
              ? "This year"
              : `Last ${r} days`}
          </button>

        ))}

      </div>


      {/* KPI CARDS */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        {cards.map(([label, value, Icon]: any) => (

          <div
            key={label}
            className="rounded-2xl border border-black/[.07] bg-white p-5"
          >

            <Icon
              size={18}
              className="text-[#E41159]"
            />

            <p className="mt-5 text-3xl font-semibold">
              {value}
            </p>

            <p className="mt-1 text-xs text-black/45">
              {label}
            </p>

          </div>

        ))}

      </div>


      {/* TRAFFIC CHART */}

      <div className="rounded-[26px] border border-black/[.07] bg-white p-6">

        <h2 className="font-semibold">
          Traffic trend
        </h2>

        <p className="mt-1 text-xs text-black/40">
          Visitors, page views and project clicks over the selected period.
        </p>

        {data.traffic.length ? (

          <div className="mt-6 h-72">

            <ResponsiveContainer>

              <LineChart data={data.traffic}>

                <XAxis
                  dataKey="date"
                  hide={days > 30}
                />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#E41159"
                />

                <Line
                  type="monotone"
                  dataKey="pageViews"
                  stroke="#171717"
                />

                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#888"
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        ) : (

          <Empty />

        )}

      </div>


      {/* ANALYTICS PANELS */}

      <div className="grid gap-6 xl:grid-cols-2">

        <Panel title="Top projects">

          <Rank
            rows={data.topProjects}
            label="name"
            value="clicks"
          />

        </Panel>


        <Panel title="Traffic sources">

          <Rank
            rows={data.sources}
            label="name"
            value="count"
            total={total(data.sources)}
          />

        </Panel>


        <Panel title="Geography">

          <div className="space-y-3">

            {data.geography.length
              ? data.geography
                  .slice(0, 8)
                  .map((x: any) => (

                    <div
                      key={`${x.country}${x.state}${x.city}`}
                      className="flex justify-between text-sm"
                    >

                      <span>

                        {x.city !== "Unknown"
                          ? `${x.city}, ${x.state}`
                          : x.country}

                      </span>

                      <b>{x.count}</b>

                    </div>

                  ))
              : <Empty />}

          </div>

        </Panel>


        <Panel title="Recent activity">

          <div className="space-y-4">

            {data.recent.length
              ? data.recent.map(
                  (x: any, i: number) => (

                    <div
                      key={i}
                      className="flex gap-3 text-sm"
                    >

                      <Activity
                        size={16}
                        className="text-[#E41159]"
                      />

                      <div>

                        <p>

                          {x.type === "PROJECT_CLICK"

                            ? `Project clicked${
                                x.project
                                  ? ` — ${x.project}`
                                  : ""
                              }`

                            : "Portfolio viewed"}

                        </p>

                        <p className="text-xs text-black/40">

                          {new Date(
                            x.createdAt
                          ).toLocaleString()}

                        </p>

                      </div>

                    </div>

                  )
                )

              : <Empty />}

          </div>

        </Panel>

      </div>


      {/* DEVICE / BROWSER / PEAK HOURS */}

      <div className="grid gap-6 xl:grid-cols-3">

        <ChartPanel
          title="Devices"
          rows={data.devices}
        />

        <ChartPanel
          title="Browsers"
          rows={data.browsers}
        />


        <div className="rounded-[26px] border border-black/[.07] bg-white p-6">

          <h2 className="font-semibold">
            Peak visit hours
          </h2>

          <div className="mt-5 h-56">

            <ResponsiveContainer>

              <BarChart data={data.peakHours}>

                <XAxis dataKey="hour" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Bar
                  dataKey="visits"
                  fill="#E41159"
                  radius={[5, 5, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>


      {/* PRIVACY */}

      <p className="text-xs text-black/35">

        No names, emails, passwords, or raw IP addresses are stored or shown.
        Anonymous identifiers are scoped to this portfolio.

      </p>

    </div>
  );
}


/* COMPONENTS */

function Panel({ title, children }: any) {

  return (

    <div className="rounded-[26px] border border-black/[.07] bg-white p-6">

      <h2 className="font-semibold">
        {title}
      </h2>

      <div className="mt-5">
        {children}
      </div>

    </div>

  );

}


function Rank({
  rows,
  label,
  value,
  total,
}: any) {

  return rows.length ? (

    <div className="space-y-3">

      {rows.map((x: any, i: number) => (

        <div
          key={i}
          className="flex items-center justify-between text-sm"
        >

          <span className="truncate">

            {i + 1}. {x[label]}

          </span>

          <b>

            {x[value]}

            {total
              ? ` (${Math.round(
                  (x[value] / total) * 100
                )}%)`
              : ""}

          </b>

        </div>

      ))}

    </div>

  ) : (

    <Empty />

  );

}


function ChartPanel({
  title,
  rows,
}: any) {

  return (

    <div className="rounded-[26px] border border-black/[.07] bg-white p-6">

      <h2 className="font-semibold">
        {title}
      </h2>

      {rows.length ? (

        <div className="mt-5 h-56">

          <ResponsiveContainer>

            <BarChart data={rows}>

              <XAxis dataKey="name" />

              <YAxis allowDecimals={false} />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="#E41159"
                radius={[5, 5, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      ) : (

        <Empty />

      )}

    </div>

  );

}


function Empty() {

  return (

    <div className="py-10 text-center text-sm text-black/40">

      No visitor data yet. Share your portfolio to start collecting analytics.

    </div>

  );

}


function section(
  title: string,
  rows: any[],
  label: string,
  value: string
) {

  return `

    <h2>${title}</h2>

    <table>

      <tr>

        <th>Name</th>

        <th>Count</th>

      </tr>

      ${rows
        .map(
          (x) => `

            <tr>

              <td>
                ${x[label] || "Unknown"}
              </td>

              <td>
                ${x[value]}
              </td>

            </tr>

          `
        )
        .join("")}

    </table>

  `;

}