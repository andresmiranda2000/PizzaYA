import { Pedido } from '../types';

const API_URL = 'http://localhost:4000/api';

export async function obtenerMenu(): Promise<Pedido[]> {
  const res = await fetch(`${API_URL}/menu`);
  return await res.json();
}

export async function obtenerPedidos(): Promise<Pedido[]> {
  const res = await fetch(`${API_URL}/pedidos`);
  return await res.json();
}

export async function agregarPedido(pedido: Omit<Pedido, 'id'>): Promise<Pedido> {
  const res = await fetch(`${API_URL}/pedidos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pedido)
  });
  return await res.json();
}
