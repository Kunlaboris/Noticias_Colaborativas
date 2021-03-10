import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { AddNews } from './pages/AddNews';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { UserProfilePage } from './pages/UserProfilePage';

import { AuthProvider } from './components/AuthProvider';
import { UserProvider } from './components/UserProvider';
import { EditUserProfilePage } from './pages/EditUserProfilePage';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <div>
            <Switch>
              <Route path="/register">
                <Register />
              </Route>

              <Route path="/login">
                <Login />
              </Route>

              <Route path="/users/:id/edit">
                <EditUserProfilePage />
              </Route>

              <Route path="/users/:id">
                <UserProfilePage />
              </Route>

              <Route path="/addnews">
                <AddNews />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
