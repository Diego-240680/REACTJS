import api from './api';

const PRODUCT_ENDPOINTS = ['/api/productos', '/productos', '/api/products', '/products'];
const CATEGORY_ENDPOINTS = ['/api/categorias', '/categorias', '/api/categories', '/categories'];
const USERS_ENDPOINTS = ['/api/usuarios', '/usuarios', '/api/users', '/users'];
const LOGIN_ENDPOINTS = ['/api/usuarios/login', '/api/login', '/login', '/api/auth/login', '/auth/login'];

const isNotFound = (error) => error?.response?.status === 404;

const normalizeProduct = (producto) => ({
  id: producto.id ?? producto._id,
  nombre: producto.nombre ?? producto.title ?? producto.name ?? 'Sin nombre',
  precio: Number(producto.precio ?? producto.price ?? 0),
  categoria: producto.categoria ?? producto.category ?? producto.id_categoria ?? '1',
  descripcion: producto.descripcion ?? producto.description ?? '',
  imagen: producto.imagen ?? producto.image ?? producto.image_url ?? producto.foto ?? '',
  stock: Number(producto.stock ?? 0),
  id_categoria: Number(producto.id_categoria ?? producto.categoria ?? 1),
});

const buildProductoPayload = (producto) => ({
  nombre: producto.nombre,
  descripcion: producto.descripcion || '',
  precio: Number(producto.precio) || 0,
  stock: Number(producto.stock ?? 1) || 1,
  imagen: producto.imagen || '',
  id_categoria: Number(producto.id_categoria ?? producto.categoria ?? 1) || 1,
});

async function requestFirstAvailableGet(endpoints) {
  let lastError;

  for (const endpoint of endpoints) {
    try {
      const response = await api.get(endpoint);
      return response;
    } catch (error) {
      lastError = error;
      if (!isNotFound(error)) {
        throw error;
      }
    }
  }

  throw lastError || new Error('No se encontro un endpoint disponible.');
}

async function requestFirstAvailablePost(endpoints, payload) {
  let lastError;

  for (const endpoint of endpoints) {
    try {
      const response = await api.post(endpoint, payload);
      return response;
    } catch (error) {
      lastError = error;
      if (!isNotFound(error)) {
        throw error;
      }
    }
  }

  throw lastError || new Error('No se encontro un endpoint disponible.');
}

const getUsers = async () => {
  const usersResponse = await requestFirstAvailableGet(USERS_ENDPOINTS);
  return Array.isArray(usersResponse.data) ? usersResponse.data : [];
};

export async function loginUsuario({ usuario, password }) {
  const usuarioLimpio = (usuario || '').trim();
  const passwordLimpio = String(password || '').trim();
  const payload = {
    usuario: usuarioLimpio,
    username: usuarioLimpio,
    correo: usuarioLimpio,
    email: usuarioLimpio,
    password: passwordLimpio,
    contrasena: passwordLimpio,
  };

  try {
    const response = await requestFirstAvailablePost(LOGIN_ENDPOINTS, payload);
    const token =
      response?.data?.token ||
      response?.data?.access_token ||
      response?.data?.data?.token ||
      `token-${usuarioLimpio}`;

    const user =
      response?.data?.user ||
      response?.data?.usuario ||
      response?.data?.data ||
      response?.data?.data?.user ||
      { nombre: usuarioLimpio, rol: 'cliente' };
    return { token, user };
  } catch (error) {
    if (!isNotFound(error)) {
      throw error;
    }

    const users = await getUsers();
    const usuarioNormalizado = usuarioLimpio.toLowerCase();

    const encontrado = users.find((u) => {
      const email = (u.email || '').toLowerCase();
      const nombre = (u.nombre || '').toLowerCase();
      const username = (u.username || '').toLowerCase();
      const coincideUsuario =
        email === usuarioNormalizado ||
        nombre === usuarioNormalizado ||
        username === usuarioNormalizado;

      return coincideUsuario && String(u.password || '') === passwordLimpio;
    });

    if (!encontrado) {
      const authError = new Error('Credenciales incorrectas');
      authError.response = { status: 401 };
      throw authError;
    }

    return {
      token: `token-${encontrado.id || usuarioLimpio}`,
      user: encontrado,
    };
  }
}

export async function createUsuario(payload) {
  const body = {
    nombre: payload.nombre?.trim(),
    direccion: payload.direccion?.trim(),
    telefono: payload.telefono?.trim(),
    email: payload.email?.trim().toLowerCase(),
    password: payload.password,
    rol: (payload.rol || 'cliente').toLowerCase(),
  };

  const response = await api.post('/api/usuarios', body);
  return response.data;
}

export async function getProductos() {
  const response = await requestFirstAvailableGet(PRODUCT_ENDPOINTS);
  const lista = Array.isArray(response.data) ? response.data : [];
  return lista.map(normalizeProduct);
}

export async function getCategorias() {
  const response = await requestFirstAvailableGet(CATEGORY_ENDPOINTS);
  return Array.isArray(response.data) ? response.data : [];
}

export async function createProducto(producto) {
  const response = await api.post('/api/productos', buildProductoPayload(producto));
  return normalizeProduct(response.data);
}

export async function updateProducto(id, producto) {
  await api.put(`/api/productos/${id}`, buildProductoPayload(producto));
  return true;
}

export async function deleteProducto(id) {
  await api.delete(`/api/productos/${id}`);
  return true;
}

export async function getCarritos() {
  const response = await api.get('/api/carritos');
  return Array.isArray(response.data) ? response.data : [];
}

export async function getCarritosByUsuario(idUsuario) {
  const response = await api.get(`/api/carrito/${idUsuario}`);
  return Array.isArray(response.data) ? response.data : [];
}

export async function createCarrito(payload) {
  const response = await api.post('/api/carritos', payload);
  return response.data;
}

export async function deleteCarrito(idCarrito) {
  await api.delete(`/api/carritos/${idCarrito}`);
  return true;
}

export async function getCarritoDetallesByCarrito(idCarrito) {
  try {
    const response = await api.get(`/api/carrito-detalle/${idCarrito}`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    const status = error?.response?.status;
    if (status === 400 || status === 404 || status === 500) {
      return [];
    }
    throw error;
  }
}

export async function createCarritoDetalle(payload) {
  try {
    const response = await api.post('/api/carrito-detalles', payload);
    return response.data;
  } catch (error) {
    const status = error?.response?.status;
    if (status === 400 || status === 404 || status === 500) {
      return null;
    }
    throw error;
  }
}
