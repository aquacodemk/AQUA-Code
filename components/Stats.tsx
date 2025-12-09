
import React from 'react';
import { DailyStats } from '../types';
import { Activity, Flame, Medal, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface StatsProps {
  stats: DailyStats;
  activityLog: string[];
}

const Stats: React.FC<StatsProps> = ({ stats, activityLog }) => {
  // Mock data generation based on log for chart
  const data = [
    { name: 'Пон', workouts: 1 },
    { name: 'Вто', workouts: 2 },
    { name: 'Сре', workouts: 0 },
    { name: 'Чет', workouts: 1 },
    { name: 'Пет', workouts: 3 },
    { name: 'Саб', workouts: 1 },
    { name: 'Нед', workouts: 0 },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-cyan-100 font-bold text-xs uppercase tracking-wider mb-2">Вкупно Тренинзи</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black">{stats.total}</span>
              <span className="text-sm opacity-80">сесии</span>
            </div>
          </div>
          <Activity className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity" size={100} />
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-orange-100 font-bold text-xs uppercase tracking-wider mb-2">Серија (Streak)</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black">{stats.streak}</span>
              <span className="text-sm opacity-80">дена</span>
            </div>
          </div>
          <Flame className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity" size={100} />
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-purple-100 font-bold text-xs uppercase tracking-wider mb-2">Ниво</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black truncate">{stats.level}</span>
            </div>
            <div className="w-full bg-white/30 h-1.5 mt-4 rounded-full">
              <div className="bg-white h-full rounded-full w-2/3" />
            </div>
          </div>
          <Medal className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity" size={100} />
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-green-100 font-bold text-xs uppercase tracking-wider mb-2">Калории (Est.)</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black">{stats.total * 450}</span>
              <span className="text-sm opacity-80">kcal</span>
            </div>
          </div>
          <Zap className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity" size={100} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Неделен Преглед</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="workouts" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.workouts > 0 ? '#06b6d4' : '#e5e7eb'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Историја</h3>
          <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {activityLog.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">Нема активност</p>
            ) : (
              activityLog.slice(0, 10).map((log, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-gray-700 dark:text-white font-medium">Завршен тренинг</span>
                  <span className="ml-auto text-gray-400 text-xs">{new Date(log).toLocaleDateString()}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
