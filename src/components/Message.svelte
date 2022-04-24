<script>
  // Message functionality inspired from https://github.com/fireship-io/gun-chat
  export let message;
  export let sender;

  const messageClass = message.who === sender ? 'sent' : 'received';
  const avatar = `https://avatars.dicebear.com/api/personas/${message.who}.svg`;
  const ts = new Date(message.when);
  
</script>

<div class={`message ${messageClass}`}>
  <div class="avatar-with-username">
    <img src={avatar} alt="avatar" />
    <element class="username">{message.who}</element>
  </div>
  
  
  <div class="message-text">
    <p>{message.what}</p>

    <time>{ts.toLocaleTimeString()}</time>
  </div>
  
</div>