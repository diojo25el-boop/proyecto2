import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

const initial=[
 {id:1,type:'Alerta de seguridad',title:'Persona sospechosa en calle Roble 8',place:'Calle Roble 8',time:'10:25',status:'Activa'},
 {id:2,type:'Aviso vecinal',title:'Corte de agua programado',place:'Toda la colonia',time:'09:40',status:'Informativa'},
 {id:3,type:'Solicitud',title:'Luminaria apagada',place:'Calle Roble 15',time:'Ayer',status:'En seguimiento'}
];

function App(){
 const [items,setItems]=useState(initial);
 const [form,setForm]=useState({type:'Aviso vecinal',title:'',place:''});
 const [sent,setSent]=useState(false);

 const add=e=>{
   e.preventDefault(); if(!form.title||!form.place)return;
   setItems([{id:Date.now(),...form,time:'Ahora',status:form.type==='Alerta de seguridad'?'Activa':'Nueva'},...items]);
   setForm({type:'Aviso vecinal',title:'',place:''}); setSent(true);
   setTimeout(()=>setSent(false),2500);
 };
 const advance=id=>setItems(items.map(x=>x.id===id?{...x,status:x.status==='En seguimiento'?'Atendida':'En seguimiento'}:x));

 return <div>
  <header>
   <div><span>RESIDENCIAL LOS ROBLES</span><h1>Comunidad Segura</h1><p>Comunicación vecinal rápida para informar, prevenir y dar seguimiento.</p></div>
   <button className="panic" onClick={()=>alert('Alerta simulada enviada a la comunidad')}>🚨 ALERTA</button>
  </header>
  <main>
   <section className="intro">
    <div><h2>Información importante para todos</h2><p>Publica un aviso, reporta una situación o consulta las novedades de la colonia desde un solo lugar.</p></div>
    <div className="numbers"><b>{items.length}</b><small>comunicados</small><b>{items.filter(x=>x.status==='Activa').length}</b><small>alertas activas</small></div>
   </section>
   {sent&&<div className="success">✓ Comunicación publicada correctamente.</div>}
   <div className="layout">
    <form className="card" onSubmit={add}>
     <h2>Nueva comunicación</h2>
     <label>Tipo<select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option>Aviso vecinal</option><option>Alerta de seguridad</option><option>Solicitud</option></select></label>
     <label>Título<input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="¿Qué quieres comunicar?"/></label>
     <label>Ubicación<input value={form.place} onChange={e=>setForm({...form,place:e.target.value})} placeholder="Ej. Calle Roble 12"/></label>
     <button type="submit">Publicar comunicación</button>
    </form>
    <section className="card">
     <div className="head"><h2>Comunicaciones recientes</h2><span>Tiempo real · demo</span></div>
     {items.map(x=><article className={x.type==='Alerta de seguridad'?'item alert':'item'} key={x.id}>
       <div><strong>{x.title}</strong><p>{x.type} · {x.place} · {x.time}</p></div>
       {x.type==='Solicitud'&&<button className="mini" onClick={()=>advance(x.id)}>{x.status}</button>}
       {x.type==='Alerta de seguridad'&&<em>{x.status}</em>}
     </article>)}
    </section>
   </div>
  </main>
  <footer>Prototipo académico · Scrum · React</footer>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
