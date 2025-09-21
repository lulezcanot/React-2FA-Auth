import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:7001/api';

// Función para hacer login y obtener cookies de sesión
async function loginUser() {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser',
        password: 'testpassword'
      }),
      credentials: 'include'
    });

    const cookies = response.headers.get('set-cookie');
    return { success: response.ok, cookies };
  } catch (error) {
    console.error('Error en login:', error);
    return { success: false, cookies: null };
  }
}

// Función para probar endpoints de métricas
async function testMetricsEndpoints(cookies) {
  const endpoints = [
    '/metrics',
    '/metrics/false-positive-rate',
    '/metrics/success-rate',
    '/metrics/response-time',
    '/metrics/by-period?period=daily&limit=7',
    '/metrics/dashboard'
  ];

  console.log('\n=== Probando Endpoints de Métricas ===\n');

  for (const endpoint of endpoints) {
    try {
      console.log(`Probando: GET ${endpoint}`);
      
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Cookie': cookies || '',
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      const data = await response.json();
      
      console.log(`Status: ${response.status}`);
      console.log(`Response:`, JSON.stringify(data, null, 2));
      console.log('---\n');
      
    } catch (error) {
      console.error(`Error en ${endpoint}:`, error.message);
      console.log('---\n');
    }
  }
}

// Función principal
async function main() {
  console.log('=== Test de Sistema de Métricas 2FA ===\n');
  
  // Nota: Para probar completamente, necesitarías un usuario válido
  // Por ahora, probamos los endpoints sin autenticación para ver las respuestas de error
  console.log('Probando endpoints sin autenticación (esperamos errores 401):\n');
  
  await testMetricsEndpoints(null);
  
  console.log('\n=== Información de Endpoints Disponibles ===');
  console.log('Base URL:', BASE_URL);
  console.log('\nEndpoints de métricas:');
  console.log('- GET /api/metrics/ - Métricas completas');
  console.log('- GET /api/metrics/false-positive-rate - Tasa de falsos positivos');
  console.log('- GET /api/metrics/success-rate - Tasa de éxito');
  console.log('- GET /api/metrics/response-time - Tiempo de respuesta');
  console.log('- GET /api/metrics/by-period - Métricas por período');
  console.log('- GET /api/metrics/dashboard - Dashboard completo');
  
  console.log('\nPara probar con autenticación:');
  console.log('1. Registra un usuario: POST /api/auth/register');
  console.log('2. Haz login: POST /api/auth/login');
  console.log('3. Configura 2FA: POST /api/auth/2fa/setup');
  console.log('4. Verifica 2FA: POST /api/auth/2fa/verify');
  console.log('5. Consulta métricas: GET /api/metrics/*');
}

// Ejecutar el test
main().catch(console.error);
