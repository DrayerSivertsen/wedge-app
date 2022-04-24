<script>
  // import database
  import { LOGGEDIN, user, USERNAME } from "./Gunjs.js";
  import MessageBoard from "./MessageBoard.svelte";
  import { onMount } from "svelte";

  // USERNAME/LOGGEDIN defined in Svelte store
  let password = "";
  let MessageBoardList = [0]; // MessageBoardList unused as we have one global MessageBoard right now

  onMount(() => {
    // Called on component activation
    if (user.is) {
      // IF we are already logged in, set loggedIn to true
      $LOGGEDIN = true;

      console.log(`${$USERNAME} is logged in already!`);
    }
  });

  //
  function login_helper({ err }) {
    if (err) {
      err && alert(err);
    } else {
      $LOGGEDIN = true;
    }
  }

  function signup_helper({ err }) {
    if (err) {
      err && alert(err);
    } else {
      user.auth($USERNAME, password, login_helper);
    }
  }

  function login() {
    user.auth($USERNAME, password, login_helper);
  }

  function signup() {
    user.create($USERNAME, password, signup_helper);
  }

</script>

{#if !$LOGGEDIN}
  <label for="username">Username</label>
  <input name="username" bind:value={$USERNAME} minlength="3" maxlength="16" />
  <label for="password">Password</label>
  <input name="password" bind:value={password} type="password" />
  <!-- <p>{password}</p> -->
  <button class="login" on:click={login}>Login</button>
  <button class="login" on:click={signup}>Sign Up</button>
{:else}
  <MessageBoard />
{/if}
