<script lang="ts">
  import { user, LOGGEDIN } from './Gunjs.js'
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'sveltestrap';

  function signout() {
    LOGGEDIN.set(false);
    user.leave();
  }
</script>

<Navbar class="py-4" color="dark" dark>
  <NavbarBrand href="/" class="me-auto">WEDGE Decentralized Chat</NavbarBrand>
  {#if $LOGGEDIN}
  <NavItem>
    <NavLink on:click={signout}>Sign Out</NavLink>
  </NavItem>
  {/if}
</Navbar>

