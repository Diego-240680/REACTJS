function App(){
  return  (
  <div>
  <h1>5A EVND</h1>
  <h2>Profesor: </h2>
  <h3>M.T.I Ricardo Luna Santos</h3>
  <h4>Diego</h4>
  <UserComponent />
  <ProfileComponent />
  <FeedComponent />
</div>
)
}

function UserComponent(){
  const nombre = 'Diego';
  const apellidos = 'Aldana Olvera';
  const nombrecompleto = <h2>El nombre es: {nombre} y sus apellidos {apellidos}</h2>;
  return <h1>User Component {nombrecompleto}</h1>;
}



function ProfileComponent(){
   const users = [
    { id: 1, name:'Diego', role: 'Web Developer'},
    { id: 2, name:'Andrea', role: 'Web Designer'},
    { id: 3, name:'Pao', role: 'Web Leader'},
  ]
  return (
<>
<p>Lista de usuarios del sistema</p>
<ul>
  {
  users.map(function(user, index){
    return (
      <li key={index}>{user.name} es un {user.role}</li>
    )
  })
}
</ul>
</>
  );
}



function FeedComponent(){
   const users = [
    { id: 1, name:'Pala', role: 'Material de construccion'},
    { id: 2, name:'Martilol', role: 'Material de construccion'},
    { id: 3, name:'Block', role: 'Material de Construccion'},
    { id: 4, name:'Cemento', role: 'Material de Construccion'},
  ]
   return (
<>
<p>Material de construccion</p>
<ul>
  {
  users.map(function(user, index){
    return (
      <li key={index}>{user.name} es un {user.role}</li>
    )
  })
}
</ul>
</>
  );
}

export default App

