import Vue from 'vue';
import VueRouter from 'vue-router';

const Landing = () => import(/* webpackChunkName: "main" */ '../views/Landing.vue');

const AuthFormLayout = () => import(/* webpackChunkName: "main" */ '../views/Auth/FormLayout');
const AuthOtherLayout = () => import(/* webpackChunkName: "main" */ '../views/Auth/OtherLayout');
const AuthLayout = () => import(/* webpackChunkName: "main" */ '@components/Auth/Layout');
const AuthMain = () => import(/* webpackChunkName: "main" */ '@components/Auth/Main');
const AuthEmailSignin = () => import(/* webpackChunkName: "main" */ '@components/Auth/EmailSignin');
const AuthEmailReset = () => import(/* webpackChunkName: "main" */ '@components/Auth/EmailReset');
const AuthEmailSignup = () => import(/* webpackChunkName: "main" */ '@components/Auth/EmailSignup');
const AuthEmailNewPassword = () => import(/* webpackChunkName: "main" */ '../views/Auth/EmailNewPassword.vue');
const AuthEmailSignupSuccess = () => import(/* webpackChunkName: "main" */ '../views/Auth/EmailSignupSuccess.vue');
const AuthEmailVerify = () => import(/* webpackChunkName: "main" */ '../views/Auth/EmailVerify.vue');
const AuthSocialLogin = () => import(/* webpackChunkName: "main" */ '../views/Auth/SocialLogin.vue');
const AuthSocialCallback = () => import(/* webpackChunkName: "main" */ '../views/Auth/SocialCallback.vue');

const Guest = () => import(/* webpackChunkName: "main" */ '../views/Guest');
const GuestStart = () => import(/* webpackChunkName: "main" */ '../views/Guest/Start');
const GuestGrid = () => import(/* webpackChunkName: "main" */ '@sdk/views/Call/Grid');
const GuestExpanded = () => import(/* webpackChunkName: "main" */ '@sdk/views/Call/Expanded');
const GuestFinish = () => import(/* webpackChunkName: "main" */ '../views/Guest/Finish');

const Manage = () => import(/* webpackChunkName: "main" */ '../views/Manage');
const WorkspaceEdit = () => import(/* webpackChunkName: "main" */ '../views/WorkspaceEdit');

const PagesLayout = () => import(/* webpackChunkName: "main" */ '../views/Pages');
const PagesTest = () => import(/* webpackChunkName: "main" */ '../views/Pages/Test');

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
   * Authorization form routes
   */
  {
    path: '/auth',
    component: AuthFormLayout,
    children: [
      {
        path: '',
        component: AuthLayout,
        children: [
          {
            path: '',
            name: 'auth',
            component: AuthMain,
            meta: {
              depth: 1,
            },
          },

          {
            path: 'email/signin',
            name: 'auth-email-signin',
            component: AuthEmailSignin,
            meta: {
              depth: 2,
            },
          },
          {
            path: 'email/reset',
            name: 'auth-email-reset',
            component: AuthEmailReset,
            meta: {
              depth: 3,
            },
          },

          {
            path: 'email/signup',
            name: 'auth-email-signup',
            component: AuthEmailSignup,
            meta: {
              depth: 3,
            },
          },
        ],
      },
    ],
  },

  /**
   * Authorization other routes
   */
  {
    path: '/auth',
    component: AuthOtherLayout,
    children: [
      {
        path: 'email/signup/success',
        name: 'auth-email-signup-success',
        component: AuthEmailSignupSuccess,
      },
      {
        path: 'email/verify',
        name: 'auth-email-verify',
        component: AuthEmailVerify,
      },
      {
        path: 'password/reset',
        name: 'auth-email-password-reset',
        component: AuthEmailNewPassword,
      },
      {
        path: 'social/callback',
        name: 'auth-social-callback',
        component: AuthSocialCallback,
      },
      {
        path: 'social/:socialName/:action/',
        name: 'auth-social-login',
        component: AuthSocialLogin,
      },
      {
        path: 'social/:socialName/:action/:code',
        name: 'auth-social-link',
        component: AuthSocialLogin,
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
   * Different pages
   */
  {
    path: '/ws/pages',
    component: PagesLayout,
    children: [
      /**
       * Slack integration pages
       */
      {
        path: 'slack-success',
        name: 'page-slack-success',
        component: PagesTest,
      },
      {
        path: 'slack-error',
        name: 'page-slack-error',
        component: PagesTest,
      },
      {
        path: 'slack-reject',
        name: 'page-slack-reject',
        component: PagesTest,
      },

      /**
       * Changing password
       */
      {
        path: 'password-change',
        name: 'page-password-change',
        component: PagesTest,
      },

      /**
       * Social link
       */
      {
        path: 'social-link',
        name: 'page-social-link',
        component: PagesTest,
      },

      /**
       * Successful account creation
       */
      {
        path: 'account-done',
        name: 'page-account-done',
        component: PagesTest,
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
