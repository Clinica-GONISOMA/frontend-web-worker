'use client';
import React, { useState } from 'react';

// Dynamic mock data generation
const roles = ['Médico', 'Administrativo', 'Ejecutivo'];
type User = { id: number; role: string; name: string; email: string; };
const initialUsers: User[] = Array.from({ length: 50 }, (_, i) => {
  const role = roles[i % roles.length];
  const idx = i + 1;
  return {
    id: idx,
    role,
    name: `${role} ${idx}`,
    email: `${role.toLowerCase()}${idx}@hospital.cl`,
  };
});

type UserForm = { role: string; name: string; email: string; };

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState<UserForm>({ role: '', name: '', email: '' });
  const [currentTab, setCurrentTab] = useState<string>(roles[0]);

  const openModal = (user: User | null = null) => {
    setEditingUser(user);
    setForm(user ? { role: user.role, name: user.name, email: user.email } : { role: '', name: '', email: '' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...editingUser, ...form } : u));
    } else {
      const newId = Math.max(...users.map(u => u.id)) + 1;
      setUsers([...users, { id: newId, ...form }]);
    }
    closeModal();
  };

  const filtered = users.filter(u => u.role === currentTab);

  return (
    <div className="w-full p-8 space-y-6">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">
          Gestión de Usuarios
        </h1>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center bg-[var(--color-foreground)] text-[var(--color-background)] px-4 py-2 rounded-2xl shadow hover:opacity-90"
        >
          <span className="mr-2 text-xl">➕</span> Nuevo Usuario
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-[var(--color-foreground)]/20 w-full">
        {roles.map(role => (
          <button
            key={role}
            onClick={() => setCurrentTab(role)}
            className={`py-2 px-4 -mb-px font-medium ${currentTab === role ? 'border-b-2 border-[var(--color-foreground)] text-[var(--color-foreground)]' : 'text-[var(--color-foreground)]/70 hover:text-[var(--color-foreground)]'}`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* User table */}
      <div className="overflow-x-auto w-full">
        <div className="w-full bg-[var(--color-background)] border border-[var(--color-foreground)]/20 rounded-4xl overflow-hidden">
          <div className="grid grid-cols-4 divide-x divide-[var(--color-foreground)]/10 border-b border-[var(--color-foreground)]/10">
            {['Rol', 'Nombre', 'Email', 'Acciones'].map(title => (
              <div
                key={title}
                className="px-4 py-3 text-left text-[var(--color-foreground)] font-semibold"
              >
                {title}
              </div>
            ))}
          </div>
          {filtered.map((user, idx) => (
            <div
              key={user.id}
              className={`grid grid-cols-4 divide-x divide-[var(--color-foreground)]/10 border-t border-[var(--color-foreground)]/10 ${idx % 2 === 0 ? 'bg-[var(--color-foreground)]/5' : ''}`}
            >
              <div className="px-4 py-2 text-[var(--color-foreground)]">{user.role}</div>
              <div className="px-4 py-2 text-[var(--color-foreground)]">{user.name}</div>
              <div className="px-4 py-2 text-[var(--color-foreground)]">{user.email}</div>
              <div className="px-4 py-2 text-center">
                <button onClick={() => openModal(user)} className="hover:opacity-70">
                  ✏️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 w-full">
          <div className="bg-[var(--color-background)] rounded-4xl border border-[var(--color-foreground)]/20 p-6 w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-[var(--color-foreground)] hover:opacity-70"
            >
              ✖️
            </button>
            <h2 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">
              {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[var(--color-foreground)] mb-1">Rol</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-[var(--color-foreground)]/20 rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)]"
                >
                  <option value="">Selecciona...</option>
                  {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[var(--color-foreground)] mb-1">Nombre</label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-[var(--color-foreground)]/20 rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)]"
                />
              </div>
              <div>
                <label className="block text-[var(--color-foreground)] mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-[var(--color-foreground)]/20 rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)]"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex justify-center items-center bg-[var(--color-foreground)] text-[var(--color-background)] py-2 rounded-2xl hover:opacity-90"
              >
                {editingUser ? 'Actualizar' : 'Crear'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
