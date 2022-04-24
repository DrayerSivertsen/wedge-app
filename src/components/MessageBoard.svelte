<script>
  // MessageBoard functionality inspired from https://github.com/fireship-io/gun-chat
  // Heavily modified to support encryption and non-public data
  import Message from "./Message.svelte";
  import { onMount } from "svelte";
  import { USERNAME, user } from "./Gunjs.js";
  import debounce from "lodash.debounce";
  import { Icon } from 'sveltestrap';

  import GUN from "gun";
  const db = GUN();

  let newMessage;
  let MessageList = [];

  let scrollBottom;
  let lastScrollTop;
  let canAutoScroll = true;
  let unreadMessages = false;
  let encryptionKey = "zM23CM6D7W2YxfmW4uW2g@Zjh^^%u*#v";
  function autoScroll() {
    setTimeout(() => scrollBottom?.scrollIntoView({ behavior: "auto" }), 50);
    unreadMessages = false;
  }

  function watchScroll(e) {
    canAutoScroll = (e.target.scrollTop || Infinity) > lastScrollTop;
    lastScrollTop = e.target.scrollTop;
  }

  $: debouncedWatchScroll = debounce(watchScroll, 1000);

  function getMessages (encryptionKey) {
    var match = {
      // lexical queries are kind of like a limited RegEx or Glob.
      ".": {
        // property selector
        ">": new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
      },
      "-": 1, // filter in reverse
    };
    db
    .get("b3z7!kn@ZxLuH2")
    .map(match)
    .once(async (data, id) => {
      if (data) {
        // Key for end-to-end encryption
        

        var message = {
          // transform the data
          who: await db.user(data).get("alias"), // a user might lie who they are! So let the user system detect whose data it is.
          what: (await SEA.decrypt(data.what, encryptionKey)) + "", // force decrypt as text.
          when: GUN.state.is(data, "what"), // get the internal timestamp for the what property.
        };

        if (message.what) {
          MessageList = [...MessageList.slice(-100), message].sort(
            (a, b) => a.when - b.when
          );
          if (canAutoScroll) {
            autoScroll();
          } else {
            unreadMessages = true;
          }
        }
      }
    });
  }
  onMount(() => {
    // GetMessages
    getMessages(encryptionKey);
  });

  async function sendMessage() {
    const secret = await SEA.encrypt(newMessage, encryptionKey);
    const message = user.get("all").set({ what: secret });
    const index = new Date().toISOString();
    db.get("b3z7!kn@ZxLuH2").get(index).put(message);
    newMessage = "";
    canAutoScroll = true;
    autoScroll();
  }


</script>

<div class="container">
  <main on:scroll={debouncedWatchScroll}>
    {#each MessageList as message (message.when)}
      <Message {message} sender={$USERNAME} />
    {/each}
    <div class="dummy" bind:this={scrollBottom} />
  </main>
</div>
<div class="message-box">
  <form on:submit|preventDefault={sendMessage}>
    <input id="compose-box"
      type="text"
      placeholder="Message..."
      bind:value={newMessage}
      maxlength="100"
    />
    <button type="submit" disabled={!newMessage}><Icon name="send" /></button>
  </form>
</div>
