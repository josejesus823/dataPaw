# DataPaw - Sistema CRUD con Autenticación

Sistema completo de gestión de usuarios con autenticación y roles para la plataforma DataPaw.

## ✅ Características Implementadas

### 🔐 Sistema de Autenticación
- Login con email y contraseña
- Registro de nuevos usuarios
- Roles: Usuario regular y Administrador
- Sesión persistente con localStorage
- Redirección automática según rol

### 👥 Gestión de Usuarios (CRUD)
- **Crear**: Registro de nuevos usuarios desde admin o sign-up
- **Leer**: Lista completa de usuarios en panel admin
- **Eliminar**: Los admins pueden eliminar usuarios
- **Roles**: Diferenciación entre admin y usuario regular

### 🎛️ Panel de Administración
- Acceso exclusivo para usuarios admin
- Gestión completa de usuarios
- Estadísticas del sistema
- Interfaz intuitiva con tabs y modales

### 📊 Dashboard de Usuario
- Panel personalizado según rol
- Navegación diferenciada
- Accesos rápidos a funciones principales

## 🗂️ Estructura del Proyecto

```
dataPaw/
├── index.html                 # Página principal
├── style.css                 # Estilos página principal
└── pages/
    ├── Sign-in/              # Login
    │   ├── index.html
    │   ├── script.js
    │   └── style.css
    ├── Sign-up/              # Registro
    │   ├── index.html
    │   ├── signup.js
    │   ├── style.css
    │   └── validators.js
    ├── dashboard/            # Dashboard usuario
    │   ├── dashboard.html
    │   └── style.css
    ├── admin/               # Panel administración
    │   ├── admin.html
    │   └── style.css
    └── shared/
        └── auth.js          # Sistema autenticación
```

## 👤 Usuarios de Prueba

### Administrador
- **Email:** admin@datapaw.com
- **Password:** admin123
- **Permisos:** Acceso completo al panel de administración

### Usuario Regular
- **Email:** user@datapaw.com  
- **Password:** user123
- **Permisos:** Acceso limitado, sin panel admin

## 🚀 Cómo Usar

1. **Página Principal**: Accede a `index.html`
2. **Login**: Usa las credenciales de prueba o registra nuevo usuario
3. **Dashboard**: Después del login, serás redirigido según tu rol
4. **Admin**: Los administradores pueden gestionar usuarios desde el panel

## 🔑 Funcionalidades por Rol

### Usuario Regular
- ✅ Acceso al dashboard
- ✅ Navegación por la web
- ✅ Perfil personal
- ❌ Sin acceso al panel admin

### Administrador
- ✅ Todo lo del usuario regular
- ✅ Panel de administración
- ✅ Crear nuevos usuarios
- ✅ Eliminar usuarios existentes
- ✅ Ver estadísticas del sistema

## 💾 Persistencia de Datos

- Los usuarios se almacenan en `localStorage`
- La sesión se mantiene entre recargas
- Los datos se sincronizan automáticamente

## 🎨 Estilos Independientes

Cada vista tiene su propio archivo CSS sin dependencias:
- `style.css` - Página principal
- `pages/Sign-in/style.css` - Login
- `pages/Sign-up/style.css` - Registro  
- `pages/dashboard/style.css` - Dashboard
- `pages/admin/style.css` - Panel admin

## 🔒 Seguridad

- Validación de roles en frontend
- Redirección automática si no autorizado
- Validación de emails y contraseñas
- Mensajes de error user-friendly