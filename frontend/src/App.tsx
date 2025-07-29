import { Redirect, Route, useLocation, useHistory } from 'react-router-dom';
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
import { pizza, cart } from 'ionicons/icons';
import { useEffect } from 'react';

import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

import '@ionic/react/css/core.css';
import './theme/variables.css';

setupIonicReact();

const AppContent: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const redirected = sessionStorage.getItem('redirectedToTab3');

    if (!redirected && location.pathname !== '/tab3') {
      sessionStorage.setItem('redirectedToTab3', 'true');
      history.replace('/tab3'); 
    }
  }, []);

  const isTab3 = location.pathname === '/tab3';

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tab1" component={Tab1} />
        <Route exact path="/tab2" component={Tab2} />
        <Route exact path="/tab3" component={Tab3} />
        <Route exact path="/" render={() => <Redirect to="/tab3" />} />
      </IonRouterOutlet>

      {!isTab3 && (
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={pizza} />
            <IonLabel>Menú</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={cart} />
            <IonLabel>Tú Pedido</IonLabel>
          </IonTabButton>
        </IonTabBar>
      )}
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