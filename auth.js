async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await supabase.auth.signInWithPassword({ email, password });
}

async function logout() {
  await supabase.auth.signOut();
  location.reload();
}

document.getElementById("login").onclick = login;
document.getElementById("logout").onclick = logout;

supabase.auth.onAuthStateChange((_event, session) => {
  document.getElementById("auth").hidden = !!session;
  document.getElementById("library").hidden = !session;
});
