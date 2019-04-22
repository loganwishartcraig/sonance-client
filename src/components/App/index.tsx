import * as React from 'react';
import { Link } from 'react-router-dom';

const App: React.FunctionComponent = () => (
    <div>
        <Link to="/login">Login</Link><br />
        <span>Welcome to the app!</span>
    </div>
);

export default App;
