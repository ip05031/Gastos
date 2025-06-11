import React, { useState } from 'react';

function UserForm() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = { nombre, email, password };

    try {
      const res = await fetch('https://ipdev-apps.com/API/Gastos/Usr/usuarios.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });

      const result = await res.json();
      alert(result.message || 'Usuario registrado correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al registrar usuario');
    }
  };

  return (
    React.createElement('div', { className: 'container mt-4' },
      React.createElement('h3', null, 'Registrar Usuario'),
      React.createElement('form', { onSubmit: handleSubmit },
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', null, 'Nombre'),
          React.createElement('input', {
            type: 'text', className: 'form-control',
            value: nombre, onChange: e => setNombre(e.target.value), required: true
          })
        ),
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', null, 'Correo electrónico'),
          React.createElement('input', {
            type: 'email', className: 'form-control',
            value: email, onChange: e => setEmail(e.target.value), required: true
          })
        ),
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', null, 'Contraseña'),
          React.createElement('input', {
            type: 'password', className: 'form-control',
            value: password, onChange: e => setPassword(e.target.value), required: true
          })
        ),
        React.createElement('button', {
          type: 'submit', className: 'btn btn-primary mt-3'
        }, 'Registrar')
      )
    )
  );
}

export default UserForm;
