import * as React from 'react';
import UserNav from '../UserNav';
import ReceiptCapture from '../Receipt/ReceiptCapture';

const App: React.FunctionComponent = () => (
    <div>
        <UserNav />
        <span>Welcome to the app!</span>
        <ReceiptCapture />
    </div>
);

export default App;
