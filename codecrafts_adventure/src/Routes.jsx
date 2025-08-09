import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import QuestMapChallengeSelection from './pages/quest-map-challenge-selection';
import MainGameInterface from './pages/main-game-interface';
import CharacterProfileProgression from './pages/character-profile-progression';
import SettingsGameConfiguration from './pages/settings-game-configuration';
import UserRegistrationCharacterCreation from './pages/user-registration-character-creation';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CharacterProfileProgression />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/quest-map-challenge-selection" element={<QuestMapChallengeSelection />} />
        <Route path="/main-game-interface" element={<MainGameInterface />} />
        <Route path="/character-profile-progression" element={<CharacterProfileProgression />} />
        <Route path="/settings-game-configuration" element={<SettingsGameConfiguration />} />
        <Route path="/user-registration-character-creation" element={<UserRegistrationCharacterCreation />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
