import { Provider } from '@nestjs/common';
import { Pool, Client } from 'pg';

const connectionString =
  'postgres://postgres.ngervwbvoysynwurxrjl:Thanh@290420000@aws-0-us-west-1.pooler.supabase.com:5432/postgres';

const pool = new Pool({
  connectionString: connectionString,
  max: 20,
  idleTimeoutMillis: 3000000,
  connectionTimeoutMillis: 5000000,
});

async function getClient(): Promise<Client> {
  try {
    const client = await pool.connect();
    console.log('Connected to Supabase database successfully');
    return client;
  } catch (error) {
    console.error('Error connecting to Supabase database:', error);
    throw error;
  }
}
const supabaseClientProvider: Provider = {
  provide: 'SUPABASE_CLIENT',
  useFactory: async () => await getClient(),
};

export default supabaseClientProvider;
