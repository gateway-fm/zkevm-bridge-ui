import { ComponentType, FC, useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { brand } from "src/brands";
import { useEnvContext } from "src/contexts/env.context";
import { RouteId, routes } from "src/routes";
import { areSettingsVisible } from "src/utils/feature-toggles";
import { Activity } from "src/views/activity/activity.view";
import { ActivityRedesign } from "src/views/activity/activity.view.redesign";
import { BridgeConfirmation } from "src/views/bridge-confirmation/bridge-confirmation.view";
import { BridgeConfirmationRedesign } from "src/views/bridge-confirmation/bridge-confirmation.view.redesign";
import { BridgeDetails } from "src/views/bridge-details/bridge-details.view";
import { BridgeDetailsRedesign } from "src/views/bridge-details/bridge-details.view.redisign";
import { FaucetRedesign } from "src/views/faucet/faucet.view.redesign";
import { Home } from "src/views/home/home.view";
import { HomeRedesign } from "src/views/home/home.view.redesign";
import { Login } from "src/views/login/login.view";
import { LoginRedesign } from "src/views/login/login.view.redesign";
import { NetworkError } from "src/views/network-error/network-error.view";
import { Settings } from "src/views/settings/settings.view";
import { PrivateRoute } from "src/views/shared/private-route/private-route.view";

const redesignComponents : Record<RouteId, ComponentType> = {
  activity: ActivityRedesign,
  bridgeConfirmation: BridgeConfirmationRedesign,
  bridgeDetails: BridgeDetailsRedesign,
  faucet: FaucetRedesign,
  home: HomeRedesign,
  login: LoginRedesign,
  networkError: NetworkError,
  settings: Settings,
};
const baseComponents: Record<RouteId, ComponentType> = {
  activity: Activity,
  bridgeConfirmation: BridgeConfirmation,
  bridgeDetails: BridgeDetails,
  faucet: FaucetRedesign,
  home: Home,
  login: Login,
  networkError: NetworkError,
  settings: Settings,
};

export const Router: FC = () => {
  const env = useEnvContext();
  const frontendType = env?.frontendType ;
  const components = useMemo<Record<RouteId, ComponentType>>(
    () => (frontendType === "old-design" ? baseComponents : redesignComponents),
    [frontendType]
  );

  const filteredRoutes = Object.values(routes).filter((route) => {
    if (route.id === "settings" && env && !areSettingsVisible(env)) {
      return false;
    }
    if (route.id === "faucet" && !brand.faucet.enabled) {
      return false;
    }
    return true;
  });

  return (
    <Routes>
      {filteredRoutes.map(({ id, isPrivate, path }) => {
        const Component = components[id];
        return (
          <Route
            element={
              isPrivate ? (
                <PrivateRoute>
                  <Component />
                </PrivateRoute>
              ) : (
                <Component />
              )
            }
            key={path}
            path={path}
          />
        );
      })}
      <Route element={<Navigate to={routes.home.path} />} path="*" />
    </Routes>
  );
};
