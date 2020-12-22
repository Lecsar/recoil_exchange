import {RecoilRoot} from 'recoil';
import {SecuritiesPage} from './modules/securities';

export const App = () => {
  return (
    <RecoilRoot>
      <div style={{position: 'absolute', top: '20%', left: '40%'}}>
        <SecuritiesPage />
      </div>
    </RecoilRoot>
  );
};
