/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ComponentType } from 'react';
import { RouteRef } from '../routing';
import { AnyApiFactory } from '../apis/system';

export type RouteOptions = {
  // Whether the route path must match exactly, defaults to true.
  exact?: boolean;
};

export type RoutePath = string;

// Replace with using RouteRefs
export type LegacyRouteOutput = {
  type: 'legacy-route';
  path: RoutePath;
  component: ComponentType<{}>;
  options?: RouteOptions;
};

export type RouteOutput = {
  type: 'route';
  target: RouteRef;
  component: ComponentType<{}>;
  options?: RouteOptions;
};

export type RedirectRouteOutput = {
  type: 'redirect-route';
  from: RouteRef;
  to: RouteRef;
  options?: RouteOptions;
};

export type LegacyRedirectRouteOutput = {
  type: 'legacy-redirect-route';
  path: RoutePath;
  target: RoutePath;
  options?: RouteOptions;
};

export type FeatureFlagOutput = {
  type: 'feature-flag';
  name: string;
};

export type PluginOutput =
  | LegacyRouteOutput
  | RouteOutput
  | LegacyRedirectRouteOutput
  | RedirectRouteOutput
  | FeatureFlagOutput;

export type BackstagePlugin = {
  getId(): string;
  output(): PluginOutput[];
  getApis(): Iterable<AnyApiFactory>;
};

export type PluginConfig = {
  id: string;
  apis?: Iterable<AnyApiFactory>;
  register?(hooks: PluginHooks): void;
};

export type PluginHooks = {
  router: RouterHooks;
  featureFlags: FeatureFlagsHooks;
};

export type RouterHooks = {
  addRoute(
    target: RouteRef,
    Component: ComponentType<any>,
    options?: RouteOptions,
  ): void;

  /**
   * @deprecated See the `addRoute` method
   * @see https://github.com/backstage/backstage/issues/418
   */
  registerRoute(
    path: RoutePath,
    Component: ComponentType<any>,
    options?: RouteOptions,
  ): void;
};

export type FeatureFlagsHooks = {
  register(name: string): void;
};
