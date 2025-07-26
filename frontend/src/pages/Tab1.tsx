import {
  IonPage,
  IonContent,
  IonButton,
  IonItem,
  IonInput,
  IonModal,
} from '@ionic/react';
import { useEffect, useState, useContext } from 'react';
import './Tab1.css';
import { PedidoContext } from '../PedidoContext';

interface Plato {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

const Tab1: React.FC = () => {
  const [menu, setMenu] = useState<Plato[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [platoSeleccionado, setPlatoSeleccionado] = useState<Plato | null>(null);

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');

  const { agregarPedido } = useContext(PedidoContext);

  useEffect(() => {
    fetch('http://localhost:4000/api/menu')
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  const abrirModal = (plato: Plato) => {
    setPlatoSeleccionado(plato);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setNombre('');
    setApellido('');
    setCorreo('');
    setDireccion('');
    setPlatoSeleccionado(null);
  };

  const confirmar = () => {
    if (platoSeleccionado) {
      agregarPedido({
        id: Date.now(),
        plato: platoSeleccionado.nombre,
        precio: platoSeleccionado.precio,
        nombre,
        apellido,
        correo,
        direccion,
      });
      cerrarModal();
    }
  };

  return (
    <IonPage>
      <IonContent className="menu-content">
        {menu.map((plato) => (
          <div key={plato.id} className="menu-item">
            <img src={plato.imagen} alt={plato.nombre} className="menu-imagen" />
            <div className="menu-detalle">
              <h2>{plato.nombre}</h2>
              <p>{plato.descripcion}</p>
              <p className="precio">${plato.precio.toFixed(2)}</p>
              <IonButton onClick={() => abrirModal(plato)}>Pedir</IonButton>
            </div>
          </div>
        ))}

        <IonModal isOpen={mostrarModal} onDidDismiss={cerrarModal}>
          <IonContent className="ion-padding">
            <h2>Datos del Cliente</h2>
            <IonItem><IonInput label="Nombre" value={nombre} onIonChange={e => setNombre(e.detail.value!)} /></IonItem>
            <IonItem><IonInput label="Apellido" value={apellido} onIonChange={e => setApellido(e.detail.value!)} /></IonItem>
            <IonItem><IonInput label="Correo" value={correo} onIonChange={e => setCorreo(e.detail.value!)} /></IonItem>
            <IonItem><IonInput label="Dirección" value={direccion} onIonChange={e => setDireccion(e.detail.value!)} /></IonItem>
            <IonButton expand="block" onClick={confirmar}>Añadir a pedidos</IonButton>
            <IonButton expand="block" color="medium" onClick={cerrarModal}>Cancelar</IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
