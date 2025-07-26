import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonToast
} from '@ionic/react';
import { useContext, useState } from 'react';
import { PedidoContext } from '../PedidoContext';

const Tab2: React.FC = () => {
  const { pedidos, setPedidos } = useContext(PedidoContext);
  const [mostrarToast, setMostrarToast] = useState(false);

  const eliminarPedido = (id: number) => {
    const actualizados = pedidos.filter(p => p.id !== id);
    setPedidos(actualizados);
  };

  const confirmarPedidos = async () => {
    try {
      for (const pedido of pedidos) {
        await fetch('http://localhost:4000/api/pedidos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(pedido)
        });
      }
      setPedidos([]); // Vacía la lista visual
      setMostrarToast(true); // Muestra mensaje de confirmación
    } catch {
      alert('❌ Error al confirmar pedido');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pedidos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {pedidos.map((pedido) => (
            <IonItem key={pedido.id}>
              <IonLabel>
                <h2>{pedido.plato}</h2>
                <p>{pedido.nombre} {pedido.apellido}</p>
                <p>{pedido.correo}</p>
                <p>{pedido.direccion}</p>
                <p><strong>${pedido.precio.toFixed(2)}</strong></p>
              </IonLabel>
              <IonButton color="danger" onClick={() => eliminarPedido(pedido.id)}>Eliminar</IonButton>
            </IonItem>
          ))}
        </IonList>

        {pedidos.length > 0 && (
          <div style={{ padding: '16px' }}>
            <IonButton expand="block" color="success" onClick={confirmarPedidos}>
              Confirmar Pedido
            </IonButton>
          </div>
        )}

        <IonToast
          isOpen={mostrarToast}
          onDidDismiss={() => setMostrarToast(false)}
          message="✅ Pedido confirmado exitosamente"
          duration={2000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
