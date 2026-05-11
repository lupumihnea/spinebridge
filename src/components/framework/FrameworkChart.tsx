"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { frameworkDomains } from "@/data/framework";

const colorByStyle = {
  clinical: "#0f766e",
  clay: "#b85c38",
  saffron: "#c78b1c",
  graphite: "#24302c",
  signal: "#b42318"
};

export function FrameworkChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="rounded-panel border border-ink/10 bg-white p-5 shadow-panel">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-semibold uppercase text-clinical">Vizualizare pentru juriu</p>
          <h3 className="mt-2 text-xl font-bold text-ink">Pondere educațională în demo</h3>
        </div>
        <p className="max-w-sm text-sm leading-6 text-muted">
          Valorile sunt arbitrare și servesc doar compoziției vizuale a demonstrației.
        </p>
      </div>
      <div className="mt-5 h-72">
        {mounted ? (
          <ResponsiveContainer height="100%" width="100%">
            <BarChart data={frameworkDomains} layout="vertical" margin={{ left: 8, right: 18 }}>
              <CartesianGrid horizontal={false} stroke="#d9dedb" strokeDasharray="3 3" />
              <XAxis domain={[0, 100]} hide type="number" />
              <YAxis
                axisLine={false}
                dataKey="academicLabel"
                tick={{ fill: "#5a6762", fontSize: 12 }}
                tickLine={false}
                type="category"
                width={112}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid rgba(23,32,29,0.12)",
                  boxShadow: "0 12px 34px rgba(23,32,29,0.12)"
                }}
                formatter={(value) => [`${value}%`, "vizibilitate demo"]}
              />
              <Bar dataKey="visualWeight" radius={[0, 6, 6, 0]}>
                {frameworkDomains.map((domain) => (
                  <Cell fill={colorByStyle[domain.visualStyleKey]} key={domain.id} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full flex-col justify-center gap-4 rounded-panel bg-mist p-5">
            {frameworkDomains.map((domain) => (
              <div className="grid grid-cols-[7rem_1fr] items-center gap-3" key={domain.id}>
                <span className="text-xs font-semibold text-muted">{domain.academicLabel}</span>
                <span className="h-4 rounded-panel bg-white">
                  <span
                    className="block h-4 rounded-panel"
                    style={{
                      width: `${domain.visualWeight}%`,
                      backgroundColor: colorByStyle[domain.visualStyleKey]
                    }}
                  />
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
