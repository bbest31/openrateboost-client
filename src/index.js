// scroll bar
import 'simplebar/src/simplebar.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MixpanelProvider } from 'react-mixpanel-browser';
import { Auth0Provider } from '@auth0/auth0-react';
import { AUTH0_API, MIXPANEL_API } from './config';
// contexts
import { SettingsProvider } from './contexts/SettingsContext';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';

//
import App from './App';

// ----------------------------------------------------------------------

ReactDOM.render(
  <MixpanelProvider
    config={{ debug: MIXPANEL_API.debug, track_pageview: true, ignore_dnt: true }}
  >
    <Auth0Provider
      domain={AUTH0_API.domain}
      clientId={AUTH0_API.clientId}
      authorizationParams={{
        redirect_uri: AUTH0_API.redirectURI,
        audience: AUTH0_API.audience,
        scope: AUTH0_API.scope,
      }}
    >
      <HelmetProvider>
        <SettingsProvider>
          <CollapseDrawerProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CollapseDrawerProvider>
        </SettingsProvider>
      </HelmetProvider>
    </Auth0Provider>
  </MixpanelProvider>,
  document.getElementById('root')
);
