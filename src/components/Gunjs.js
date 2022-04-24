import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';
import { writable } from 'svelte/store'


// Setup Database
export const gdb = GUN();

// Authenticate, CreateAccount, get, put, all part of GUN
// Make writeable store for USERNAME
export const USERNAME = writable();
export const LOGGEDIN = writable(false);

// Remember user
export const user = gdb.user().recall({sessionStorage: true});

user.get('alias').on(v => USERNAME.set(v))


gdb.on('auth', async(event) => {
  const alias = await user.get('alias'); // username string
  USERNAME.set(alias);

  console.log(`signed in as ${alias}`);
});


