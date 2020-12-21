import {RecoilRoot} from 'recoil';
import {PageSecurities} from './modules/securities';

export const App = () => {
  return (
    <RecoilRoot>
      <div style={{position: 'absolute', top: '20%', left: '40%'}}>
        <PageSecurities />
      </div>
    </RecoilRoot>
  );
};
