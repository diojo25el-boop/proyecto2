import React, { useEffect, useState } from "react";


const productosIniciales = [
  {
    id: 1,
    nombre: "Laptop Profesional",
    categoria: "Tecnología",
    precio: 15999,
    descripcion:
      "Laptop ideal para estudiar, trabajar y realizar actividades escolares.",
    caracteristicas: [
      "Procesador de alto rendimiento",
      "Memoria RAM de 8 GB",
      "Almacenamiento SSD",
      "Diseño portátil",
    ],
    imagen:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    nombre: "Audífonos inalámbricos",
    categoria: "Audio",
    precio: 899,
    descripcion:
      "Audífonos inalámbricos para escuchar música, estudiar y realizar llamadas.",
    caracteristicas: [
      "Conexión inalámbrica",
      "Micrófono integrado",
      "Diseño cómodo",
      "Uso diario",
    ],
    imagen:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    nombre: "Smartphone de última generación",
    categoria: "Tecnología",
    precio: 9499,
    descripcion:
      "Teléfono inteligente para comunicación, fotografías y aplicaciones.",
    caracteristicas: [
      "Pantalla táctil",
      "Cámara integrada",
      "Conectividad inalámbrica",
      "Diseño moderno",
    ],
    imagen:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    nombre: "Mochila para Laptop",
    categoria: "Accesorios",
    precio: 650,
    descripcion:
      "Mochila práctica para transportar una laptop y otros accesorios.",
    caracteristicas: [
      "Compartimento para laptop",
      "Espacio para accesorios",
      "Correas ajustables",
      "Diseño práctico",
    ],
    imagen:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    nombre: "Teclado inalámbrico",
    categoria: "Accesorios",
    precio: 599,
    descripcion:
      "Teclado inalámbrico para mejorar la comodidad al trabajar o estudiar.",
    caracteristicas: [
      "Conexión inalámbrica",
      "Diseño compacto",
      "Teclas cómodas",
      "Uso en oficina o escuela",
    ],
    imagen:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    nombre: "Bocina Bluetooth",
    categoria: "Audio",
    precio: 749,
    descripcion:
      "Bocina portátil para escuchar música en diferentes espacios.",
    caracteristicas: [
      "Conexión Bluetooth",
      "Diseño portátil",
      "Fácil de utilizar",
      "Adecuada para uso cotidiano",
    ],
    imagen:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
  },
];




const leerLocalStorage = (clave, valorInicial) => {
  try {
    const valorGuardado = localStorage.getItem(clave);

    if (valorGuardado === null) {
      return valorInicial;
    }

    return JSON.parse(valorGuardado);
  } catch {
    return valorInicial;
  }
};

const formatoMoneda = (cantidad) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(cantidad);
};




