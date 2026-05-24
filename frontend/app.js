const api = {
  post: async (path, body) => {
    const res = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(state.accessToken ? { Authorization: `Bearer ${state.accessToken}` } : {}),
      },
      body: JSON.stringify(body),
    });
    return res.json();
  },
  get: async (path) => {
    const res = await fetch(path, {
      headers: {
        ...(state.accessToken ? { Authorization: `Bearer ${state.accessToken}` } : {}),
      },
    });
    return res.json();
  },
};

const state = {
  accessToken: null,
  refreshToken: null,
};

const elements = {
  email: document.getElementById('auth-email'),
  password: document.getElementById('auth-password'),
  name: document.getElementById('auth-name'),
  profileOutput: document.getElementById('profile-output'),
  sessionsOutput: document.getElementById('sessions-output'),
  adminOutput: document.getElementById('admin-output'),
  tokenStatus: document.getElementById('token-status'),
  refreshStatus: document.getElementById('refresh-status'),
};

const setTokens = (access, refresh) => {
  state.accessToken = access;
  state.refreshToken = refresh;
  elements.tokenStatus.textContent = access ? 'Set' : 'Not logged in';
  elements.refreshStatus.textContent = refresh ? 'Set' : 'Not set';
};

const handleResponse = async (result, target) => {
  target.textContent = JSON.stringify(result, null, 2);
};

const init = () => {
  document.getElementById('register-btn').addEventListener('click', async () => {
    const result = await api.post('/auth/register', {
      email: elements.email.value,
      password: elements.password.value,
      name: elements.name.value,
    });
    handleResponse(result, elements.profileOutput);
  });

  document.getElementById('login-btn').addEventListener('click', async () => {
    const result = await api.post('/auth/login', {
      email: elements.email.value,
      password: elements.password.value,
    });
    if (result.access_token) {
      setTokens(result.access_token, result.refresh_token);
    }
    handleResponse(result, elements.profileOutput);
  });

  document.getElementById('refresh-btn').addEventListener('click', async () => {
    const result = await api.post('/auth/refresh', {
      refreshToken: state.refreshToken,
    });
    if (result.access_token) {
      setTokens(result.access_token, result.refresh_token);
    }
    handleResponse(result, elements.profileOutput);
  });

  document.getElementById('profile-btn').addEventListener('click', async () => {
    const result = await api.get('/auth/me');
    handleResponse(result, elements.profileOutput);
  });

  document.getElementById('sessions-btn').addEventListener('click', async () => {
    const result = await api.get('/game-sessions');
    handleResponse(result, elements.sessionsOutput);
  });

  document.getElementById('admin-users-btn').addEventListener('click', async () => {
    const result = await api.get('/admin/users');
    handleResponse(result, elements.adminOutput);
  });
};

init();
