import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { useState } from 'react';

const Tab2: React.FC = () => {
  const [nombre, setNombre] = useState('');

  const enviar = async () => {
    if (nombre.trim()) {
      await fetch('http://localhost:4000/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre }),
      });
      setNombre('');
      alert('Pedido agregado');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Agregar Pedido</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="floating">Nombre del pedido</IonLabel>
          <IonInput value={nombre} onIonChange={e => setNombre(e.detail.value!)} />
        </IonItem>
        <IonButton expand="block" onClick={enviar}>
          Guardar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
