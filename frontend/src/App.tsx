import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useEffect } from 'react';
import { home, pizza, cart } from 'ionicons/icons';

import Tab1 from './pages/Tab1'; // Menú
import Tab2 from './pages/Tab2'; // Pedidos
import Tab3 from './pages/Tab3'; // Inicio

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';

import './theme/variables.css';

setupIonicReact();

const AppContent: React.FC = () => {
  useEffect(() => {
    if (window.location.pathname !== '/tab3') {
      window.location.replace('/tab3');
    }
  }, []);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tab1">
          <Tab1 />
        </Route>
        <Route exact path="/tab2">
          <Tab2 />
        </Route>
        <Route exact path="/tab3">
          <Tab3 />
        </Route>
        <Route exact path="/">
          <Redirect to="/tab3" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="tab3" href="/tab3">
          <IonIcon icon={home} />
          <IonLabel>Inicio</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab1" href="/tab1">
          <IonIcon icon={pizza} />
          <IonLabel>Menú</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tab2">
          <IonIcon icon={cart} />
          <IonLabel>Pedidos</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <AppContent />
    </IonReactRouter>
  </IonApp>
);

export default App;
