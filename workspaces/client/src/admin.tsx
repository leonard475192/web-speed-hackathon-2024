// import './side-effects';

import $ from 'jquery';
import ReactDOM from 'react-dom/client';

import { AdminApp } from '@wsh-2024/admin/src/index';

// import { preloadImages } from './utils/preloadImages';
import { registerServiceWorker } from './utils/registerServiceWorker';

const main = async () => {
  await registerServiceWorker();
  // await preloadImages();

  ReactDOM.createRoot($('#root').get(0)!).render(<AdminApp />);
};

main().catch(console.error);
