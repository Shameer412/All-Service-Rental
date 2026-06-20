'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  joinedDate: string;
  status: 'Pending' | 'Suspended' | 'Complete' | 'Active';
}

interface UsersTableProps {
  users: User[];
  onEditClick: (user: User) => void;
  onDeleteClick: (id: string, name: string) => void;
}

export default function UsersTable({ users, onEditClick, onDeleteClick }: UsersTableProps) {
  return (
    <div className="rounded-[24px] overflow-hidden shadow-2xl font-inter">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="bg-[#22C55E]">
              <th className="px-6 py-4 text-white font-bold text-sm tracking-wide">Name</th>
              <th className="px-6 py-4 text-white font-bold text-sm tracking-wide">Email</th>
              <th className="px-6 py-4 text-white font-bold text-sm tracking-wide">Phone</th>
              <th className="px-6 py-4 text-white font-bold text-sm tracking-wide">Company</th>
              <th className="px-6 py-4 text-white font-bold text-sm tracking-wide">Joined Date</th>
              <th className="px-6 py-4 text-white font-bold text-sm tracking-wide">Status</th>
              <th className="px-6 py-4 text-white font-bold text-sm tracking-wide text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`${
                    index % 2 === 0 ? 'bg-[#0B2337]' : 'bg-[#001C2F]'
                  } hover:bg-white/[0.02] transition-colors`}
                >
                  <td className="px-6 py-4 text-white font-bold text-sm font-inter">{user.name}</td>
                  <td className="px-6 py-4 text-white text-sm font-medium font-inter">{user.email}</td>
                  <td className="px-6 py-4 text-white text-sm font-medium font-inter">{user.phone}</td>
                  <td className="px-6 py-4 text-white text-sm font-medium font-inter">{user.company}</td>
                  <td className="px-6 py-4 text-white text-sm font-medium font-inter">{user.joinedDate}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block border border-[#ABEFC6] text-[#067647] bg-[#ECFDF3] rounded-full px-4 py-1 text-xs font-semibold tracking-wide font-inter">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => onDeleteClick(user.id, user.name)}
                        className="text-[#EF4444] hover:text-[#DC2626] transition-colors p-1.5 rounded-lg hover:bg-red-500/10 active:scale-95"
                        title="Delete User"
                      >
                        <Trash2 className="w-5 h-5 fill-current" />
                      </button>
                      <button
                        onClick={() => onEditClick(user)}
                        className="bg-[#22C55E] hover:bg-[#16a34a] text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-all active:scale-95 font-inter"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-white text-sm font-medium font-inter">
                  No users found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
