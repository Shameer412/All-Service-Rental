'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

import UserStatsGrid from '@/components/dashboard/admin/users/UserStatsGrid';
import SearchFilterBar from '@/components/dashboard/admin/users/SearchFilterBar';
import UsersTable from '@/components/dashboard/admin/users/UsersTable';
import DeleteConfirmModal from '@/components/dashboard/admin/users/DeleteConfirmModal';
import EditUserModal from '@/components/dashboard/admin/users/EditUserModal';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  joinedDate: string;
  status: 'Pending' | 'Suspended' | 'Complete' | 'Active';
}

const initialUsers: User[] = [
  {
    id: '1',
    name: 'Sarah',
    email: 'John@example .com',
    phone: '555-1009',
    company: 'Brow&Co',
    joinedDate: '2024-01-15',
    status: 'Pending',
  },
  {
    id: '2',
    name: 'Mike',
    email: 'John@example .com',
    phone: '555-1009',
    company: 'Brow&Co',
    joinedDate: '2024-01-15',
    status: 'Suspended',
  },
  {
    id: '3',
    name: 'Emmma',
    email: 'John@example .com',
    phone: '555-1009',
    company: 'Brow&Co',
    joinedDate: '2024-01-15',
    status: 'Complete',
  },
  {
    id: '4',
    name: 'James',
    email: 'John@example .com',
    phone: '555-1009',
    company: 'Brow&Co',
    joinedDate: '2024-01-15',
    status: 'Active',
  },
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [mounted, setMounted] = useState(false);

  const [userToDelete, setUserToDelete] = useState<{ id: string; name: string } | null>(null);

  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editIsActive, setEditIsActive] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#001C2F]" />;
  }

  // Handle Edit Click Action
  const handleEditClick = (user: User) => {
    setUserToEdit(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditPhone(user.phone);
    setEditIsActive(user.status === 'Active' || user.status === 'Complete');
  };

  // Save Edit Changes
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userToEdit) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userToEdit.id
            ? {
                ...user,
                name: editName,
                email: editEmail,
                phone: editPhone,
                status: editIsActive ? 'Active' : 'Suspended',
              }
            : user
        )
      );
      toast.success(`User ${editName} updated successfully`, {
        description: 'The platform user details have been updated.',
      });
      setUserToEdit(null);
    }
  };

  // Trigger Delete Modal
  const handleDeleteClick = (id: string, name: string) => {
    setUserToDelete({ id, name });
  };

  // Confirm and Execute Delete Action
  const handleConfirmDelete = () => {
    if (userToDelete) {
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      toast.success(`User ${userToDelete.name} removed`, {
        description: 'The platform user account has been successfully deleted.',
      });
      setUserToDelete(null);
    }
  };

  // Filtered Users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-[98%] lg:w-[96%] 2xl:w-[94%] max-w-[2400px] mx-auto space-y-8 pb-12 font-inter">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight font-inter">
          User Management
        </h1>
        <p className="text-white text-sm md:text-base font-inter">
          Add, edit or remove platform users.
        </p>
      </div>

      {/* Stats Cards */}
      <UserStatsGrid />

      {/* Search and Filter Row */}
      <SearchFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Users Table */}
      <UsersTable
        users={filteredUsers}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />

      {/* Delete Confirmation Modal */}
      {userToDelete && (
        <DeleteConfirmModal
          userName={userToDelete.name}
          onCancel={() => setUserToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Edit User Modal */}
      {userToEdit && (
        <EditUserModal
          editName={editName}
          setEditName={setEditName}
          editEmail={editEmail}
          setEditEmail={setEditEmail}
          editPhone={editPhone}
          setEditPhone={setEditPhone}
          editIsActive={editIsActive}
          setEditIsActive={setEditIsActive}
          onCancel={() => setUserToEdit(null)}
          onSubmit={handleSaveEdit}
        />
      )}
    </div>
  );
}
