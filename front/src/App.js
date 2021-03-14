import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { AddNews } from './pages/AddNews';
import { RegisterPage } from './pages/RegisterPage';
import { Login } from './pages/Login';
import { UserProfilePage } from './pages/UserProfilePage';

import { AuthProvider } from './components/AuthProvider';
import { UserProvider } from './components/UserProvider';
import { EditUserProfilePage } from './pages/EditUserProfilePage';
import { ListNewsByUser } from './pages/ListNewsByUser';
import { LatestNews } from './pages/LatestNews';
import { SingleNewsPage } from './pages/SingleNewsPage';
import { EditSingleNewsPage } from './pages/EditSingleNewsPage';
import { UserListNews } from './pages/UserListNews';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <div>
            <Switch>
              <Route path="/register">
                <RegisterPage />
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

              <Route path="/news/:id/edit">
                <EditSingleNewsPage />
              </Route>

              {/*  <Route path="/news/:id/delete">
                <DeleteNewsPage />
              </Route>
              */}

              <Route path="/news/:id">
                <SingleNewsPage />
              </Route>

              <Route path="/addnews">
                <AddNews />
              </Route>

              <Route path="/userlistnews">
                <UserListNews />
              </Route>

              <Route path="/listnews">
                <ListNewsByUser />
              </Route>

              <Route path="/latestnews">
                <LatestNews />
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
