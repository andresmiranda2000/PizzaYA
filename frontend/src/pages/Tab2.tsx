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
  IonToast,
  IonModal,
  IonInput
} from '@ionic/react';
import { useContext, useState } from 'react';
import { PedidoContext } from '../PedidoContext';
import './Tab2.css'; 

const Tab2: React.FC = () => {
  const { pedidos, setPedidos } = useContext(PedidoContext);

  const [mostrarToast, setMostrarToast] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');

  const eliminarPedido = (id: number) => {
    const actualizados = pedidos.filter(p => p.id !== id);
    setPedidos(actualizados);
  };

  const abrirModal = () => {
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setNombre('');
    setApellido('');
    setCorreo('');
    setDireccion('');
  };

  const confirmarConDatos = async () => {
    try {
      const orden = {
        nombre,
        apellido,
        correo,
        direccion,
        articulos: pedidos.map(p => ({ plato: p.plato, precio: p.precio, imagen: p.imagen })),
        total: pedidos.reduce((acc, p) => acc + p.precio, 0)
      };

      await fetch('http://localhost:4000/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orden),
      });

      setPedidos([]); 
      cerrarModal();  
      setMostrarToast(true); 
    } catch {
      alert('❌ Error al confirmar pedido');
    }
  };

  const total = pedidos.reduce((acc, p) => acc + p.precio, 0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pedidos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="pedido-content">
        {pedidos.length === 0 ? (
          <div className="pedido-vacio">No tienes ningún pedido agregado</div>
        ) : (
          <>
            <IonList>
              {pedidos.map((pedido) => (
                <IonItem key={pedido.id} lines="none">
                  <img src={pedido.imagen} alt="img" style={{ width: '80px', height: '60px', marginRight: '12px', borderRadius: '8px', objectFit: 'cover' }} />
                  <IonLabel>
                    <h2>{pedido.plato}</h2>
                    <p><strong>${pedido.precio.toFixed(2)}</strong></p>
                  </IonLabel>
                  <IonButton color="danger" onClick={() => eliminarPedido(pedido.id)}>Eliminar</IonButton>
                </IonItem>
              ))}
            </IonList>

            <div style={{ padding: '0 16px' }}>
              <p style={{ textAlign: 'right', fontWeight: 'bold', color: 'white' }}>Total: ${total.toFixed(2)}</p>
              <IonButton expand="block" color="success" onClick={abrirModal}>
                Confirmar Pedido
              </IonButton>
            </div>
          </>
        )}

        <IonModal isOpen={mostrarModal} onDidDismiss={cerrarModal}>
          <IonContent className="ion-padding">
            <h2>Datos del Cliente</h2>
            <IonInput label="Nombre" value={nombre} onIonChange={e => setNombre(e.detail.value!)} />
            <IonInput label="Apellido" value={apellido} onIonChange={e => setApellido(e.detail.value!)} />
            <IonInput label="Correo" value={correo} onIonChange={e => setCorreo(e.detail.value!)} />
            <IonInput label="Dirección" value={direccion} onIonChange={e => setDireccion(e.detail.value!)} />
            <IonButton expand="block" onClick={confirmarConDatos}>Confirmar</IonButton>
            <IonButton expand="block" color="medium" onClick={cerrarModal}>Cancelar</IonButton>
          </IonContent>
        </IonModal>

        <IonToast
          isOpen={mostrarToast}
          onDidDismiss={() => setMostrarToast(false)}
          message="Pedido confirmado"
          duration={2000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