function App() {


  const [vista, setVista] = useState("catalogo");

  const [vistaSprint3, setVistaSprint3] = useState("historial");



  const [productos] = useState(productosIniciales);

  const [productoSeleccionado, setProductoSeleccionado] =
    useState(null);

  const [busqueda, setBusqueda] = useState("");

  const [categoriaFiltro, setCategoriaFiltro] =
    useState("Todas");

  const [precioMax, setPrecioMax] = useState("");




  const [carrito, setCarrito] = useState([]);

  const [datosPago, setDatosPago] = useState({
    nombre: "",
    correo: "",
    direccion: "",
    metodo: "Tarjeta",
  });

  const [errorPago, setErrorPago] = useState("");

  const [pedidoConfirmado, setPedidoConfirmado] =
    useState(null);




  const [historialPedidos, setHistorialPedidos] =
    useState(() =>
      leerLocalStorage("tiendaFacilHistorial", [])
    );




  const [perfil, setPerfil] = useState(() =>
    leerLocalStorage("tiendaFacilPerfil", {
      nombre: "",
      correo: "",
      categoriaFavorita: "Tecnología",
      recibirNovedades: true,
    })
  );

  const [mensajePerfil, setMensajePerfil] = useState("");

  const [errorPerfil, setErrorPerfil] = useState("");



  const [categoriaRecomendacion, setCategoriaRecomendacion] =
    useState("Preferida");




  useEffect(() => {
    localStorage.setItem(
      "tiendaFacilPerfil",
      JSON.stringify(perfil)
    );
  }, [perfil]);


 

  useEffect(() => {
    localStorage.setItem(
      "tiendaFacilHistorial",
      JSON.stringify(historialPedidos)
    );
  }, [historialPedidos]);




  const categorias = [
    "Todas",
    ...new Set(productos.map((producto) => producto.categoria)),
  ];

  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoriaFiltro === "Todas" ||
      producto.categoria === categoriaFiltro;

    const coincidePrecio =
      precioMax === "" ||
      producto.precio <= Number(precioMax);

    return (
      coincideBusqueda &&
      coincideCategoria &&
      coincidePrecio
    );
  });




  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const existe = carritoActual.find(
        (item) => item.id === producto.id
      );

      if (existe) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [
        ...carritoActual,
        {
          ...producto,
          cantidad: 1,
        },
      ];
    });

    setVista("carrito");
  };


  const cambiarCantidad = (id, cantidad) => {
    if (cantidad < 1) {
      eliminarDelCarrito(id);
      return;
    }

    setCarrito((carritoActual) =>
      carritoActual.map((item) =>
        item.id === id
          ? { ...item, cantidad: Number(cantidad) }
          : item
      )
    );
  };


  const eliminarDelCarrito = (id) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.id !== id)
    );
  };


  const calcularTotal = () => {
    return carrito.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    );
  };


  const cantidadProductosCarrito = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );



  const actualizarDatosPago = (evento) => {
    const { name, value } = evento.target;

    setDatosPago((datosActuales) => ({
      ...datosActuales,
      [name]: value,
    }));
  };


  const handlePagoSubmit = (evento) => {
    evento.preventDefault();

    setErrorPago("");

    if (carrito.length === 0) {
      setErrorPago(
        "Tu carrito está vacío. Agrega productos antes de continuar."
      );
      return;
    }

    if (
      !datosPago.nombre.trim() ||
      !datosPago.correo.trim() ||
      !datosPago.direccion.trim()
    ) {
      setErrorPago(
        "Completa tu nombre, correo electrónico y dirección."
      );
      return;
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(datosPago.correo)) {
      setErrorPago(
        "Escribe un correo electrónico válido."
      );
      return;
    }

    const numeroOrden =
      "TF-" + Date.now().toString().slice(-8);

    const fechaPedido = new Date().toLocaleString("es-MX");

    const totalPedido = calcularTotal();

    const productosPedido = carrito.map((item) => ({
      id: item.id,
      nombre: item.nombre,
      precio: item.precio,
      cantidad: item.cantidad,
    }));

    const nuevoPedido = {
      numero: numeroOrden,
      fecha: fechaPedido,
      nombre: datosPago.nombre,
      correo: datosPago.correo,
      direccion: datosPago.direccion,
      metodo: datosPago.metodo,
      total: totalPedido,
      productos: productosPedido,
      estado: "Confirmado",
    };

    setPedidoConfirmado(nuevoPedido);

  

    setHistorialPedidos((historialActual) => [
      nuevoPedido,
      ...historialActual,
    ]);

    setCarrito([]);

    setVista("confirmacion");
  };




  const abrirCatalogo = () => {
    setVista("catalogo");
    setProductoSeleccionado(null);
  };


  const abrirDetalle = (producto) => {
    setProductoSeleccionado(producto);
    setVista("detalle");
  };


  const abrirSeccionSprint3 = (seccion) => {
    setVistaSprint3(seccion);
    setVista("sprint3");
  };



  const actualizarPerfil = (evento) => {
    const { name, value, type, checked } = evento.target;

    setPerfil((perfilActual) => ({
      ...perfilActual,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const guardarPerfil = (evento) => {
    evento.preventDefault();

    setMensajePerfil("");
    setErrorPerfil("");

    if (!perfil.nombre.trim()) {
      setErrorPerfil(
        "Escribe tu nombre para guardar el perfil."
      );
      return;
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(perfil.correo)) {
      setErrorPerfil(
        "Escribe un correo electrónico válido."
      );
      return;
    }

    localStorage.setItem(
      "tiendaFacilPerfil",
      JSON.stringify(perfil)
    );

    setMensajePerfil(
      "Tu perfil y tus preferencias se guardaron correctamente."
    );
  };




  const productosRecomendados = productos.filter((producto) => {
    if (categoriaRecomendacion === "Todas") {
      return true;
    }

    if (categoriaRecomendacion === "Preferida") {
      return (
        producto.categoria === perfil.categoriaFavorita
      );
    }

    return producto.categoria === categoriaRecomendacion;
  });




  const estilos = {
    pagina: {
      minHeight: "100vh",
      backgroundColor: "#f3f6fb",
      color: "#243247",
      fontFamily: "Arial, Helvetica, sans-serif",
    },

    encabezado: {
      backgroundColor: "#123b66",
      color: "white",
      padding: "20px",
    },

    encabezadoContenido: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "15px",
      flexWrap: "wrap",
    },

    logo: {
      margin: 0,
      fontSize: "30px",
    },

    subtitulo: {
      margin: "5px 0 0",
      color: "#dbeafe",
    },

    navegacion: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
    },

    botonNav: {
      backgroundColor: "#ffffff",
      color: "#123b66",
      border: "none",
      borderRadius: "6px",
      padding: "10px 12px",
      cursor: "pointer",
      fontWeight: "bold",
    },

    contenido: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "25px 18px",
    },

    tarjeta: {
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "18px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      border: "1px solid #e0e7ef",
    },

    grid: {
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit, minmax(230px, 1fr))",
      gap: "20px",
    },

    imagen: {
      width: "100%",
      height: "190px",
      objectFit: "contain",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
    },

    botonPrincipal: {
      backgroundColor: "#1769aa",
      color: "white",
      border: "none",
      borderRadius: "6px",
      padding: "11px 15px",
      cursor: "pointer",
      fontWeight: "bold",
    },

    botonSecundario: {
      backgroundColor: "#e5edf6",
      color: "#123b66",
      border: "none",
      borderRadius: "6px",
      padding: "10px 14px",
      cursor: "pointer",
      fontWeight: "bold",
    },

    entrada: {
      width: "100%",
      boxSizing: "border-box",
      padding: "11px",
      marginTop: "6px",
      marginBottom: "14px",
      border: "1px solid #cbd5e1",
      borderRadius: "6px",
      fontSize: "15px",
    },

    etiqueta: {
      display: "block",
      fontWeight: "bold",
    },

    panel: {
      backgroundColor: "#ffffff",
      border: "1px solid #dbe3ec",
      borderRadius: "10px",
      padding: "20px",
      marginBottom: "20px",
    },

    aviso: {
      backgroundColor: "#e8f5e9",
      color: "#216e39",
      border: "1px solid #b7dfc0",
      padding: "12px",
      borderRadius: "6px",
      margin: "12px 0",
    },

    error: {
      backgroundColor: "#fff0f0",
      color: "#a61b1b",
      border: "1px solid #f2bcbc",
      padding: "12px",
      borderRadius: "6px",
      margin: "12px 0",
    },

    tabla: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#ffffff",
    },

    celda: {
      textAlign: "left",
      padding: "12px",
      borderBottom: "1px solid #e2e8f0",
      verticalAlign: "top",
    },

    pie: {
      backgroundColor: "#123b66",
      color: "white",
      textAlign: "center",
      padding: "20px",
      marginTop: "35px",
    },
  };




  const tarjetaProducto = (producto) => (
    <article
      key={producto.id}
      style={estilos.tarjeta}
    >
      <img
        src={producto.imagen}
        alt={producto.nombre}
        style={estilos.imagen}
        onError={(evento) => {
          evento.currentTarget.onerror = null;
          evento.currentTarget.src =
            "https://placehold.co/600x400?text=Producto";
        }}
      />

      <p
        style={{
          color: "#1769aa",
          fontSize: "13px",
          fontWeight: "bold",
          marginBottom: "5px",
        }}
      >
        {producto.categoria}
      </p>

      <h3>{producto.nombre}</h3>

      <p>{producto.descripcion}</p>

      <p
        style={{
          fontSize: "21px",
          color: "#123b66",
          fontWeight: "bold",
        }}
      >
        {formatoMoneda(producto.precio)}
      </p>

      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        <button
          style={estilos.botonSecundario}
          onClick={() => abrirDetalle(producto)}
        >
          Ver detalle
        </button>

        <button
          style={estilos.botonPrincipal}
          onClick={() => agregarAlCarrito(producto)}
        >
          Agregar
        </button>
      </div>
    </article>
  );




  return (
    <div style={estilos.pagina}>

      {/* ENCABEZADO */}

      <header style={estilos.encabezado}>
        <div style={estilos.encabezadoContenido}>

          <div>
            <h1 style={estilos.logo}>
              Tienda Fácil
            </h1>

            <p style={estilos.subtitulo}>
              Tu tienda en línea
            </p>
          </div>

          <nav style={estilos.navegacion}>

            <button
              style={estilos.botonNav}
              onClick={abrirCatalogo}
            >
              Catálogo
            </button>

            <button
              style={estilos.botonNav}
              onClick={() => setVista("carrito")}
            >
              Carrito ({cantidadProductosCarrito})
            </button>

            <button
              style={estilos.botonNav}
              onClick={() => abrirSeccionSprint3("historial")}
            >
              HU-08 Historial
            </button>

            <button
              style={estilos.botonNav}
              onClick={() => abrirSeccionSprint3("perfil")}
            >
              HU-09 Mi perfil
            </button>

            <button
              style={estilos.botonNav}
              onClick={() => abrirSeccionSprint3("recomendaciones")}
            >
              HU-10 Recomendaciones
            </button>

          </nav>
        </div>
      </header>


      {/* CONTENIDO */}

      <main style={estilos.contenido}>


        {/* ==================================
            SPRINTS Y FUNCIONES IMPLEMENTADAS
        ================================== */}

        <section style={estilos.panel}>
          <h2>Desarrollo del proyecto por Sprints</h2>

          <p>
            Tienda Fácil organiza sus funcionalidades en
            tres Sprints para mostrar los avances del
            proyecto de comercio electrónico.
          </p>

          <div style={estilos.grid}>

            <div
              style={{
                ...estilos.tarjeta,
                borderTop: "5px solid #1769aa",
              }}
            >
              <h3>Sprint 1</h3>

              <p>
                Catálogo, búsqueda, categorías y detalle
                de productos.
              </p>

              <strong>HU-01 a HU-04</strong>
            </div>

            <div
              style={{
                ...estilos.tarjeta,
                borderTop: "5px solid #16a34a",
              }}
            >
              <h3>Sprint 2</h3>

              <p>
                Carrito, proceso de pago y confirmación
                de pedidos.
              </p>

              <strong>HU-05 a HU-07</strong>
            </div>

            <div
              style={{
                ...estilos.tarjeta,
                borderTop: "5px solid #9333ea",
              }}
            >
              <h3>Sprint 3</h3>

              <p>
                Historial de pedidos, perfil y
                recomendaciones personalizadas.
              </p>

              <strong>HU-08 a HU-10</strong>
            </div>

          </div>
        </section>


        {/* ==================================
            SPRINT 1: CATÁLOGO
        ================================== */}

        {vista === "catalogo" && (
          <section>

            <h2>Catálogo de productos</h2>

            <p>
              Explora los artículos, busca por nombre
              y filtra los productos disponibles.
            </p>

            <div style={estilos.panel}>

              <label style={estilos.etiqueta}>
                Buscar producto
              </label>

              <input
                type="text"
                placeholder="Ejemplo: laptop, mochila..."
                value={busqueda}
                onChange={(evento) =>
                  setBusqueda(evento.target.value)
                }
                style={estilos.entrada}
              />

              <label style={estilos.etiqueta}>
                Categoría
              </label>

              <select
                value={categoriaFiltro}
                onChange={(evento) =>
                  setCategoriaFiltro(evento.target.value)
                }
                style={estilos.entrada}
              >
                {categorias.map((categoria) => (
                  <option
                    key={categoria}
                    value={categoria}
                  >
                    {categoria}
                  </option>
                ))}
              </select>

              <label style={estilos.etiqueta}>
                Precio máximo en pesos
              </label>

              <input
                type="number"
                min="0"
                placeholder="Ejemplo: 1000"
                value={precioMax}
                onChange={(evento) =>
                  setPrecioMax(evento.target.value)
                }
                style={estilos.entrada}
              />

              <button
                style={estilos.botonSecundario}
                onClick={() => {
                  setBusqueda("");
                  setCategoriaFiltro("Todas");
                  setPrecioMax("");
                }}
              >
                Limpiar filtros
              </button>

            </div>

            <div style={estilos.grid}>
              {productosFiltrados.map((producto) =>
                tarjetaProducto(producto)
              )}
            </div>

            {productosFiltrados.length === 0 && (
              <div style={estilos.panel}>
                <p>
                  No se encontraron productos con esos
                  criterios. Prueba con otra búsqueda.
                </p>
              </div>
            )}

          </section>
        )}


        {/* ==================================
            SPRINT 1: DETALLE DE PRODUCTO
        ================================== */}

        {vista === "detalle" && productoSeleccionado && (
          <section style={estilos.panel}>

            <button
              style={estilos.botonSecundario}
              onClick={abrirCatalogo}
            >
              ← Regresar al catálogo
            </button>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "25px",
                marginTop: "20px",
              }}
            >

              <img
                src={productoSeleccionado.imagen}
                alt={productoSeleccionado.nombre}
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "contain",
                  backgroundColor: "#ffffff",
                }}
                onError={(evento) => {
                  evento.currentTarget.onerror = null;
                  evento.currentTarget.src =
                    "https://placehold.co/600x400?text=Producto";
                }}
              />

              <div>

                <p>
                  Categoría: {productoSeleccionado.categoria}
                </p>

                <h2>{productoSeleccionado.nombre}</h2>

                <p>{productoSeleccionado.descripcion}</p>

                <h3>
                  {formatoMoneda(productoSeleccionado.precio)}
                </h3>

                <h3>Características</h3>

                <ul>
                  {productoSeleccionado.caracteristicas.map(
                    (caracteristica, indice) => (
                      <li key={indice}>
                        {caracteristica}
                      </li>
                    )
                  )}
                </ul>

                <button
                  style={estilos.botonPrincipal}
                  onClick={() =>
                    agregarAlCarrito(productoSeleccionado)
                  }
                >
                  Agregar al carrito
                </button>

              </div>
            </div>
          </section>
        )}


        {/* ==================================
            SPRINT 2: CARRITO
        ================================== */}

        {vista === "carrito" && (
          <section>

            <h2>Mi carrito de compras</h2>

            {carrito.length === 0 ? (
              <div style={estilos.panel}>
                <p>
                  Tu carrito está vacío.
                </p>

                <button
                  style={estilos.botonPrincipal}
                  onClick={abrirCatalogo}
                >
                  Ir al catálogo
                </button>
              </div>
            ) : (

              <div style={estilos.panel}>

                {carrito.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "90px 1fr auto",
                      alignItems: "center",
                      gap: "15px",
                      padding: "15px 0",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >

                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      style={{
                        width: "90px",
                        height: "75px",
                        objectFit: "contain",
                      }}
                      onError={(evento) => {
                        evento.currentTarget.onerror = null;
                        evento.currentTarget.src =
                          "https://placehold.co/300x200?text=Producto";
                      }}
                    />

                    <div>
                      <h3>{item.nombre}</h3>

                      <p>
                        Precio: {formatoMoneda(item.precio)}
                      </p>

                      <label>
                        Cantidad:{" "}

                        <input
                          type="number"
                          min="1"
                          value={item.cantidad}
                          onChange={(evento) =>
                            cambiarCantidad(
                              item.id,
                              Number(evento.target.value)
                            )
                          }
                          style={{
                            width: "65px",
                            padding: "6px",
                          }}
                        />
                      </label>
                    </div>

                    <div>
                      <p>
                        <strong>
                          {formatoMoneda(
                            item.precio * item.cantidad
                          )}
                        </strong>
                      </p>

                      <button
                        style={{
                          ...estilos.botonSecundario,
                          color: "#a61b1b",
                        }}
                        onClick={() =>
                          eliminarDelCarrito(item.id)
                        }
                      >
                        Eliminar
                      </button>
                    </div>

                  </div>
                ))}

                <h2>
                  Total: {formatoMoneda(calcularTotal())}
                </h2>

                <button
                  style={estilos.botonPrincipal}
                  onClick={() => setVista("pago")}
                >
                  Continuar al pago
                </button>

              </div>
            )}

          </section>
        )}


        {/* ==================================
            SPRINT 2: PROCESO DE PAGO
        ================================== */}

        {vista === "pago" && (
          <section style={estilos.panel}>

            <h2>Finalizar compra</h2>

            <p>
              Completa los datos para registrar tu pedido.
            </p>

            <h3>
              Total de la compra: {formatoMoneda(calcularTotal())}
            </h3>

            {errorPago && (
              <div style={estilos.error}>
                {errorPago}
              </div>
            )}

            <form onSubmit={handlePagoSubmit}>

              <label style={estilos.etiqueta}>
                Nombre completo
              </label>

              <input
                name="nombre"
                type="text"
                value={datosPago.nombre}
                onChange={actualizarDatosPago}
                style={estilos.entrada}
                required
              />

              <label style={estilos.etiqueta}>
                Correo electrónico
              </label>

              <input
                name="correo"
                type="email"
                value={datosPago.correo}
                onChange={actualizarDatosPago}
                style={estilos.entrada}
                required
              />

              <label style={estilos.etiqueta}>
                Dirección de entrega
              </label>

              <textarea
                name="direccion"
                value={datosPago.direccion}
                onChange={actualizarDatosPago}
                style={{
                  ...estilos.entrada,
                  minHeight: "80px",
                }}
                required
              />

              <label style={estilos.etiqueta}>
                Método de pago
              </label>

              <select
                name="metodo"
                value={datosPago.metodo}
                onChange={actualizarDatosPago}
                style={estilos.entrada}
              >
                <option value="Tarjeta">
                  Tarjeta (demostración)
                </option>

                <option value="Transferencia">
                  Transferencia (demostración)
                </option>

                <option value="Pago contra entrega">
                  Pago contra entrega
                </option>
              </select>

              <p>
                Esta versión es una demostración académica.
                No procesa pagos bancarios reales.
              </p>

              <button
                type="submit"
                style={estilos.botonPrincipal}
              >
                Confirmar pedido
              </button>

              <button
                type="button"
                style={{
                  ...estilos.botonSecundario,
                  marginLeft: "10px",
                }}
                onClick={() => setVista("carrito")}
              >
                Volver al carrito
              </button>

            </form>
          </section>
        )}


        {/* ==================================
            SPRINT 2: CONFIRMACIÓN
        ================================== */}

        {vista === "confirmacion" && pedidoConfirmado && (
          <section style={estilos.panel}>

            <div style={estilos.aviso}>
              <h2>¡Pedido registrado correctamente!</h2>

              <p>
                Tu compra se registró en esta demostración.
              </p>
            </div>

            <h3>Resumen del pedido</h3>

            <p>
              <strong>Número de pedido:</strong>{" "}
              {pedidoConfirmado.numero}
            </p>

            <p>
              <strong>Fecha:</strong>{" "}
              {pedidoConfirmado.fecha}
            </p>

            <p>
              <strong>Cliente:</strong>{" "}
              {pedidoConfirmado.nombre}
            </p>

            <p>
              <strong>Correo:</strong>{" "}
              {pedidoConfirmado.correo}
            </p>

            <p>
              <strong>Método de pago:</strong>{" "}
              {pedidoConfirmado.metodo}
            </p>

            <h3>Productos</h3>

            <ul>
              {pedidoConfirmado.productos.map((item) => (
                <li key={item.id}>
                  {item.nombre} — {item.cantidad} unidad(es)
                </li>
              ))}
            </ul>

            <h2>
              Total: {formatoMoneda(pedidoConfirmado.total)}
            </h2>

            <button
              style={estilos.botonPrincipal}
              onClick={() => abrirSeccionSprint3("historial")}
            >
              Consultar historial de pedidos
            </button>

            <button
              style={{
                ...estilos.botonSecundario,
                marginLeft: "10px",
              }}
              onClick={abrirCatalogo}
            >
              Seguir comprando
            </button>

          </section>
        )}


        {/* ==================================
            SPRINT 3: HU-08, HU-09 Y HU-10
        ================================== */}

        {vista === "sprint3" && (
          <section>

            <div style={estilos.panel}>

              <h2>Sprint 3: nuevas funcionalidades</h2>

              <p>
                En esta sección se presentan las historias
                de usuario HU-08, HU-09 y HU-10 de Tienda Fácil.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >

                <button
                  style={estilos.botonSecundario}
                  onClick={() => setVistaSprint3("historial")}
                >
                  HU-08: Historial
                </button>

                <button
                  style={estilos.botonSecundario}
                  onClick={() => setVistaSprint3("perfil")}
                >
                  HU-09: Mi perfil
                </button>

                <button
                  style={estilos.botonSecundario}
                  onClick={() => setVistaSprint3("recomendaciones")}
                >
                  HU-10: Recomendaciones
                </button>

              </div>
            </div>


            {/* ==================================
                HU-08: HISTORIAL DE PEDIDOS
            ================================== */}

            {vistaSprint3 === "historial" && (
              <div style={estilos.panel}>

                <h2>HU-08: Historial de pedidos</h2>

                <p>
                  El usuario puede consultar sus pedidos
                  registrados, revisar los productos, la fecha,
                  el total y el estado de cada compra.
                </p>

                <p>
                  Los pedidos realizados desde el formulario
                  de pago se guardan en el navegador.
                </p>

                {historialPedidos.length === 0 ? (

                  <div style={estilos.tarjeta}>
                    <h3>Aún no tienes pedidos registrados</h3>

                    <p>
                      Realiza una compra de demostración para
                      que aparezca en tu historial.
                    </p>

                    <button
                      style={estilos.botonPrincipal}
                      onClick={abrirCatalogo}
                    >
                      Explorar productos
                    </button>
                  </div>

                ) : (

                  <div
                    style={{
                      overflowX: "auto",
                      marginTop: "20px",
                    }}
                  >

                    <table style={estilos.tabla}>

                      <thead>
                        <tr
                          style={{
                            backgroundColor: "#eaf1f8",
                          }}
                        >
                          <th style={estilos.celda}>
                            Número
                          </th>

                          <th style={estilos.celda}>
                            Fecha
                          </th>

                          <th style={estilos.celda}>
                            Productos
                          </th>

                          <th style={estilos.celda}>
                            Total
                          </th>

                          <th style={estilos.celda}>
                            Estado
                          </th>
                        </tr>
                      </thead>

                      <tbody>

                        {historialPedidos.map((pedido, indice) => (
                          <tr key={pedido.numero || indice}>

                            <td style={estilos.celda}>
                              {pedido.numero}
                            </td>

                            <td style={estilos.celda}>
                              {pedido.fecha}
                            </td>

                            <td style={estilos.celda}>
                              {Array.isArray(pedido.productos)
                                ? pedido.productos.map((producto) => (
                                    <div key={producto.id}>
                                      {producto.nombre} ×{" "}
                                      {producto.cantidad}
                                    </div>
                                  ))
                                : pedido.productos}
                            </td>

                            <td style={estilos.celda}>
                              {formatoMoneda(pedido.total)}
                            </td>

                            <td style={estilos.celda}>
                              <span
                                style={{
                                  backgroundColor: "#dcfce7",
                                  color: "#166534",
                                  padding: "5px 8px",
                                  borderRadius: "5px",
                                }}
                              >
                                {pedido.estado || "Confirmado"}
                              </span>
                            </td>

                          </tr>
                        ))}

                      </tbody>
                    </table>

                  </div>
                )}

                <p
                  style={{
                    marginTop: "20px",
                    color: "#64748b",
                    fontSize: "14px",
                  }}
                >
                  Nota: el historial está guardado en el
                  navegador utilizado. No es una base de datos
                  compartida entre diferentes dispositivos.
                </p>

              </div>
            )}


            {/* ==================================
                HU-09: PERFIL DE USUARIO
            ================================== */}

            {vistaSprint3 === "perfil" && (
              <div style={estilos.panel}>

                <h2>HU-09: Mi perfil y preferencias</h2>

                <p>
                  El usuario puede actualizar sus datos y
                  seleccionar sus preferencias para adaptar
                  la experiencia de compra.
                </p>

                {mensajePerfil && (
                  <div style={estilos.aviso}>
                    {mensajePerfil}
                  </div>
                )}

                {errorPerfil && (
                  <div style={estilos.error}>
                    {errorPerfil}
                  </div>
                )}

                <form onSubmit={guardarPerfil}>

                  <label style={estilos.etiqueta}>
                    Nombre completo
                  </label>

                  <input
                    name="nombre"
                    type="text"
                    value={perfil.nombre}
                    onChange={(evento) => {
                      actualizarPerfil(evento);
                      setMensajePerfil("");
                      setErrorPerfil("");
                    }}
                    placeholder="Escribe tu nombre"
                    style={estilos.entrada}
                    required
                  />

                  <label style={estilos.etiqueta}>
                    Correo electrónico
                  </label>

                  <input
                    name="correo"
                    type="email"
                    value={perfil.correo}
                    onChange={(evento) => {
                      actualizarPerfil(evento);
                      setMensajePerfil("");
                      setErrorPerfil("");
                    }}
                    placeholder="usuario@correo.com"
                    style={estilos.entrada}
                    required
                  />

                  <label style={estilos.etiqueta}>
                    Categoría favorita
                  </label>

                  <select
                    name="categoriaFavorita"
                    value={perfil.categoriaFavorita}
                    onChange={(evento) => {
                      actualizarPerfil(evento);
                      setMensajePerfil("");
                    }}
                    style={estilos.entrada}
                  >

                    <option value="Tecnología">
                      Tecnología
                    </option>

                    <option value="Audio">
                      Audio
                    </option>

                    <option value="Accesorios">
                      Accesorios
                    </option>

                  </select>

                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      margin: "15px 0",
                    }}
                  >

                    <input
                      type="checkbox"
                      name="recibirNovedades"
                      checked={perfil.recibirNovedades}
                      onChange={(evento) => {
                        actualizarPerfil(evento);
                        setMensajePerfil("");
                      }}
                    />

                    Deseo recibir novedades y recomendaciones
                    de productos.

                  </label>

                  <button
                    type="submit"
                    style={estilos.botonPrincipal}
                  >
                    Guardar perfil
                  </button>

                </form>

                <div
                  style={{
                    ...estilos.tarjeta,
                    marginTop: "25px",
                  }}
                >
                  <h3>Resumen de preferencias</h3>

                  <p>
                    <strong>Nombre:</strong>{" "}
                    {perfil.nombre || "Sin registrar"}
                  </p>

                  <p>
                    <strong>Correo:</strong>{" "}
                    {perfil.correo || "Sin registrar"}
                  </p>

                  <p>
                    <strong>Categoría favorita:</strong>{" "}
                    {perfil.categoriaFavorita}
                  </p>

                  <p>
                    <strong>Novedades:</strong>{" "}
                    {perfil.recibirNovedades
                      ? "Activadas"
                      : "Desactivadas"}
                  </p>
                </div>

                <p
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                  }}
                >
                  Esta versión guarda las preferencias en el
                  navegador. No envía correos electrónicos reales.
                </p>

              </div>
            )}


            {/* ==================================
                HU-10: RECOMENDACIONES
            ================================== */}

            {vistaSprint3 === "recomendaciones" && (
              <div style={estilos.panel}>

                <h2>HU-10: Recomendaciones de productos</h2>

                <p>
                  La tienda muestra productos según la
                  categoría favorita seleccionada en el perfil.
                </p>

                <div style={estilos.tarjeta}>

                  <h3>
                    Recomendaciones personalizadas
                  </h3>

                  <p>
                    Categoría favorita del perfil:{" "}
                    <strong>
                      {perfil.categoriaFavorita}
                    </strong>
                  </p>

                  {!perfil.nombre && (
                    <p>
                      Puedes completar tu perfil para
                      personalizar mejor las recomendaciones.
                    </p>
                  )}

                  <button
                    style={estilos.botonSecundario}
                    onClick={() => setVistaSprint3("perfil")}
                  >
                    Editar mis preferencias
                  </button>

                </div>

                <label
                  style={{
                    ...estilos.etiqueta,
                    marginTop: "20px",
                  }}
                >
                  Mostrar recomendaciones
                </label>

                <select
                  value={categoriaRecomendacion}
                  onChange={(evento) =>
                    setCategoriaRecomendacion(evento.target.value)
                  }
                  style={estilos.entrada}
                >

                  <option value="Preferida">
                    Según mi categoría favorita
                  </option>

                  <option value="Todas">
                    Todas las categorías
                  </option>

                  <option value="Tecnología">
                    Tecnología
                  </option>

                  <option value="Audio">
                    Audio
                  </option>

                  <option value="Accesorios">
                    Accesorios
                  </option>

                </select>

                <div style={estilos.grid}>

                  {productosRecomendados.map((producto) =>
                    tarjetaProducto(producto)
                  )}

                </div>

                {productosRecomendados.length === 0 && (
                  <div style={estilos.tarjeta}>
                    <p>
                      No hay productos disponibles para
                      esta selección.
                    </p>
                  </div>
                )}

              </div>
            )}

          </section>
        )}

      </main>


      {/* PIE DE PÁGINA */}

      <footer style={estilos.pie}>

        <h3>Tienda Fácil</h3>

        <p>
          Proyecto académico de comercio electrónico
          desarrollado con React.js.
        </p>

        <p>
          Sprint 1 · Sprint 2 · Sprint 3
        </p>

       

      </footer>

    </div>
  );
}
export default App;

