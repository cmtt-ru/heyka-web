import Vue from 'vue';
import VueRouter from 'vue-router';

const Landing = () => import(/* webpackChunkName: "main" */ '../views/Landing.vue');

const NewAuth = () => import(/* webpackChunkName: "main" */ '../views/NewAuth');
const NewAuthMain = () => import(/* webpackChunkName: "main" */ '../views/NewAuth/Main');
const NewAuthEmailSignin = () => import(/* webpackChunkName: "main" */ '../views/NewAuth/EmailSignin');
const NewAuthEmailReset = () => import(/* webpackChunkName: "main" */ '../views/NewAuth/EmailReset');
const NewAuthEmailSignup = () => import(/* webpackChunkName: "main" */ '../views/NewAuth/EmailSignup');

const Auth = () => import(/* webpackChunkName: "main" */ '../views/Auth/Auth.vue');
const SignIn = () => import(/* webpackChunkName: "main" */ '../views/Auth/SignIn.vue');
const Reset = () => import(/* webpackChunkName: "main" */ '../views/Auth/Reset.vue');
const Register = () => import(/* webpackChunkName: "main" */ '../views/Auth/Register.vue');
const RegSuccess = () => import(/* webpackChunkName: "main" */ '../views/Auth/RegSuccess.vue');
const VerifyEmail = () => import(/* webpackChunkName: "main" */ '../views/Auth/Verify.vue');

const SocialLogin = () => import(/* webpackChunkName: "main" */ '../views/Auth/SocialLogin.vue');
const SocialCallback = () => import(/* webpackChunkName: "main" */ '../views/Auth/SocialCallback.vue');

const Guest = () => import(/* webpackChunkName: "main" */ '../views/Guest');
const GuestStart = () => import(/* webpackChunkName: "main" */ '../views/Guest/Start');
const GuestGrid = () => import(/* webpackChunkName: "main" */ '@sdk/views/Call/Grid');
const GuestExpanded = () => import(/* webpackChunkName: "main" */ '@sdk/views/Call/Expanded');
const GuestFinish = () => import(/* webpackChunkName: "main" */ '../views/Guest/Finish');

const Manage = () => import(/* webpackChunkName: "main" */ '../views/Manage');
const WorkspaceEdit = () => import(/* webpackChunkName: "main" */ '../views/WorkspaceEdit');

const JanusMonitoring = () => import(/* webpackChunkName: "janus" */ '../views/JanusMonitoring');
const JanusDashboard = () => import(/* webpackChunkName: "janus" */ '../views/JanusDashboard');

Vue.use(VueRouter);

const routes = [
  /**
   * Static pages routes
   */
  {
    path: '/',
    name: 'landing',
    component: Landing,
  },

  /**
   * Authorization routes
   */
  {
    path: '/new-auth',
    component: NewAuth,
    children: [
      {
        path: '',
        name: 'new-auth',
        component: NewAuthMain,
        meta: {
          depth: 1,
        },
      },

      {
        path: 'email-signin',
        name: 'new-auth-email-signin',
        component: NewAuthEmailSignin,
        meta: {
          depth: 2,
        },
      },
      {
        path: 'email-reset',
        name: 'new-auth-email-reset',
        component: NewAuthEmailReset,
        meta: {
          depth: 3,
        },
      },

      {
        path: 'email-signup',
        name: 'new-auth-email-signup',
        component: NewAuthEmailSignup,
        meta: {
          depth: 3,
        },
      },

    ],
  },

  /**
   * Authorization routes
   */
  {
    path: '/auth',
    component: Auth,
    children: [
      {
        path: '',
        name: 'auth',
        component: SignIn,
      },
      {
        path: 'register',
        name: 'register',
        component: Register,
      },
      {
        path: 'reg-success',
        name: 'regSuccess',
        component: RegSuccess,
      },
      {
        path: 'email/verify',
        name: 'verify',
        component: VerifyEmail,
      },
      {
        path: 'social/callback',
        name: 'auth-social-callback',
        component: SocialCallback,
      },
      {
        path: 'social/:socialName/:action/',
        name: 'auth-social-login',
        component: SocialLogin,
      },
      {
        path: 'social/:socialName/:action/:code',
        name: 'auth-social-link',
        component: SocialLogin,
      },
      {
        path: 'password/reset',
        name: 'reset',
        component: Reset,
      },
    ],
  },

  /**
   * Manage workspaces
   */
  {
    path: '/manage',
    component: Manage,
    children: [
      {
        path: ':workspaceId',
        name: 'manage',
        component: Manage,
      },
      {
        path: ':workspaceId/:code',
        component: Manage,
      },
    ],
  },

  /**
   * Create & edit workspace
   */
  {
    path: '/ws',
    component: WorkspaceEdit,
    children: [
      {
        path: 'create',
        component: WorkspaceEdit,
      },
      {
        path: 'create/:code',
        name: 'workspace-create',
        component: WorkspaceEdit,
      },
      {
        path: 'edit/:id',
        name: 'workspace-edit',
        component: WorkspaceEdit,
      },
    ],
  },

  /**
   * Guest routes
   */
  {
    path: '/guest/:code',
    name: 'guest',
    component: Guest,
    children: [
      {
        path: 'start',
        name: 'guest-start',
        component: GuestStart,
      },
      {
        path: 'grid',
        name: 'grid',
        component: GuestGrid,
      },
      {
        path: 'expanded/:id',
        name: 'expanded',
        component: GuestExpanded,
      },
      {
        path: 'finish',
        name: 'guest-finish',
        component: GuestFinish,
      },
    ],
  },

  /**
   * Janus monitoring
   */
  {
    path: '/janus-monitoring*',
    name: 'janus-monitoring',
    component: JanusMonitoring,
  },

  /**
   * Janus dashboard
   */
  {
    path: '/janus-dashboard*',
    name: 'janus-dashboard',
    component: JanusDashboard,
  },

];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
